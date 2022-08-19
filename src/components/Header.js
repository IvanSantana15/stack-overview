import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { Link, useMatch, useNavigate } from "react-router-dom"
import  { useStore } from "../store/StoreProvider"
import { types } from "../store/storeReducer"

const Header = () => {
  const [store, dispatch] = useStore()
  const { user } = store
  const navigate = useNavigate()

  const isLoginUrl = useMatch("/iniciar-sesion")
  const isRegisterUrl = useMatch("/registrarme")

  const match =()=> {
    if(isLoginUrl || isRegisterUrl)return true
    return false
  }

  const signOutCurrentUser = async () => {

     await signOut(auth)
    navigate(-1)
  }



const handleSumit =(e)=>{
  e.preventDefault()

  if(e.target.search.value === "") return;

  const filteredQuestions = store.questions?.filter(question => {
    return question.Pregunta.toLowerCase().indexOf(e.target.search.value.toLowerCase()) !== -1
  })
  

  dispatch({type: types.setFilteredQuestion, payload: filteredQuestions || []})
  dispatch({type: types.handleMobileMenu, payload: false})
  
  navigate(`/filtered-question/${e.target.search.value}`)
}

  return (
    <div className="container-fluid p-0 w-100 shadow-sm position-fixed">

      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <span className="navbar-brand" href="#">Stack overview</span>

        <button className="navbar-toggler mx-1" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
        onClick={()=> dispatch({type: types.handleMobileMenu, payload: !store.isMobileMenuOpen})}
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        {
           store.isMobileMenuOpen &&
        <div className="fixed-top w-100 bg-white mt-5 mr-1 border shadow-sm ">
          <div className="d-block d-md-none d-lg-none col-md-2  border border-top-0" >

             {/* mobile serch */}

             { 
                <div className="container w-100 bg-secondary py-2 mt-1 " >
                  <form onSubmit={(e)=> handleSumit(e)}>
                <input className="w-75 py-1 ml-0" name="search" type="search" placeholder="Buscar" aria-label="Search"
                />
                <button type="submit" className="mx-1 btn btn-success">Buscar</button>
                </form>
              </div>
              }
            <div className=" nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical"
            onClick={()=> dispatch({type: types.handleMobileMenu, payload: false})}
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
                {
                  !user &&
                  <>
                <Link className="text-decoration-none" to={"/iniciar-sesion"}>
                  <span className="nav-link text-secondary" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Iniciar sesion</span>
                </Link>

                <Link className="text-decoration-none" to={"/registrarme"}>
                  <span className="nav-link text-secondary" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Registrarse</span>
                </Link>
                </>
                }
              <Link className="text-decoration-none" to={"/registrarme"}>
                <span className="nav-link text-secondary" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Sobre este sitio</span>
              </Link>

              {
                user &&
                <li className="nav-item" >
                <span className="nav-link text-secondary" onClick={signOutCurrentUser}>Cerrar sesion</span>
              </li>
              }
            </div>
            </div>
          </div>

            }
               

          <div className=" d-flex justify-content-around collapse navbar-collapse " id="navbarNav">
            <form className="form-inline col-md-5 d-none d-md-block d-lg-block" onSubmit={(e)=> handleSumit(e)}>
              <div className="row">

                <div className="col-10">
                  <div className="form-group  w-100">
                    <input className="form-control mr-sm-2 w-100 " name="search" type="search" placeholder="Buscar" aria-label="Search"
                    />
                  </div>
                </div>
                <div className="col-2">
                  <button className="btn btn-outline-success my-1 my-sm-0 " type="submit" >Buscar</button>
                </div>
              </div>
            </form>

            <div className="d-none d-md-block d-lg-block">


              <ul className="navbar-nav d-flex ">

                {
                  match()?
                  <li className="nav-item  mx-3  rounded">
                  <Link className="nav-link" to={"/"}> Inicio</Link>
                </li>
                :""
                }
                {
                  !user &&
                  <>
                    <li className="nav-item  mx-3 bg-info rounded">
                      <Link className="nav-link" to={"/iniciar-sesion"}> Iniciar sesion</Link>
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



