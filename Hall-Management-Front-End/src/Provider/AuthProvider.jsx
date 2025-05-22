import React, { createContext, useEffect, useState } from 'react';
import{createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
import { app } from '../firebase/firebase.confing';
export const AuthContext = createContext(null);
const googleProvider= new GoogleAuthProvider();

// const [loading,setLoading]=useState(true);

const AuthProvider = ({children}) => {
    const auth=getAuth(app);
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(null);
    const createUser= (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const signInUser= (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    const signInWithGooge = ()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }
   const logOut = ()=>{
    setLoading(true);
    return signOut(auth)
   }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser);
            setLoading(false);
            console.log("observe current user inside useffect of AuthProvider")
        });
        return ()=>{
            unSubscribe();
        }
    },[])


    const authInfo= {
        user,
        loading,
        createUser,
        signInUser,
        logOut,
        signInWithGooge
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;