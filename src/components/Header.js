import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

const Header = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const signOutCurrentUser = async () => {

    const user = await signOut(auth)
    console.log(user)
    navigate(-1)
  }
  return (
    <div className="container-fluid p-0 w-100">
  
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <a className="navbar-brand" href="#">Stack overview</a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className=" d-flex justify-content-around navbar-collapse " id="navbarNav">
      
            <form className="form-inline d-flex col-md-5">
                <input className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
              </form>
          
          
          <ul className="navbar-nav  ">
            <li className="nav-item  mx-3">
            <Link to={"/iniciar"}> Iniciar sesion</Link>
            </li>
            <li className="nav-item mx-3">
            <Link to={"/registrarme"}> Registrarse</Link>
            </li>
            <li className=" btn nav-item mx-3 " >
             <button onClick={ signOutCurrentUser }>signOut</button>
            </li>
            <li className="nav-item mx-3">
             home
            </li>
          </ul>

        
        </div>

      </nav>
    
    </div>
  )
}

export default Header



