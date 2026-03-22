import fs from "fs";
import path from "path";
import crypto from "crypto";

type DirectoryConfig = {
    folder: string;
    buildPath: (uid?: string) => { absolutePath: string; relativePath: string };
};

export class UploadFile {
    public static readonly allowedTypes: string[] = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/avif", "image/svg+xml", "image/bmp", "image/tiff", "image/x-icon", "image/vnd.microsoft.icon", "application/pdf"];
    public static readonly DEFAULT_MAX_SIZE: number = process.env.DEFAULT_MAX_SIZE ? Number(process.env.DEFAULT_MAX_SIZE) : 3 * 1024 * 1024;
    private maxFileSize: number = UploadFile.DEFAULT_MAX_SIZE;
    private folderName: string;
    private userId: string;
    private olderFile: string | null | undefined = null;
    private allowedTypes: string[];
    constructor(folderName: string, userId: string, olderFile?: string | null | undefined) {
        this.userId = userId;
        this.allowedTypes = UploadFile.allowedTypes.slice();
        this.maxFileSize = UploadFile.DEFAULT_MAX_SIZE;
        this.folderName = folderName;
        this.ensureFolderExists();
        if (olderFile) this.olderFile = olderFile;
    }
    private static computeStage() {
        const environment = (process.env.NODE_ENV as "development" | "production" | "test") ?? "development";
        const url = (process.env.NEXTAUTH_URL as "http://localhost:3000" | "https://www.portcv.com") ?? "http://localhost:3000";
        return (environment === "development" && url === "http://localhost:3000") ? "local" : "live";
    }
    public static getDirectory(folder: string, userId?: string): { absolutePath: string; relativePath: string } {
        const stage = this.computeStage();
        const directories: DirectoryConfig[] = [
            {
                folder: "portfolios-images",
                buildPath: () => ({
                    absolutePath: stage === "local" ? path.join(process.cwd(), "public", "uploads", "portfolios-images") : path.join("/var/www", "uploads", "portfolios-images"),
                    relativePath: "/uploads/portfolios-images"
                })
            },
            {
                folder: "resume-images",
                buildPath: () => ({
                    absolutePath: stage === "local" ? path.join(process.cwd(), "public", "uploads", "resume-images") : path.join("/var/www", "uploads", "resume-images"),
                    relativePath: "/uploads/resume-images"
                })
            },
            {
                folder: "user-portfolio-assets",
                buildPath: (uid?: string) => {
                    if (!uid) throw new Error("userId is required for user-portfolio-assets");
                    return {
                        absolutePath: stage === "local" ? path.join(process.cwd(), "public", "uploads", "user-portfolio-assets", uid) : path.join("/var/www", "uploads", "user-portfolio-assets", uid),
                        relativePath: `/uploads/user-portfolio-assets/${uid}`
                    };
                }
            },
            {
                folder: "portfolios",
                buildPath: (uid?: string) => ({
                    absolutePath: stage === "local" ? `D:/portfolios/${uid}` : `/var/www/portfolios/${uid}`,
                    relativePath: `/portfolios/${uid}`
                })
            },
            {
                folder: "avatars",
                buildPath: () => ({
                    absolutePath: stage === "local" ? path.join(process.cwd(), "public", "uploads", "avatars") : path.join("/var/www", "uploads", "avatars"),
                    relativePath: "/uploads/avatars"
                })
            }
        ];

        const dir = directories.find((entry) => entry.folder === folder);
        if (!dir) throw new Error(`Folder "${folder}" is not defined`);
        return dir.buildPath(userId);
    }
    private setFileSize(fileSize: string): void {
        const match = fileSize.toLowerCase().match(/^(\d+)(kb|mb)$/);
        if (!match) throw new Error("Invalid file size format. Use 'kb' or 'mb'");
        const value = Number(match[1]);
        const size = match[2] === "kb" ? value * 1024 : value * 1024 * 1024;
        if (size > UploadFile.DEFAULT_MAX_SIZE) throw new Error(`File size too large! Maximum allowed is ${UploadFile.DEFAULT_MAX_SIZE / (1024 * 1024)}MB`);
        this.maxFileSize = size;
    }
    private getUploadPath(): { absolutePath: string; relativePath: string } {
        return UploadFile.getDirectory(this.folderName, this.userId);
    }
    private ensureFolderExists(): void {
        const dir = this.getUploadPath().absolutePath;
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    }
    private generateUniqueFileName(originalName: string): string {
        return `${crypto.randomUUID()}${path.extname(originalName)}`;
    }
    async uploadFile(file: unknown): Promise<{ fileName: string; relativePath: string; absolutePath: string }> {
        if (!(file instanceof File)) throw new Error("No file uploaded");
        if (!this.allowedTypes.includes(file.type)) throw new Error("Invalid file type");
        if (file.size > this.maxFileSize) throw new Error(`File size exceeds limit of ${this.maxFileSize} bytes`);
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = this.generateUniqueFileName(file.name);
        const build = this.getUploadPath();
        const filePath = path.join(build.absolutePath, fileName);
        await fs.promises.writeFile(filePath, buffer);
        if (this.olderFile) this.deleteFile();
        return { fileName, relativePath: `${build.relativePath}/${fileName}`, absolutePath: `${build.absolutePath}/${fileName}` };
    }
    deleteFile(): void {
        if (!this.olderFile) return;
        const fullPath = path.isAbsolute(this.olderFile) ? this.olderFile : path.join(process.cwd(), this.olderFile);
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }
}