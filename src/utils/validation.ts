import net from 'net';
type ValidationRules = { [key: string]: unknown };
type ValidationError = { fieldName: string; errorMessage: string };
class FieldValidator {
    private fieldName: string;
    private value: unknown;
    private errors: ValidationError[];
    constructor(fieldName: string, value: unknown, errors: ValidationError[]) {
        this.fieldName = fieldName;
        this.value = value;
        this.errors = errors;
    }
    required() {
        if (this.value === undefined || this.value === null || this.value === "") {
            this.errors.push({
                fieldName: this.fieldName,
                errorMessage: `${this.fieldName} is required`
            });
        }
        return this;
    }
    optional() {
        if (this.value === undefined || this.value === null) {
            this.value = null;
        }
        return this;
    }
    isString() {
        if (this.value != null && typeof this.value !== "string") {
            this.errors.push({
                fieldName: this.fieldName,
                errorMessage: `Expected string but got ${typeof this.value}`
            });
        }
        return this;
    }
    isNumber() {
        if (this.value != null && typeof this.value !== "number") {
            this.errors.push({
                fieldName: this.fieldName,
                errorMessage: `Expected number but got ${typeof this.value}`
            });
        }
        return this;
    }
    isInteger() {
        if (this.value != null && !Number.isInteger(this.value)) {
            this.errors.push({
                fieldName: this.fieldName,
                errorMessage: `Expected integer but got ${this.value}`
            });
        }
        return this;
    }
    min(val: number) {
        if (this.value != null && typeof this.value === "number" && this.value < val) {
            this.errors.push({
                fieldName: this.fieldName,
                errorMessage: `Value ${this.value} is less than minimum ${val}`
            });
        }
        return this;
    }
    max(val: number) {
        if (this.value != null && typeof this.value === "number" && this.value > val) {
            this.errors.push({
                fieldName: this.fieldName,
                errorMessage: `Value ${this.value} exceeds maximum ${val}`
            });
        }
        return this;
    }
    minLength(val: number) {
        if (this.value != null && typeof this.value === "string" && this.value.length < val) {
            this.errors.push({
                fieldName: this.fieldName,
                errorMessage: `Length ${this.value.length} is less than minimum ${val}`
            });
        }
        return this;
    }
    maxLength(val: number) {
        if (this.value != null && typeof this.value === "string" && this.value.length > val) {
            this.errors.push({
                fieldName: this.fieldName,
                errorMessage: `Length ${this.value.length} exceeds maximum ${val}`
            });
        }
        return this;
    }
    isValidIP() {
        if (this.value != null && (typeof this.value !== "string" || net.isIP(this.value) === 0)) {
            this.errors.push({
                fieldName: this.fieldName,
                errorMessage: `Invalid IP address: ${this.value}`
            });
        }
        return this;
    }
    isValidUrl() {
        if (this.value != null) {
            if (typeof this.value !== "string") {
                this.errors.push({
                    fieldName: this.fieldName,
                    errorMessage: `Expected string but got ${typeof this.value}`
                });
            } else {
                try {
                    new URL(this.value);
                } catch {
                    this.errors.push({
                        fieldName: this.fieldName,
                        errorMessage: `Invalid URL: ${this.value}`
                    });
                }
            }
        }
        return this;
    }
    isValidEmail() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value != null && (typeof this.value !== "string" || !regex.test(this.value))) {
            this.errors.push({
                fieldName: this.fieldName,
                errorMessage: `Invalid email: ${this.value}`
            });
        }
        return this;
    }
    isValidEnum(allowedValues: unknown[]) {
        if (this.value != null && !allowedValues.includes(this.value)) {
            this.errors.push({
                fieldName: this.fieldName,
                errorMessage: `Value ${this.value} is not in allowed values: ${allowedValues.join(", ")}`
            });
        }
        return this;
    }
    isArray() {
        if (this.value != null && !Array.isArray(this.value)) {
            this.errors.push({
                fieldName: this.fieldName,
                errorMessage: `Expected array but got ${typeof this.value}`
            });
        }
        return this;
    }
    
}
export class Validation {
    private data: ValidationRules;
    private errors: ValidationError[] = [];
    constructor(data: ValidationRules) {
        this.data = data;
    }
    field(fieldName: string) {
        const value = this.data[fieldName];
        return new FieldValidator(fieldName, value, this.errors);
    }
    getErrors() {
        return this.errors;
    }
    isValid() {
        return this.errors.length === 0;
    }
}