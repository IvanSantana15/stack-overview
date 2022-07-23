import { signOut } from "firebase/auth"
import { auth, db } from "../firebase"
import { collection, getDocs } from "firebase/firestore"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const questionsCollectionRef = collection(db, "questions")
  const { user } = useAuth()
  const navigate = useNavigate()

  const signOutCurrentUser = async () => {

    const user = await signOut(auth)
    console.log(user)
    navigate(-1)
  }

  const searchQuestions = async () => {
    const data = await getDocs(questionsCollectionRef)
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }
  return (
    <div className="container-fluid p-0 w-100 shadow-sm">

      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <a className="navbar-brand" href="#">Stack overview</a>

        <button className="navbar-toggler mx-1" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
        onClick={()=> setMobileMenu(pre => !pre)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        {
          mobileMenu &&
        <div className="fixed-top w-75 bg-white mt-5 mr-1 border shadow-sm ">
          <div className="d-block d-md-none d-lg-none col-md-2  border border-top-0" >
            <div className=" nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical"
            onClick={()=>setMobileMenu(false)}
            >
              <Link className="text-decoration-none" to={"/"}>
                <span className="nav-link text-secondary" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Inicio</span>
              </Link>

              <Link className="text-decoration-none" to={"/"}>
                <span className="nav-link text-secondary" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Preguntas</span>
              </Link>

              <Link className="text-decoration-none" to={"/nueva-pregunta"}>
                <span className="nav-link text-secondary" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Hacer una Pregunta</span>
              </Link>
              <Link className="text-decoration-none" to={"/nueva-pregunta"}>
                <span className="nav-link text-secondary" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Sobre este sitio</span>
              </Link>
            </div>
            </div>
          </div>
            }
          <div className=" d-flex justify-content-around collapse navbar-collapse " id="navbarNav">

            <form className="form-inline col-md-5 d-none d-md-block d-lg-block">
              <div className="row">

                <div className="col-10">
                  <div className="form-group  w-100">
                    <input className="form-control mr-sm-2 w-100 " type="search" placeholder="Buscar" aria-label="Search"
                      onChange={searchQuestions}
                    />
                  </div>
                </div>
                <div className="col-2">
                  <button className="btn btn-outline-success my-1 my-sm-0 " type="submit">Buscar</button>
                </div>


              </div>
            </form>

            <div className="d-none d-md-block d-lg-block">


              <ul className="navbar-nav d-flex ">
                {
                  !user &&
                  <>
                    <li className="nav-item  mx-3 bg-info rounded">
                      <Link className="nav-link" to={"/iniciar"}> Iniciar sesion</Link>
                    </li>
                    <li className="nav-item mx-3 bg-info rounded">
                      <Link className="nav-link " to={"/registrarme"}> Registrarse</Link>
                    </li>
                  </>
                }
                {
                  user &&
                  <li className="nav-item mx-3 " >
                    <button className="btn btn-outline-info" onClick={signOutCurrentUser}>Cerrar sesion</button>
                  </li>
                }


              </ul>
            </div>

          </div>

      </nav>

    </div>
  )
}

export default Header



