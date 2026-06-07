export class Validator {

    static isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    static isValidPhone(phone: string): boolean {
        return /^\+\d{8,15}$/.test(phone);
    }

}
