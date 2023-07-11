import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from '../firebase/firebase';
import { GoogleAuthService } from "../services/GoogleAuthService";
export const GoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebaseApp);
    try {
        const data =await signInWithPopup(auth, provider)
        console.log(data.user);
        return await GoogleAuthService(data?.user?.email)
    } catch (error) {
        console.error(error);
        return ""
    }
}