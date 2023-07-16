import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from '../firebase/firebase';
import { GoogleAuthService } from "../services/GoogleAuthService";
export const GoogleAuth = async (title) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebaseApp);
    try {
        const data =await signInWithPopup(auth, provider)
        console.log(data.user);
        return await GoogleAuthService({email:data?.user?.email,title:title,name:data?.user?.name})
    } catch (error) {
        console.error(error);
        return ""
    }
}