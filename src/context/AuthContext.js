import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import loginApi from "../api/loginApi";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider);
    signInWithRedirect(auth, provider);
  };
  const loginByAccount = (payload) => {
    loginApi
      .login(payload)
      .then((response) => {
        console.log(response);
        setUser(response);
        localStorage.clear();
        localStorage.setItem("userId", response.id);
        // console.log(user);
      })
      .catch((error) => {
        alert("Tên đăng nhập hoặc mật khẩu không chính xác ");
      });
  };
  const logOut = () => {
    signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{ googleSignIn, logOut, user, loginByAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(AuthContext);
};
