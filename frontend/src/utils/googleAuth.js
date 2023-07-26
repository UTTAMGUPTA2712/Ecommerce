import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from '../firebase/firebase';
import { GoogleAuthService } from "../services/Auth/GoogleAuthService";
import { googlepopclose, serverError } from "../data/constants";
export const GoogleAuth = async (title) => {
    try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebaseApp);
        const data = await signInWithPopup(auth, provider)
        const response = await GoogleAuthService({ email: data?.user?.email, title: title, name: data?.user?.displayName })
        return response
    } catch (error) {
        // console.log(error);
        if (error.code === "auth/popup-closed-by-user") {
            return googlepopclose
        } else {
            return serverError
        }
    }
}