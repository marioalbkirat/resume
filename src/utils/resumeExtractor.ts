import { PDFParse } from 'pdf-parse';
import path from 'path';
import { pathToFileURL } from 'url';

// Explicitly set the worker source for pdfjs-dist when running on the server.
// This prevents Next.js from trying to load it from the wrong location in the .next folder.
if (typeof window === 'undefined') {
    const workerPath = path.join(process.cwd(), 'node_modules', 'pdfjs-dist', 'legacy', 'build', 'pdf.worker.mjs');
    // On Windows, the ESM loader requires file:// URLs for absolute paths.
    PDFParse.setWorker(pathToFileURL(workerPath).href);
}


export async function extractTextFromPDF(buffer: Buffer): Promise<{ text: string, screenshot?: string }> {
    try {
        const parser = new PDFParse({ data: buffer });
        const textData = await parser.getText();

        const meaningfulText = textData.text.replace(/-- \d+ of \d+ --/g, '').trim();
        console.log('Extracted text length:', meaningfulText.length);

        // If very little text is found, take a screenshot of the first page as fallback (OCR)
        let screenshot = undefined;
        if (meaningfulText.length < 50) {
            console.log('Low text extraction. Generating screenshot for Vision OCR...');
            const screenshotData = await parser.getScreenshot({ first: 1, scale: 2.0 });
            if (screenshotData.pages.length > 0) {
                screenshot = screenshotData.pages[0].dataUrl;
            }
        }

        return { text: textData.text, screenshot };
    } catch (error) {
        console.error('Error parsing PDF:', error);
        throw new Error('Failed to parse PDF');
    }
}

export async function structureResumeData(data: { text: string, screenshot?: string }) {
    const { text, screenshot } = data;

    // We now allow "empty" text if we have a screenshot fallback
    const meaningfulText = text.replace(/-- \d+ of \d+ --/g, '').trim();
    if (meaningfulText.length < 50 && !screenshot) {
        throw new Error('Could not extract enough text from this PDF and vision fallback failed.');
    }

    const MAX_RETRIES = 2;
    let lastError: any = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
            const userContent: any[] = [{ type: "text", text: text.slice(0, 30000) }];

            // Add image to prompt if we have a vision fallback
            if (screenshot) {
                userContent.push({
                    type: "image_url",
                    image_url: { url: screenshot }
                });
            }

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "PortCV Resume Extractor",
                },
                body: JSON.stringify({
                    "model": "google/gemini-2.0-flash-001", // Switched to a more robust model
                    messages: [
                        {
                            role: "system",
                            content: `You are a professional resume parser. 
                            Your task is to extract information from the provided text or image into a JSON format.
                            If the content contains data that looks like a person's profile, career history, or skills, extract it. 
                            If it is completely irrelevant to a person's profile, return: { "isResume": false, "error": "This document does not contain resume-related information." }.
                            
                            Format the output as a JSON object with these fields:
                            {
                                "isResume": true,
                                "Name": "Full Name",
                                "Email": "Email address",
                                "Phone": "Phone number",
                                "Summary": "A brief professional summary",
                                "Skills": ["Skill 1", "Skill 2"],
                                "Experience": [{"title": "", "company": "", "duration": "", "description": ""}],
                                "Education": [{"degree": "", "institution": "", "year": ""}]
                            }`
                        },
                        {
                            role: "user",
                            content: userContent
                        }
                    ],
                    "response_format": { "type": "json_object" },
                    "max_tokens": 5000,
                    "temperature": 0.1,
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `OpenRouter API error: ${response.status}`);
            }

            const resData = await response.json();
            let content = resData.choices[0].message.content;
            if (!content) throw new Error('No content returned from OpenRouter');

            if (content.startsWith('```')) {
                content = content.replace(/^```json\s*/, '').replace(/```$/, '').trim();
            }

            const result = JSON.parse(content);
            if (result.isResume === false) {
                throw new Error(result.error || 'This document does not appear to be a resume.');
            }

            return result;
        } catch (error: any) {
            lastError = error;
            console.error(`Attempt ${attempt + 1} failed:`, error.message);
            if (attempt < MAX_RETRIES) {
                await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1))); // Exponential backoff
                continue;
            }
        }
    }
    throw new Error(lastError?.message || 'Failed to structure resume data after multiple attempts');
}
