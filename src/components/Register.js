import firebase from "firebase/compat/app"
import { useState } from "react"
import { auth } from "../firebase"
import {createUserWithEmailAndPassword} from "firebase/auth"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassWord] = useState("")
     const {setUser} = useAuth()
     const navigate = useNavigate()

const register = async(e)=>{
    e.preventDefault()
    try {
        const user =  await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        setUser(user)
        navigate("/")
        console.log(user)
    } catch (error) {
        console.log(error)
    }
  
}

    return (
        <div className="container " style={{ "height": "100vh" }}>
            <div className="row w-100 d-flex flex-column justify-content-center align-items-center p-5 ">
                <div className="col-sm-5  bg-white rounded ">
                    <div className="text-center">
                        <h3>Registro</h3>
                    </div>
                    <form className="p-3 border shadow-sm d-flex flex-column justify-content-center" 
                    
                    onSubmit={(e)=>  register(e)}>
                        <div className="form-group p-2">
                            <label htmlFor="exampleInputEmail1">Correo</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                            onChange={(e)=> setRegisterEmail(e.target.value)}
                            />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group p-1">
                            <label htmlFor="exampleInputPassword1">Contraseña</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" 
                             onChange={(e)=> setRegisterPassWord(e.target.value)}
                            />
                        </div>
                        <div className="form-group p-1 text-center mb-3">
                                <button type="submit" className=" form-control btn btn-primary p-2"
                               
                                >Registrarme</button>
                        </div>

                        <div className="form-group p-1 text-center">
                            <div className="form-control  btn btn-outline-info fs-6 fw-light"
                            onClick={()=> auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider())}
                            >
                                Iniciar sesion con Google
                            </div>
                        </div>
                        <div className="form-group p-1 text-center ">
                            <div className=" form-control btn btn-outline-info fs-6 fw-light"
                            onClick={()=> auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
                            >
                                Iniciar sesion con Facebook
                            </div>
                        </div>

                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register