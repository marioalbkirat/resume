export type ErrorType = Record<string, string[]>;
type Data = Record<string, unknown>;
type Rule = | "required" | "optional" | `type:${string}` | `min:${number}` | `max:${number}` | `file:${string}` | "isValidIP" | "isValidUrl" | "isValidEmail" | "isArray" | `enum:${string}` | `minDate:${string}` | `maxDate:${string}` | `mimetypes:${string}`;
type Schema = Record<string, Rule[]>;
interface ValidatableFile { name: string; size: number; type: string; arrayBuffer?: () => Promise<ArrayBuffer>; buffer?: () => Buffer; }
export class Validation {
    public static readonly allowedTypes: string[] = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/avif", "image/svg+xml", "image/bmp", "image/tiff", "image/x-icon", "image/vnd.microsoft.icon", "application/pdf"];
    protected static readonly DEFAULT_MAX_SIZE = process.env.DEFAULT_MAX_SIZE ? Number(process.env.DEFAULT_MAX_SIZE) : 3 * 1024 * 1024;
    private static errors: ErrorType = {};
    private static readonly EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    private static readonly DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
    public static schema(data: Data, schema: Schema): ErrorType {
        this.resetErrors();
        for (const field in schema) {
            const value = data[field];
            const rules = schema[field];
            this.validateField(field, value, rules);
        }
        return this.errors;
    }
    private static validateField(field: string, value: unknown, rules: Rule[]): void {
        if (rules.includes("required" as Rule)) {
            this.required(field, value);
            if (this.errors[field]) return;
        }
        if (rules.includes("optional" as Rule) && this.isEmptyValue(value)) return;
        const typeRule = rules.find(rule => rule.startsWith("type:"));
        if (typeRule) {
            const [, type] = typeRule.split(":");
            value = this.type(field, value, type);
            if (this.errors[field]) return;
        }
        for (const rule of rules) {
            if (rule === "required" || rule === "optional" || rule.startsWith("type:")) continue;
            const [ruleName, ruleParam] = rule.split(":");
            switch (ruleName) {
                case "min":
                    this.min(field, value, parseInt(ruleParam, 10));
                    break;
                case "max":
                    this.max(field, value, parseInt(ruleParam, 10));
                    break;
                case "file":
                    this.file(field, value, ruleParam);
                    break;
                case "mimetypes":
                    this.mimetypes(field, value, ruleParam.split(","));
                    break;
                case "isValidIP":
                    this.isValidIP(field, value);
                    break;
                case "isValidUrl":
                    this.isValidUrl(field, value);
                    break;
                case "isValidEmail":
                    this.isValidEmail(field, value);
                    break;
                case "isArray":
                    this.isArray(field, value);
                    break;
                case "enum":
                    this.isValidEnum(field, value, ruleParam.split(","));
                    break;
                case "minDate":
                    this.minDate(field, value, this.parseDate(ruleParam) as Date);
                    break;
                case "maxDate":
                    this.maxDate(field, value, this.parseDate(ruleParam) as Date);
                    break;
            }
        }
        return;
    }
    private static isEmptyValue(value: unknown): boolean {
        return value === undefined || value === null || value === "";
    }
    private static required(field: string, value: unknown): void | null {
        if (this.isEmptyValue(value)) this.registerAnError(field, `${field} is required`);
    }
    private static type(field: string, value: unknown, type: string): unknown {
        switch (type) {
            case "string":
                return String(value);
            case "number": {
                if (isNaN(Number(value))) {
                    this.registerAnError(field, `Expected number but got ${typeof value}`);
                    return null;
                }
                return Number(value);
            }
            case "boolean": {
                if (typeof value === "boolean") return value;
                if (typeof value === "string") {
                    const lower = value.toLowerCase();
                    if (lower === "true") return true;
                    if (lower === "false") return false;
                }
                if (typeof Number(value) === "number") {
                    if (value == 1) return true;
                    if (value == 0) return false;
                }
                this.registerAnError(field, `Expected boolean but got ${typeof value}`);
                return null;
            }
            case "date": {
                const date = this.parseDate(value);
                if (!date) {
                    this.registerAnError(field, `Expected valid date in YYYY-MM-DD format but got ${typeof value === 'string' ? value : typeof value}`);
                    return null;
                }
                return date;
            }
            default: {
                this.registerAnError(field, `Unknown type: ${type}`);
                return null;
            }
        }
    }
    private static parseDate(value: unknown): Date | null {
        if (typeof value !== "string") return null;
        if (!Validation.DATE_REGEX.test(value)) return null;
        const [year, month, day] = value.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
        return date;
    }
    private static min(field: string, value: unknown, min: number): void {
        if (Array.isArray(value) && value.length < min) this.registerAnError(field, `${field} minimum length ${min}`);
        else if (typeof value === "number" && value < min) this.registerAnError(field, `${field} minimum value ${min}`);
        else if (typeof value === "string" && value.length < min) this.registerAnError(field, `${field} minimum length ${min}`);
    }
    private static max(field: string, value: unknown, max: number): void {
        if (Array.isArray(value) && value.length > max) this.registerAnError(field, `${field} maximum length ${max}`);
        else if (typeof value === "number" && value > max) this.registerAnError(field, `${field} maximum value ${max}`);
        else if (typeof value === "string" && value.length > max) this.registerAnError(field, `${field} maximum length ${max}`);
    }
    private static minDate(field: string, value: unknown, min: Date): void {
        if (value instanceof Date && value < min) this.registerAnError(field, `${field} minimum date ${min.toISOString().split('T')[0]}`);
    }
    private static maxDate(field: string, value: unknown, max: Date): void {
        if (value instanceof Date && value > max) this.registerAnError(field, `${field} maximum date ${max.toISOString().split('T')[0]}`);
    }
    private static isValidIP(field: string, value: unknown): void {
        if (typeof value !== "string" || !this.isIP(value)) this.registerAnError(field, `Invalid IP address: ${value}`);
    }
    private static isValidUrl(field: string, value: unknown): void {
        if (typeof value !== "string") {
            this.registerAnError(field, `Invalid URL: ${value}`);
            return;
        }
        try {
            const url = new URL(value);
            if (url.protocol !== "http:" && url.protocol !== "https:") {
                this.registerAnError(field, `Invalid URL protocol: ${value}`);
            }
        } catch {
            this.registerAnError(field, `Invalid URL: ${value}`);
        }
    }
    // isIP.ts
    private static isIPv4(value: string): boolean {
        const parts = value.split('.');
        if (parts.length !== 4) return false;
        return parts.every(part => {
            const n = Number(part);
            return !isNaN(n) && n >= 0 && n <= 255 && part === n.toString();
        });
    }

    private static isIPv6(value: string): boolean {
        // تحقق أساسي من IPv6: 8 مجموعات hex مفصولة بـ ":"
        const parts = value.split(':');
        if (parts.length < 3 || parts.length > 8) return false;

        return parts.every(part => /^[0-9a-fA-F]{0,4}$/.test(part));
    }

    private static isIP(value: string): boolean {
        return this.isIPv4(value) || this.isIPv6(value);
    }
    private static isValidEmail(field: string, value: unknown): void {
        if (typeof value !== "string" || !Validation.EMAIL_REGEX.test(value)) this.registerAnError(field, `Invalid email: ${value}`);
    }
    private static isValidEnum(field: string, value: unknown, allowedValues: string[]): void {
        const stringValue = String(value);
        if (!allowedValues.includes(stringValue)) this.registerAnError(field, `Value ${value} is not in allowed values: ${allowedValues.join(", ")}`);
    }
    private static isArray(field: string, value: unknown): void {
        if (!Array.isArray(value)) this.registerAnError(field, `Expected array but got ${typeof value}`);
    }
    private static mimetypes(field: string, value: unknown, mimetypes: string[]): void {
        if (!this.isFile(value)) {
            this.registerAnError(field, `Expected file for mimetypes validation but got ${typeof value}`);
            return;
        }
        if (!mimetypes.includes(value.type)) this.registerAnError(field, `Invalid file type. Allowed types: ${mimetypes.join(", ")}`);
    }
    private static file(field: string, value: unknown, param: string): void {
        if (!this.isFile(value)) {
            this.registerAnError(field, `Expected file but got ${typeof value}`);
            return;
        }
        const [fileType, maxSize] = param.split(",");
        if (!Validation.allowedTypes.includes(value.type)) {
            this.registerAnError(field, "Invalid file type. Please upload a supported file.");
            return;
        }
        if (fileType === "image" && !value.type.startsWith("image")) this.registerAnError(field, "Only image files are allowed");
        else if (fileType === "pdf" && value.type !== "application/pdf") this.registerAnError(field, "Only PDF files are allowed");
        const maxFileSize = maxSize ? this.convertToBytes(maxSize) : Validation.DEFAULT_MAX_SIZE;
        if (value.size > maxFileSize) {
            const sizeInMB = maxFileSize / (1024 * 1024);
            this.registerAnError(field, `Invalid file size. Please upload a file smaller than ${sizeInMB} MB.`);
        }
    }
    private static convertToBytes(size: string): number {
        const match = size.toLowerCase().match(/^(\d+)(kb|mb)$/);
        if (!match) throw new Error("Invalid size format");
        const value = parseInt(match[1], 10);
        return match[2] === "kb" ? value * 1024 : value * 1024 * 1024;
    }
    private static registerAnError(field: string, message: string): void {
        if (!this.errors[field]) this.errors[field] = [];
        this.errors[field].push(message);
    }
    private static resetErrors(): void {
        this.errors = {};
    }
    private static isFile(value: unknown): value is ValidatableFile {
        if (!value || typeof value !== "object") return false;
        const file = value;
        if ("name" in file && "size" in file && "type" in file) {
            if (typeof file.size !== "number") return false;
            if ("arrayBuffer" in file || "buffer" in file) return true;
            return true;
        }
        return false;
    }
}