import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.CRYPTO_SECRET;

// Encrypt data
export const encrypt = (data) => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

// Decrypt data
export const decrypt = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};