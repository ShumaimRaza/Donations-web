import React, {useContext, useState, useEffect} from "react"
import {getUserApi, loginApi, logoutApi, registerApi} from "../api/Auth";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        try {
            getUserApi()
                .then(data => {
                    setCurrentUser(data.user)
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                })
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }, [1])

    async function login(username, password) {
        try {
            const userData = await loginApi(username, password);
            await getCurrentUser();
            console.log(userData)
            return userData?.user;
        } catch (err) {
            console.log(err)
            throw new Error(err.response?.data?.message || 'Invalid username password');
        }
    }

    async function register(ngo) {
        try {
            const response = await registerApi(ngo);
            console.log("Registration response: ", response)
            return response;
        } catch (err) {
            console.log(err)
            throw new Error(err.response?.data?.message || 'Error registering ngo');
        }
    }

    async function getCurrentUser() {
        getUserApi()
            .then(data => {
                console.log("User fetched: ", data.user)
                setCurrentUser(data.user)
            }).catch(err => {
            throw new Error(err.response?.data?.message || 'Unable to fetch user');
        })
    }

    async function logout() {
        try {
            await logoutApi()
            setCurrentUser(null)
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Unable to logout');
        }
    }

    const value = {
        currentUser,
        setCurrentUser,
        getCurrentUser,
        login,
        logout,
        register
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}