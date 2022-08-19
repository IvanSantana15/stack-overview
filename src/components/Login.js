import { signInWithEmailAndPassword } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import { useStore } from "../store/StoreProvider"
import { types } from "../store/storeReducer"

const Login = () => {
    const [store, dispatch] = useStore()
    const {loginFormDate:{loginEmail, loginPassword}} = store
   
    const navigate = useNavigate()

    const signIn = async(e)=>{
        e.preventDefault()

        try {
            const user =  await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            dispatch({type: types.setUser, payload: user})
            navigate(-1)
        
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="container " style={{ "height": "100vh" }}>
            <div className="row w-100 d-flex flex-column justify-content-center align-items-center p-5 ">
                <div className="col-sm-5  bg-white rounded ">
                    <div className="text-center">
                        <h3>Inicia sesion</h3>
                    </div>
                    <form className="p-3 border shadow-sm d-flex flex-column justify-content-center"
                    onSubmit={(e)=> signIn(e)}
                    >
                        <div className="form-group p-2">
                            <label htmlFor="exampleInputEmail1">Correo</label>
                            <input type="email" required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                            onChange={(e)=>  dispatch({type: types.loginFormDataEmail, payload: e.target.value})}
                            />
                           
                        </div>
                        <div className="form-group p-2">
                            <label htmlFor="exampleInputPassword1">Contraseña</label>
                            <input type="password" required className="form-control" id="exampleInputPassword1" 
                              onChange={(e)=> dispatch({type: types.loginFormDataPassword, payload: e.target.value})}
                            />
                        </div>
                        <div className="form-group p-2 text-center mb-3">
                                <button type="submit" className=" form-control btn btn-primary p-2">Iniciar sesion</button>
                        </div>
                        <div className="form-group p-1 text-center mb-3">
                                <Link to="/registrarme">Registrarme</Link>
                        </div>
                          
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login