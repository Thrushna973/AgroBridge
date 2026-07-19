import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    useEffect(()=>{

        const token=localStorage.getItem("token");

        if(!token)return;

        fetch("http://localhost:5000/api/auth/me",{

            headers:{

            Authorization:`Bearer ${token}`

            }

        })

        .then(res=>res.json())

        .then(data=>{
            console.log("ME API Response:", data);
        setUser(data);

        });

    },[]);

    return (

        <AuthContext.Provider
            value={{
                user,
                setUser
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};
