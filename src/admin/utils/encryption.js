import CryptoJS from "crypto-js";

// Kunci enkripsi, ini bisa disimpan di environment variable untuk keamanan lebih baik
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

// Fungsi untuk mengenkripsi data
export const encryptData = (data) => {
    try {
      const stringifiedData = JSON.stringify(data); // Konversi objek menjadi string
      const encrypted = CryptoJS.AES.encrypt(stringifiedData, ENCRYPTION_KEY).toString();
      return encrypted;
    } catch (e) {
      console.error("Encryption failed:", e);
      return null;
    }
  };
  
  // Fungsi untuk mendekripsi data
export const decryptData = (encryptedData) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      if (!decryptedData) {
        console.error("Decryption returned empty data");
        return null;
      }
      return JSON.parse(decryptedData); // Konversi string JSON menjadi objek
    } catch (e) {
      console.error("Decryption failed:", e);
      return null;
    }
  };
