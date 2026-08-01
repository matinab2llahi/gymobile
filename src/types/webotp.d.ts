export {};

declare global {
    // اعتبارنامه‌ای که WebOTP برمی‌گردونه
    interface OTPCredential extends Credential {
        readonly code: string;
    }

    // اضافه کردن فیلد otp به آپشن‌های credentials.get
    interface CredentialRequestOptions {
        otp?: {
            transport?: string[];
        };
    }
}