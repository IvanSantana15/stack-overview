import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../firebase"
import {useNavigate} from "react-router-dom"


const  AuthContext = createContext();

export const useAuth = ()=> useContext(AuthContext)

export const AuthProvider = ({children})=>{

    const [loading, setLoading ] = useState(true)
    const [user, setUser ] = useState(null)
    const navigate = useNavigate()


    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            setUser(user)
            setLoading(false)
            //navigate("/")
            
        })
    },[user, navigate])

    const value = {loading, user, setUser}
    
    return(
        <AuthContext.Provider value={value}>
                {!loading && children}
        </AuthContext.Provider>
    )
}