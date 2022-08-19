import firebase from "firebase/compat/app"
import { auth } from "../firebase"
import {createUserWithEmailAndPassword} from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useStore } from "../store/StoreProvider"
import { types } from "../store/storeReducer"

const Register = () => {
    const[store, dispatch] = useStore()
    const {registerFormDate:{registerEmail, registerPassword}}= store
   
   
     const navigate = useNavigate()

const register = async(e)=>{
    e.preventDefault()
    try {
        const user =  await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        dispatch({type: types.setUser, payload: user})
        navigate("/")
        
    } catch (error) {
        console.log(error)
    }
  
}

    return (
        <div className="container " style={{ "height": "100vh" }}>
            <div className="row w-100 d-flex flex-column justify-content-center align-items-center p-5  ">
                <div className="col-sm-5  bg-white rounded ">
                    <div className="text-center">
                        <h3>Registro</h3>
                    </div>
                    <form className="p-3 border shadow-sm d-flex flex-column justify-content-center" 
                    
                    onSubmit={(e)=>  register(e)}>
                        <div className="form-group p-2">
                            <label htmlFor="exampleInputEmail1">Correo</label>
                            <input type="email"  required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                            onChange={(e)=> dispatch( {type:types.registerFormDataEmail,payload: e.target.value})}
                            />
                            <small id="emailHelp" className="form-text text-muted"></small>
                        </div>
                        <div className="form-group p-1">
                            <label htmlFor="exampleInputPassword1">Contraseña</label>
                            <input type="password" required className="form-control" id="exampleInputPassword1" 
                             onChange={(e)=> dispatch( {type:types.registerFormDataPassword,payload: e.target.value})}
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