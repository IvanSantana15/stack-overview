
import { Link, useMatch } from 'react-router-dom'
import Header from './Header'

const Layout = ({ children }) => {
  const isLoginUrl = useMatch("/iniciar-sesion")
  const isRegisterUrl = useMatch("/registrarme")
  const match = () => {
    if (isLoginUrl || isRegisterUrl) return true
    return false
  }

  return (
    <div className="container-fluid py-0 px-0 " style={{ "position": "absolute", "height": "100%" }} >
      <Header />
      <div className=" mt-5 container-fluid px-0  ">
        <div className="row ">
          {
            match() ? ""
              :
              <div className=" col-md-2 d-none d-md-block d-lg-block d-xl-block border border-top-0 border-bottom-0 min-vh-100" >
                <div className="mt-3 nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <Link className="text-decoration-none nav-link text-secondary" to={"/"}>
                    <span className="">Inicio</span>
                  </Link>

                  <Link className="text-decoration-none nav-link text-secondary" to={"/nueva-pregunta"}>
                    <span className="">Hacer una Pregunta</span>
                  </Link>

                  <Link className="text-decoration-none nav-link text-secondary" to={"/sobre-este-sitio"}>
                    <span className="">Sobre este sitio</span>
                  </Link>
                </div>
              </div>
          }

          <div className={match() ? "col-md-12" : "col-md-10"}  >

            {children}

          </div>

        </div>

      </div>



      <div className='container-fluid '>
        <footer className=" row bg-dark text-center text-white mt-4 ">

          <div className="container p-4 pb-0">

            <section className="my-5 text-center ">
            <div className=" d-flex justify-content-center mt-3 nav  nav-pills " >
            
            <Link className="text-decoration-none nav-link text-white" to={"/"}>
              <span className="">Inicio</span>
            </Link>

            <Link className="text-decoration-none nav-link text-white" to={"/nueva-pregunta"}>
              <span className="">Hacer una Pregunta</span>
            </Link>

            <Link className="text-decoration-none nav-link text-white" to={"/sobre-este-sitio"}>
              <span className="">Sobre este sitio</span>
            </Link>
          </div>

            </section>

          </div>
          <div className="text-center p-3" style={{ "backgroundColor": "rgba(0, 0, 0, 0.2)" }}>
            © 2022 Copyright:

          </div>

        </footer>
      </div>

    </div>
  )
}

export default Layout