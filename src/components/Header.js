import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { useStore } from "../store/StoreProvider"
import { type } from "@testing-library/user-event/dist/type"
import { types } from "../store/storeReducer"

const Header = () => {
  const [store, dispatch] = useStore()
  const { user } = useAuth()
  const navigate = useNavigate()

  const signOutCurrentUser = async () => {

    const user = await signOut(auth)
    navigate(-1)
  }



const handleSumit =(e)=>{
  e.preventDefault()

  const filteredQuestions = store.questions.filter(question => question.question.search(e.target.search.value) != -1)
  dispatch({type: types.setFilteredQuestion, payload: filteredQuestions})
  
  navigate(`/filtered-question/${e.target.search.value}`)
}

  return (
    <div className="container-fluid p-0 w-100">
  
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <a className="navbar-brand" href="#">Stack overview</a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className=" d-flex justify-content-around navbar-collapse " id="navbarNav">
      
            <form className="form-inline d-flex col-md-5"onSubmit={handleSumit}>
                <input name="search" className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
              </form>
          
          
          <ul className="navbar-nav d-flex align-items-center  ">
            <li className="nav-item  mx-3 ">
            <Link className=" nav-link text-decoration-none" to={"/iniciar"}> Iniciar sesion</Link>
            </li>
            <li className="nav-item mx-3">
            <Link className=" nav-link text-decoration-none" to={"/registrarme"}> Registrarse</Link>
            </li>
            <li className="nav-item mx-3 " >
             <button className="btn btn-outline-info" onClick={ signOutCurrentUser }>Cerrar sesion</button>
            </li>
            
          </ul>

        
       
        </div>

      </nav>
    
    </div>
  )
}

export default Header



