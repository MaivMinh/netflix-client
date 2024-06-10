import { GoogleAuthProvider } from "firebase/auth";
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export { googleProvider };
