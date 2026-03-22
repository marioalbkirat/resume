// "use client";

// import { useState, useRef } from "react";

// interface AnalysisResult {
//   score: number;
//   missingKeywords: string[];
//   suggestions: string[];
// }

// export default function CPanelResume() {
//   const width: number = window.screen.width - 794;
//   const [jobDescription, setJobDescription] = useState("");
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [parsedData, setParsedData] = useState<any>(null);
//   const [activeTab, setActiveTab] = useState("analyze");
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && file.type === "application/pdf") {
//       setSelectedFile(file);
//       // Simulate parsing resume data
//       setTimeout(() => {
//         setParsedData({
//           name: "John Doe",
//           email: "john.doe@example.com",
//           skills: ["React", "TypeScript", "Node.js"],
//           experience: "5 years of full-stack development",
//           education: "Bachelor's in Computer Science"
//         });
//         console.log("Resume parsed successfully:", file.name);
//       }, 1000);
//     }
//   };

//   const handleAnalyzeWithJD = () => {
//     if (!jobDescription.trim()) {
//       alert("Please enter a job description");
//       return;
//     }
    
//     setIsAnalyzing(true);
//     // Simulate API call
//     setTimeout(() => {
//       setAnalysisResult({
//         score: 78,
//         missingKeywords: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
//         suggestions: [
//           "Add more specific examples of React projects",
//           "Include TypeScript experience details",
//           "Highlight Tailwind CSS proficiency",
//           "Add Next.js framework experience"
//         ]
//       });
//       setIsAnalyzing(false);
//     }, 1500);
//   };

//   const handleImproveGenerally = () => {
//     setIsAnalyzing(true);
//     // Simulate general improvement suggestions
//     setTimeout(() => {
//       setAnalysisResult({
//         score: 65,
//         missingKeywords: ["Leadership", "Project Management", "Communication", "Problem Solving"],
//         suggestions: [
//           "Add quantifiable achievements with numbers",
//           "Include soft skills like leadership and teamwork",
//           "Highlight project management experience",
//           "Add certifications and continuous learning",
//           "Improve action verbs in experience descriptions"
//         ]
//       });
//       setIsAnalyzing(false);
//     }, 1500);
//   };

//   const handleGenerateCoverLetter = () => {
//     console.log("Generating cover letter...");
//     alert("Cover letter generation feature coming soon!");
//   };

//   const handleOptimizeResume = () => {
//     console.log("Optimizing resume...");
//     alert("Resume optimization feature coming soon!");
//   };

//   const handleDownload = () => {
//     console.log("Downloading resume...");
//   };

//   const handleLinkPortfolio = () => {
//     console.log("Linking portfolio...");
//   };

//   return (
//     <div style={{ width: width }} className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//             Resume Optimizer
//           </h1>
//           <p className="text-gray-600 mt-2">Enhance your resume with AI-powered insights</p>
//         </div>

//         {/* Tabs Navigation */}
//         <div className="flex gap-2 mb-6 bg-white rounded-xl p-1 shadow-sm">
//           <button
//             onClick={() => setActiveTab("analyze")}
//             className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
//               activeTab === "analyze"
//                 ? "bg-blue-600 text-white shadow-md"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             Analyze Resume
//           </button>
//           <button
//             onClick={() => setActiveTab("manage")}
//             className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
//               activeTab === "manage"
//                 ? "bg-blue-600 text-white shadow-md"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             Manage Resume
//           </button>
//           <button
//             onClick={() => setActiveTab("sections")}
//             className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
//               activeTab === "sections"
//                 ? "bg-blue-600 text-white shadow-md"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             Customize Sections
//           </button>
//         </div>

//         {/* Analyze Resume Tab */}
//         {activeTab === "analyze" && (
//           <div className="space-y-6 animate-fadeIn">
//             {/* Job Description Section */}
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 Job Description (Optional)
//               </h2>
//               <textarea
//                 value={jobDescription}
//                 onChange={(e) => setJobDescription(e.target.value)}
//                 placeholder="Paste the job description here to get targeted analysis, or leave empty for general resume improvement..."
//                 className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
//               />
//             </div>

//             {/* Analysis Button - Conditionally Rendered */}
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               {jobDescription.trim() ? (
//                 // Case 1: With Job Description
//                 <>
//                   <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                     <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                     </svg>
//                     Targeted Analysis
//                   </h2>
//                   <p className="text-gray-600 mb-4 text-sm">
//                     Analyzing your resume against the provided job description
//                   </p>
//                   <button
//                     onClick={handleAnalyzeWithJD}
//                     disabled={isAnalyzing}
//                     className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
//                   >
//                     {isAnalyzing ? (
//                       <>
//                         <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                         </svg>
//                         Analyzing...
//                       </>
//                     ) : (
//                       "Analyze Resume (Match Score + Missing Keywords + Suggestions)"
//                     )}
//                   </button>
//                 </>
//               ) : (
//                 // Case 2: Without Job Description
//                 <>
//                   <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                     <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                     </svg>
//                     General Improvement
//                   </h2>
//                   <p className="text-gray-600 mb-4 text-sm">
//                     Get general suggestions to improve your resume without a specific job target
//                   </p>
//                   <button
//                     onClick={handleImproveGenerally}
//                     disabled={isAnalyzing}
//                     className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
//                   >
//                     {isAnalyzing ? (
//                       <>
//                         <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                         </svg>
//                         Analyzing...
//                       </>
//                     ) : (
//                       "Improve CV Generally"
//                     )}
//                   </button>
//                 </>
//               )}
//             </div>

//             {/* Analysis Results */}
//             {analysisResult && (
//               <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
//                   <div className="text-4xl font-bold text-blue-600">{analysisResult.score}%</div>
//                 </div>
                
//                 <div className="space-y-6">
//                   <div>
//                     <h4 className="font-medium text-gray-700 mb-3">Missing Keywords</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {analysisResult.missingKeywords.map((keyword, index) => (
//                         <span key={index} className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
//                           {keyword}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
                  
//                   <div>
//                     <h4 className="font-medium text-gray-700 mb-3">Suggestions</h4>
//                     <div className="space-y-2">
//                       {analysisResult.suggestions.map((suggestion, index) => (
//                         <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
//                           <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           <span className="text-sm text-gray-700">{suggestion}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
                  
//                   {/* Action Buttons After Analysis */}
//                   <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
//                     <button
//                       onClick={handleGenerateCoverLetter}
//                       className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
//                     >
//                       Generate Cover Letter
//                     </button>
//                     <button
//                       onClick={handleOptimizeResume}
//                       className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
//                     >
//                       Optimize Resume
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Manage Resume Tab */}
//         {activeTab === "manage" && (
//           <div className="space-y-6 animate-fadeIn">
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 Resume Management
//               </h2>
              
//               {/* File Upload for Parsing */}
//               <div className="mb-6">
//                 <div 
//                   onClick={() => fileInputRef.current?.click()}
//                   className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-teal-500 transition-all hover:bg-teal-50"
//                 >
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept=".pdf"
//                     onChange={handleFileUpload}
//                     className="hidden"
//                   />
//                   <div className="text-gray-600">
//                     <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                     </svg>
//                     {selectedFile ? (
//                       <div>
//                         <p className="text-green-600 font-medium">{selectedFile.name}</p>
//                         {parsedData && (
//                           <div className="mt-4 text-left bg-gray-50 p-4 rounded-lg">
//                             <p className="font-semibold text-gray-700 mb-2">✓ Resume Parsed Successfully</p>
//                             <p className="text-sm text-gray-600">Name: {parsedData.name}</p>
//                             <p className="text-sm text-gray-600">Email: {parsedData.email}</p>
//                             <p className="text-sm text-gray-600">Skills: {parsedData.skills.join(", ")}</p>
//                           </div>
//                         )}
//                       </div>
//                     ) : (
//                       <>
//                         <p className="font-medium text-lg">Upload your resume for parsing</p>
//                         <p className="text-sm mt-2">Click to upload your existing CV (PDF format)</p>
//                         <p className="text-xs text-gray-500 mt-1">We'll extract your data to help optimize it</p>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="grid gap-3">
//                 <button
//                   onClick={handleDownload}
//                   disabled={!selectedFile}
//                   className={`px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
//                     selectedFile 
//                       ? "bg-gray-800 text-white hover:bg-gray-900" 
//                       : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   }`}
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                   </svg>
//                   Download Optimized Resume
//                 </button>
//                 <button
//                   onClick={handleLinkPortfolio}
//                   className="px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium flex items-center justify-center gap-2"
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
//                   </svg>
//                   Link Portfolio
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Customize Sections Tab */}
//         {activeTab === "sections" && (
//           <div className="space-y-6 animate-fadeIn">
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//                 </svg>
//                 Customize Sections
//               </h2>
              
//               <div className="space-y-3 mb-6">
//                 {["Professional Summary", "Work Experience", "Education", "Skills", "Projects", "Certifications", "Languages", "Achievements"].map((section) => (
//                   <div key={section} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all group">
//                     <div className="flex items-center gap-3">
//                       <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
//                       </svg>
//                       <span className="text-gray-700 font-medium">{section}</span>
//                     </div>
//                     <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors" title="Move">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
//                         </svg>
//                       </button>
//                       <button className="p-1 text-green-500 hover:text-green-700 transition-colors" title="Show/Hide">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
              
//               <button className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-600 transition-all font-medium flex items-center justify-center gap-2">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                 </svg>
//                 Add Custom Section
//               </button>
//             </div>

//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6">
//               <h3 className="font-semibold text-gray-900 mb-2">💡 Pro Tip</h3>
//               <p className="text-sm text-gray-600">
//                 Customize your resume sections to highlight your most relevant skills and experiences. 
//                 Use the move buttons to reorder sections based on importance.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }



// "use client";

// import { useState, useRef } from "react";
// import { IoMdMove } from "react-icons/io";
// import { FiEye, FiEyeOff, FiCheck, FiX } from "react-icons/fi";

// interface AnalysisResult {
//   score: number;
//   missingKeywords: string[];
//   suggestions: string[];
// }

// interface OptimizedSuggestion {
//   original: string;
//   optimized: string;
//   field: string;
// }

// export default function CPanelResume() {
//   const width: number = window.screen.width - 794;
//   const [jobDescription, setJobDescription] = useState("");
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [parsedData, setParsedData] = useState<any>(null);
//   const [activeTab, setActiveTab] = useState("analyze");
//   const [previewMode, setPreviewMode] = useState(true);
//   const [sections, setSections] = useState([
//     { id: 1, name: "Professional Summary", visible: true, order: 0 },
//     { id: 2, name: "Work Experience", visible: true, order: 1 },
//     { id: 3, name: "Education", visible: true, order: 2 },
//     { id: 4, name: "Skills", visible: true, order: 3 },
//     { id: 5, name: "Projects", visible: true, order: 4 },
//     { id: 6, name: "Certifications", visible: true, order: 5 },
//     { id: 7, name: "Languages", visible: true, order: 6 },
//     { id: 8, name: "Achievements", visible: true, order: 7 },
//   ]);
//   const [optimizedSuggestions, setOptimizedSuggestions] = useState<OptimizedSuggestion[]>([]);
//   const [showOptimizeModal, setShowOptimizeModal] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && file.type === "application/pdf") {
//       setSelectedFile(file);
//       setTimeout(() => {
//         setParsedData({
//           name: "John Doe",
//           email: "john.doe@example.com",
//           skills: ["React", "TypeScript", "Node.js"],
//           experience: "5 years of full-stack development",
//           education: "Bachelor's in Computer Science"
//         });
//         console.log("Resume parsed successfully:", file.name);
//       }, 1000);
//     }
//   };

//   const handleAnalyzeWithJD = () => {
//     if (!jobDescription.trim()) {
//       alert("Please enter a job description");
//       return;
//     }
    
//     setIsAnalyzing(true);
//     setTimeout(() => {
//       setAnalysisResult({
//         score: 78,
//         missingKeywords: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
//         suggestions: [
//           "Add more specific examples of React projects",
//           "Include TypeScript experience details",
//           "Highlight Tailwind CSS proficiency",
//           "Add Next.js framework experience"
//         ]
//       });
//       setIsAnalyzing(false);
//     }, 1500);
//   };

//   const handleImproveGenerally = () => {
//     setIsAnalyzing(true);
//     setTimeout(() => {
//       setAnalysisResult({
//         score: 65,
//         missingKeywords: ["Leadership", "Project Management", "Communication", "Problem Solving"],
//         suggestions: [
//           "Add quantifiable achievements with numbers",
//           "Include soft skills like leadership and teamwork",
//           "Highlight project management experience",
//           "Add certifications and continuous learning",
//           "Improve action verbs in experience descriptions"
//         ]
//       });
//       setIsAnalyzing(false);
//     }, 1500);
//   };

//   const handleGenerateCoverLetter = () => {
//     console.log("Generating cover letter...");
//     alert("Cover letter generation feature coming soon!");
//   };

//   const handleOptimizeResume = () => {
//     // Generate optimized suggestions based on analysis
//     const suggestions: OptimizedSuggestion[] = [
//       {
//         field: "Professional Summary",
//         original: "Experienced developer with 5 years in web development",
//         optimized: "Results-driven Full-Stack Developer with 5+ years of expertise in building scalable web applications using React, TypeScript, and Node.js. Proven track record of delivering high-quality solutions that improve user experience by 40%."
//       },
//       {
//         field: "Work Experience",
//         original: "Developed websites and applications",
//         optimized: "Architected and deployed 15+ responsive web applications using React and Next.js, resulting in 30% faster load times and 25% increase in user engagement."
//       },
//       {
//         field: "Skills",
//         original: "JavaScript, HTML, CSS, React",
//         optimized: "JavaScript (ES6+), TypeScript, React.js, Next.js, Node.js, Tailwind CSS, GraphQL, REST APIs, Git, Agile Methodologies"
//       }
//     ];
//     setOptimizedSuggestions(suggestions);
//     setShowOptimizeModal(true);
//   };

//   const handleApplyOptimization = () => {
//     console.log("Applying optimizations:", optimizedSuggestions);
//     setShowOptimizeModal(false);
//     alert("Optimizations applied successfully! Your resume has been updated.");
//   };

//   const handleCancelOptimization = () => {
//     setShowOptimizeModal(false);
//     setOptimizedSuggestions([]);
//   };

//   const handleDownload = () => {
//     console.log("Downloading resume...");
//   };

//   const handleLinkPortfolio = () => {
//     console.log("Linking portfolio...");
//   };

//   const toggleSectionVisibility = (id: number) => {
//     setSections(sections.map(section => 
//       section.id === id ? { ...section, visible: !section.visible } : section
//     ));
//   };

//   const moveSection = (id: number, direction: 'up' | 'down') => {
//     const index = sections.findIndex(s => s.id === id);
//     if (direction === 'up' && index > 0) {
//       const newSections = [...sections];
//       [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
//       setSections(newSections);
//     } else if (direction === 'down' && index < sections.length - 1) {
//       const newSections = [...sections];
//       [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
//       setSections(newSections);
//     }
//   };

//   return (
//     <div style={{ width: width }} className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//             Resume Optimizer
//           </h1>
//           <p className="text-gray-600 mt-2">Enhance your resume with AI-powered insights</p>
//         </div>

//         {/* Tabs Navigation */}
//         <div className="flex gap-2 mb-6 bg-white rounded-xl p-1 shadow-sm">
//           <button
//             onClick={() => setActiveTab("analyze")}
//             className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
//               activeTab === "analyze"
//                 ? "bg-blue-600 text-white shadow-md"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             Analyze Resume
//           </button>
//           <button
//             onClick={() => setActiveTab("manage")}
//             className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
//               activeTab === "manage"
//                 ? "bg-blue-600 text-white shadow-md"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             Manage Resume
//           </button>
//           <button
//             onClick={() => setActiveTab("sections")}
//             className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
//               activeTab === "sections"
//                 ? "bg-blue-600 text-white shadow-md"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             Customize Sections
//           </button>
//         </div>

//         {/* Analyze Resume Tab */}
//         {activeTab === "analyze" && (
//           <div className="space-y-6 animate-fadeIn">
//             {/* Job Description Section */}
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 Job Description (Optional)
//               </h2>
//               <textarea
//                 value={jobDescription}
//                 onChange={(e) => setJobDescription(e.target.value)}
//                 placeholder="Paste the job description here to get targeted analysis, or leave empty for general resume improvement..."
//                 className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
//               />
//             </div>

//             {/* Analysis Button */}
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               {jobDescription.trim() ? (
//                 <>
//                   <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                     <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                     </svg>
//                     Targeted Analysis
//                   </h2>
//                   <p className="text-gray-600 mb-4 text-sm">
//                     Analyzing your resume against the provided job description
//                   </p>
//                   <button
//                     onClick={handleAnalyzeWithJD}
//                     disabled={isAnalyzing}
//                     className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
//                   >
//                     {isAnalyzing ? (
//                       <>
//                         <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                         </svg>
//                         Analyzing...
//                       </>
//                     ) : (
//                       "Analyze Resume (Match Score + Missing Keywords + Suggestions)"
//                     )}
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                     <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                     </svg>
//                     General Improvement
//                   </h2>
//                   <p className="text-gray-600 mb-4 text-sm">
//                     Get general suggestions to improve your resume without a specific job target
//                   </p>
//                   <button
//                     onClick={handleImproveGenerally}
//                     disabled={isAnalyzing}
//                     className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
//                   >
//                     {isAnalyzing ? (
//                       <>
//                         <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                         </svg>
//                         Analyzing...
//                       </>
//                     ) : (
//                       "Improve CV Generally"
//                     )}
//                   </button>
//                 </>
//               )}
//             </div>

//             {/* Analysis Results */}
//             {analysisResult && (
//               <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
//                   <div className="text-4xl font-bold text-blue-600">{analysisResult.score}%</div>
//                 </div>
                
//                 <div className="space-y-6">
//                   <div>
//                     <h4 className="font-medium text-gray-700 mb-3">Missing Keywords</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {analysisResult.missingKeywords.map((keyword, index) => (
//                         <span key={index} className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
//                           {keyword}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
                  
//                   <div>
//                     <h4 className="font-medium text-gray-700 mb-3">Suggestions</h4>
//                     <div className="space-y-2">
//                       {analysisResult.suggestions.map((suggestion, index) => (
//                         <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
//                           <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           <span className="text-sm text-gray-700">{suggestion}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
                  
//                   {/* Action Buttons After Analysis */}
//                   <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
//                     <button
//                       onClick={handleGenerateCoverLetter}
//                       className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
//                     >
//                       Generate Cover Letter
//                     </button>
//                     <button
//                       onClick={handleOptimizeResume}
//                       className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
//                     >
//                       Optimize Resume
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Manage Resume Tab */}
//         {activeTab === "manage" && (
//           <div className="space-y-6 animate-fadeIn">
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                   <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   Resume Management
//                 </h2>
//                 <button
//                   onClick={() => setPreviewMode(!previewMode)}
//                   className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700"
//                 >
//                   {previewMode ? (
//                     <>
//                       <FiEye className="w-4 h-4" />
//                       Preview Mode
//                     </>
//                   ) : (
//                     <>
//                       <FiEyeOff className="w-4 h-4" />
//                       Edit Mode
//                     </>
//                   )}
//                 </button>
//               </div>
              
//               {/* File Upload for Parsing */}
//               <div className="mb-6">
//                 <div 
//                   onClick={() => fileInputRef.current?.click()}
//                   className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-teal-500 transition-all hover:bg-teal-50"
//                 >
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept=".pdf"
//                     onChange={handleFileUpload}
//                     className="hidden"
//                   />
//                   <div className="text-gray-600">
//                     <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                     </svg>
//                     {selectedFile ? (
//                       <div>
//                         <p className="text-green-600 font-medium">{selectedFile.name}</p>
//                         {parsedData && (
//                           <div className="mt-4 text-left bg-gray-50 p-4 rounded-lg">
//                             <p className="font-semibold text-gray-700 mb-2">✓ Resume Parsed Successfully</p>
//                             <p className="text-sm text-gray-600">Name: {parsedData.name}</p>
//                             <p className="text-sm text-gray-600">Email: {parsedData.email}</p>
//                             <p className="text-sm text-gray-600">Skills: {parsedData.skills.join(", ")}</p>
//                           </div>
//                         )}
//                       </div>
//                     ) : (
//                       <>
//                         <p className="font-medium text-lg">Upload your resume for parsing</p>
//                         <p className="text-sm mt-2">Click to upload your existing CV (PDF format)</p>
//                         <p className="text-xs text-gray-500 mt-1">We'll extract your data to help optimize it</p>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Resume Preview/Edit */}
//               {selectedFile && (
//                 <div className="mb-6 border rounded-lg p-4 bg-gray-50">
//                   <h3 className="font-semibold text-gray-900 mb-3">Resume Content</h3>
//                   {previewMode ? (
//                     <div className="space-y-3">
//                       <div className="bg-white p-4 rounded-lg shadow-sm">
//                         <h4 className="font-medium text-gray-900">John Doe</h4>
//                         <p className="text-sm text-gray-600">Full-Stack Developer</p>
//                         <p className="text-sm text-gray-600">Email: john.doe@example.com</p>
//                       </div>
//                       <div className="bg-white p-4 rounded-lg shadow-sm">
//                         <h4 className="font-medium text-gray-900 mb-2">Experience</h4>
//                         <p className="text-sm text-gray-700">5 years of full-stack development</p>
//                       </div>
//                       <div className="bg-white p-4 rounded-lg shadow-sm">
//                         <h4 className="font-medium text-gray-900 mb-2">Skills</h4>
//                         <div className="flex flex-wrap gap-2">
//                           {parsedData?.skills.map((skill: string, i: number) => (
//                             <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs">
//                               {skill}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="space-y-3">
//                       <textarea
//                         className="w-full p-3 border rounded-lg font-mono text-sm"
//                         rows={3}
//                         defaultValue="John Doe - Full-Stack Developer"
//                       />
//                       <textarea
//                         className="w-full p-3 border rounded-lg font-mono text-sm"
//                         rows={4}
//                         defaultValue="5 years of full-stack development experience..."
//                       />
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <div className="grid gap-3">
//                 <button
//                   onClick={handleDownload}
//                   disabled={!selectedFile}
//                   className={`px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
//                     selectedFile 
//                       ? "bg-gray-800 text-white hover:bg-gray-900" 
//                       : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   }`}
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                   </svg>
//                   Download Optimized Resume
//                 </button>
//                 <button
//                   onClick={handleLinkPortfolio}
//                   className="px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium flex items-center justify-center gap-2"
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
//                   </svg>
//                   Link Portfolio
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Customize Sections Tab */}
//         {activeTab === "sections" && (
//           <div className="space-y-6 animate-fadeIn">
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//                 </svg>
//                 Customize Sections
//               </h2>
              
//               <div className="space-y-3 mb-6">
//                 {sections.sort((a, b) => a.order - b.order).map((section) => (
//                   <div key={section.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all group">
//                     <div className="flex items-center gap-3">
//                       <input
//                         type="checkbox"
//                         checked={section.visible}
//                         onChange={() => toggleSectionVisibility(section.id)}
//                         className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
//                       />
//                       <span className={`text-gray-700 font-medium ${!section.visible ? 'line-through text-gray-400' : ''}`}>
//                         {section.name}
//                       </span>
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => moveSection(section.id, 'up')}
//                         className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
//                         title="Move Up"
//                       >
//                         <IoMdMove className="w-5 h-5 rotate-90" />
//                       </button>
//                       <button
//                         onClick={() => moveSection(section.id, 'down')}
//                         className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
//                         title="Move Down"
//                       >
//                         <IoMdMove className="w-5 h-5 -rotate-90 cursor-pointer" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
              
//               <button className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-600 transition-all font-medium flex items-center justify-center gap-2">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                 </svg>
//                 Add Custom Section
//               </button>
//             </div>

//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6">
//               <h3 className="font-semibold text-gray-900 mb-2">💡 Pro Tip</h3>
//               <p className="text-sm text-gray-600">
//                 Customize your resume sections to highlight your most relevant skills and experiences. 
//                 Use the move buttons to reorder sections based on importance, and check/uncheck to show/hide sections.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Optimize Modal */}
//       {showOptimizeModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
//               <h2 className="text-2xl font-bold text-gray-900">Resume Optimization Preview</h2>
//               <p className="text-gray-600 mt-1">Review the suggested improvements before applying</p>
//             </div>
            
//             <div className="p-6 space-y-6">
//               {optimizedSuggestions.map((suggestion, index) => (
//                 <div key={index} className="border rounded-lg overflow-hidden">
//                   <div className="bg-gray-50 px-4 py-2 border-b">
//                     <h3 className="font-semibold text-gray-900">{suggestion.field}</h3>
//                   </div>
//                   <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
//                     <div className="p-4">
//                       <p className="text-xs font-medium text-gray-500 uppercase mb-2">Current</p>
//                       <p className="text-gray-700">{suggestion.original}</p>
//                     </div>
//                     <div className="p-4 bg-green-50">
//                       <p className="text-xs font-medium text-green-600 uppercase mb-2">Optimized</p>
//                       <p className="text-gray-800">{suggestion.optimized}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//             <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
//               <button
//                 onClick={handleApplyOptimization}
//                 className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
//               >
//                 <FiCheck className="w-5 h-5" />
//                 Apply Optimizations
//               </button>
//               <button
//                 onClick={handleCancelOptimization}
//                 className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center justify-center gap-2"
//               >
//                 <FiX className="w-5 h-5" />
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { useState, useRef } from "react";
import { IoMdMove } from "react-icons/io";
import { FaRobot } from "react-icons/fa6";
import { FiEye, FiEyeOff, FiCheck, FiX, FiDownload, FiLink, FiUpload, FiFileText, FiGrid } from "react-icons/fi";

interface AnalysisResult {
  score: number;
  missingKeywords: string[];
  suggestions: string[];
}

interface Section {
  id: number;
  name: string;
  visible: boolean;
  order: number;
  content?: string;
}

export default function CPanelResume() {
  const width: number = window.screen.width - 794;
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("analyze");
  const [previewMode, setPreviewMode] = useState(true);
  const [draggedSection, setDraggedSection] = useState<number | null>(null);
  const [optimizedContent, setOptimizedContent] = useState<Record<number, string>>({});
  const [showOptimized, setShowOptimized] = useState<Record<number, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [sections, setSections] = useState<Section[]>([
    { id: 1, name: "Professional Summary", visible: true, order: 0, content: "Experienced Full-Stack Developer with 5+ years of expertise in building scalable web applications. Proficient in React, TypeScript, Node.js, and modern web technologies." },
    { id: 2, name: "Work Experience", visible: true, order: 1, content: "Senior Developer at Tech Corp (2021-Present)\n- Led development of 5+ major features\n- Improved performance by 40%\n- Mentored 3 junior developers" },
    { id: 3, name: "Education", visible: true, order: 2, content: "Bachelor of Science in Computer Science\nUniversity of Technology, 2018" },
    { id: 4, name: "Skills", visible: true, order: 3, content: "JavaScript, TypeScript, React, Next.js, Node.js, Python, SQL, Git" },
    { id: 5, name: "Projects", visible: true, order: 4, content: "E-commerce Platform - Built a full-stack e-commerce solution\nPortfolio Website - Personal portfolio with React" },
    { id: 6, name: "Certifications", visible: true, order: 5, content: "AWS Certified Developer\nMeta Frontend Developer Certificate" },
    { id: 7, name: "Languages", visible: true, order: 6, content: "English (Fluent)\nArabic (Native)" },
    { id: 8, name: "Achievements", visible: true, order: 7, content: "Best Employee Award 2023\nOpen Source Contributor" },
  ]);

  // Calculate total pages (simulated - 1 page per ~500 words)
  const totalContent = sections.filter(s => s.visible).map(s => s.content || "").join(" ");
  const wordCount = totalContent.split(/\s+/).filter(w => w.length > 0).length;
  const estimatedPages = Math.max(1, Math.ceil(wordCount / 500));

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setTimeout(() => {
        setParsedData({
          name: "John Doe",
          email: "john.doe@example.com",
          skills: ["React", "TypeScript", "Node.js"],
          experience: "5 years of full-stack development",
          education: "Bachelor's in Computer Science"
        });
        console.log("Resume parsed successfully:", file.name);
      }, 1000);
    }
  };

  const handleAnalyzeWithJD = () => {
    if (!jobDescription.trim()) {
      alert("Please enter a job description");
      return;
    }
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult({
        score: 78,
        missingKeywords: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
        suggestions: [
          "Add more specific examples of React projects",
          "Include TypeScript experience details",
          "Highlight Tailwind CSS proficiency",
          "Add Next.js framework experience"
        ]
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleImproveGenerally = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult({
        score: 65,
        missingKeywords: ["Leadership", "Project Management", "Communication", "Problem Solving"],
        suggestions: [
          "Add quantifiable achievements with numbers",
          "Include soft skills like leadership and teamwork",
          "Highlight project management experience",
          "Add certifications and continuous learning",
          "Improve action verbs in experience descriptions"
        ]
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleGenerateCoverLetter = () => {
    console.log("Generating cover letter...");
    alert("Cover letter generation feature coming soon!");
  };

  const handleOptimizeResume = () => {
    // Directly optimize without popup
    const newOptimizedContent: Record<number, string> = {};
    const newShowOptimized: Record<number, boolean> = {};
    
    sections.forEach(section => {
      if (section.name === "Professional Summary" && section.content) {
        newOptimizedContent[section.id] = "Results-driven Full-Stack Developer with 5+ years of expertise in building scalable web applications using React, TypeScript, and Node.js. Proven track record of delivering high-quality solutions that improve user experience by 40%.";
        newShowOptimized[section.id] = true;
      } else if (section.name === "Work Experience" && section.content) {
        newOptimizedContent[section.id] = "Senior Developer at Tech Corp (2021-Present)\n- Architected and deployed 15+ responsive web applications\n- Implemented performance optimizations resulting in 40% faster load times\n- Led a team of 5 developers, increasing productivity by 25%\n- Reduced technical debt by implementing best practices and code reviews";
        newShowOptimized[section.id] = true;
      } else if (section.name === "Projects" && section.content) {
        newOptimizedContent[section.id] = "E-commerce Platform - Built a full-stack e-commerce solution with 10k+ monthly users\n- Implemented payment integration and real-time inventory\nPortfolio Website - Personal portfolio with React and Three.js\n- Featured in 3 design publications\nOpen Source Contributor - 50+ merged PRs in popular repositories";
        newShowOptimized[section.id] = true;
      } else {
        newShowOptimized[section.id] = false;
      }
    });
    
    setOptimizedContent(newOptimizedContent);
    setShowOptimized(newShowOptimized);
    alert("Optimizations applied! Check the Professional Summary, Work Experience, and Projects sections.");
  };

  const handleRevertOptimization = (sectionId: number) => {
    setShowOptimized(prev => ({ ...prev, [sectionId]: false }));
    setOptimizedContent(prev => {
      const newContent = { ...prev };
      delete newContent[sectionId];
      return newContent;
    });
  };

  const handleDownload = () => {
    console.log("Downloading resume...");
  };

  const handleLinkPortfolio = () => {
    console.log("Linking portfolio...");
  };

  const toggleSectionVisibility = (id: number) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, visible: !section.visible } : section
    ));
  };

  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDraggedSection(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    if (draggedSection === null) return;
    
    const draggedIndex = sections.findIndex(s => s.id === draggedSection);
    const targetIndex = sections.findIndex(s => s.id === targetId);
    
    if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
      const newSections = [...sections];
      const [draggedItem] = newSections.splice(draggedIndex, 1);
      newSections.splice(targetIndex, 0, draggedItem);
      setSections(newSections);
    }
    setDraggedSection(null);
  };

  return (
    <div style={{ width: width }} className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Preview Mode Toggle */}
        <div className="mb-8 flex items-center justify-between">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resume Optimizer
            </h1>
            <p className="text-gray-600 mt-2">Enhance your resume with AI-powered insights</p>
          </div>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            {previewMode ? (
              <>
                <FiEye className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Preview Mode</span>
              </>
            ) : (
              <>
                <FiEyeOff className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Edit Mode</span>
              </>
            )}
          </button>
        </div>

        {/* Resume Stats */}
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiFileText className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-600">Resume Statistics</span>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{estimatedPages}</p>
              <p className="text-xs text-gray-500">Pages</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{wordCount}</p>
              <p className="text-xs text-gray-500">Words</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{sections.filter(s => s.visible).length}</p>
              <p className="text-xs text-gray-500">Sections</p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-2 mb-6 bg-white rounded-xl p-1 shadow-sm">
          <button
            onClick={() => setActiveTab("analyze")}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
              activeTab === "analyze"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Analyze Resume
          </button>
          <button
            onClick={() => setActiveTab("manage")}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
              activeTab === "manage"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Manage Resume
          </button>
          <button
            onClick={() => setActiveTab("sections")}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
              activeTab === "sections"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Customize Sections
          </button>
        </div>

        {/* Analyze Resume Tab */}
        {activeTab === "analyze" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Job Description Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Job Description (Optional)
              </h2>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here to get targeted analysis, or leave empty for general resume improvement..."
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
              />
            </div>

            {/* Analysis Button */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              {jobDescription.trim() ? (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Targeted Analysis
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm">
                    Analyzing your resume against the provided job description
                  </p>
                  <button
                    onClick={handleAnalyzeWithJD}
                    disabled={isAnalyzing}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isAnalyzing ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Resume (Match Score + Missing Keywords + Suggestions)"
                    )}
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    General Improvement
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm">
                    Get general suggestions to improve your resume without a specific job target
                  </p>
                  <button
                    onClick={handleImproveGenerally}
                    disabled={isAnalyzing}
                    className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isAnalyzing ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Analyzing...
                      </>
                    ) : (
                      "Improve CV Generally"
                    )}
                  </button>
                </>
              )}
            </div>

            {/* Analysis Results */}
            {analysisResult && (
              <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
                  <div className="text-4xl font-bold text-blue-600">{analysisResult.score}%</div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Missing Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.missingKeywords.map((keyword, index) => (
                        <span key={index} className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Suggestions</h4>
                    <div className="space-y-2">
                      {analysisResult.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                          <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-700">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Buttons After Analysis */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                    {jobDescription.trim() && (
                      <button
                        onClick={handleGenerateCoverLetter}
                        className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium cursor-pointer"
                      >
                        Generate Cover Letter
                      </button>
                    )}
                    <button
                      onClick={handleOptimizeResume}
                      className={`px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium cursor-pointer ${!jobDescription.trim() ? 'col-span-2' : ''}`}
                    >
                      Optimize Resume
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Manage Resume Tab */}
        {activeTab === "manage" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiFileText className="w-5 h-5 text-teal-600" />
                Resume Management
              </h2>
              
              {/* File Upload for Parsing */}
              <div className="mb-6">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-teal-500 transition-all hover:bg-teal-50"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="text-gray-600">
                    <FiUpload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    {selectedFile ? (
                      <div>
                        <p className="text-green-600 font-medium">{selectedFile.name}</p>
                        {parsedData && (
                          <div className="mt-4 text-left bg-gray-50 p-4 rounded-lg">
                            <p className="font-semibold text-gray-700 mb-2">✓ Resume Parsed Successfully</p>
                            <p className="text-sm text-gray-600">Name: {parsedData.name}</p>
                            <p className="text-sm text-gray-600">Email: {parsedData.email}</p>
                            <p className="text-sm text-gray-600">Skills: {parsedData.skills.join(", ")}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <p className="font-medium text-lg">Upload your resume for parsing</p>
                        <p className="text-sm mt-2">Click to upload your existing CV (PDF format)</p>
                        <p className="text-xs text-gray-500 mt-1">We'll extract your data to help optimize it</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Resume Preview/Edit */}
              <div className="mb-6 border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-3">Resume Content</h3>
                {previewMode ? (
                  <div className="space-y-4">
                    {sections.filter(s => s.visible).map((section) => (
                      <div key={section.id} className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-semibold text-gray-900 mb-2">{section.name}</h4>
                        <div className="text-sm text-gray-700 whitespace-pre-wrap">
                          {showOptimized[section.id] && optimizedContent[section.id] ? (
                            <>
                              <div className="bg-green-50 p-3 rounded-lg mb-2 border border-green-200">
                                <p className="text-xs text-green-600 font-medium mb-1">✨ Optimized Version</p>
                                {optimizedContent[section.id]}
                              </div>
                              <button
                                onClick={() => handleRevertOptimization(section.id)}
                                className="text-xs text-blue-600 hover:text-blue-700 mt-2 cursor-pointer"
                              >
                                Revert to original
                              </button>
                            </>
                          ) : (
                            section.content
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sections.filter(s => s.visible).map((section) => (
                      <div key={section.id}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{section.name}</label>
                        <textarea
                          className="w-full p-3 border rounded-lg font-mono text-sm"
                          rows={4}
                          defaultValue={section.content}
                          placeholder={`Enter ${section.name.toLowerCase()}...`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid gap-3">
                <button
                  onClick={handleDownload}
                  disabled={!selectedFile}
                  className={`px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    selectedFile 
                      ? "bg-gray-800 text-white hover:bg-gray-900" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <FiDownload className="w-5 h-5" />
                  Download Optimized Resume
                </button>
                <button
                  onClick={handleLinkPortfolio}
                  className="px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FiLink className="w-5 h-5" />
                  Link Portfolio
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Customize Sections Tab */}
        {activeTab === "sections" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiGrid className="w-5 h-5 text-indigo-600" />
                Customize Sections
              </h2>
              
              <div className="space-y-3 mb-6">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, section.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, section.id)}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all group cursor-move"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={section.visible}
                        onChange={() => toggleSectionVisibility(section.id)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className={`text-gray-700 font-medium ${!section.visible ? 'line-through text-gray-400' : ''}`}>
                        {section.name}
                      </span>
                      {["Professional Summary", "Work Experience", "Projects"].includes(section.name) && (
                        <FaRobot className="w-4 h-4 text-purple-500 ml-2" title="AI Optimizable" />
                      )}
                    </div>
                    <div className="flex gap-2">
                      <IoMdMove className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-600 transition-all font-medium flex items-center justify-center gap-2 cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Custom Section
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">💡 Pro Tip</h3>
              <p className="text-sm text-gray-600">
                Drag and drop sections to reorder them. Use checkboxes to show/hide sections. 
                Sections with <FaRobot className="w-4 h-4 inline text-purple-500" /> icon can be optimized by AI.
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}