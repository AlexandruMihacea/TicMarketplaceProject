import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import api from './api'

const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, userId: userCredential.user.uid };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    console.log("Token: " + token); 
    if(token){
      const response = await api.getUser(`/users/${userCredential.user.uid}`);
      if (response.success && response.user) {  
        return { 
          success: true, 
          userId: userCredential.user.uid, 
          token, 
          firstName: response.user.firstName || "", 
          lastName: response.user.lastName || "", 
          email: response.user.email || "" 
        };
      }
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default { register, login, logout };
