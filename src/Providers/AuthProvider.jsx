import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import app from '../Firebase/firebase.config';
import { GithubAuthProvider, GoogleAuthProvider, updateProfile} from 'firebase/auth';



export const AuthContext =createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const googleProvider = new GoogleAuthProvider();
    const gitProvider = new GithubAuthProvider();

    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser= async (email, password, name, photo) =>{
        setLoading(true);
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const res2 =await updateProfile( res.user, {displayName:name, photoURL:photo})
        console.log(res,res2);
        return res;
    }

    const userUpdate = (name, photo)=>{
        updateProfile(auth.currentUser,{
            displayName: name,
            photoURL: photo
        })
        .then(()=>{
            alert('User Updated');
        }).catch(error=>{
            console.log(error);
        })
    }

    const signIn = (email, password) =>{

        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () =>{
        return signInWithPopup(auth, googleProvider);  
    }

    const gitLogin = () =>{
        return signInWithPopup (auth,gitProvider);
    }


    const logOut = () =>{
        return signOut(auth);
    }

    
    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
            setLoading(false);
        });
        return ()=>{
            return unsubscribe();
        }
    },[])




    
    const authInfo ={
        user,
        loading,
        createUser,
        signIn,
        logOut,
        googleLogin,
        gitLogin,
        userUpdate,

        
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            
        </AuthContext.Provider>
    );
};

export default AuthProvider;