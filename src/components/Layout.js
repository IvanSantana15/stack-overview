import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <div className="container-fluid py-0 px-0 " style={{ "position": "absolute", "height": "100%" }} >
      <Header />
      <div className=" container-fluid px-0  " style={{ "height": "100%" }}>
        <div className="row" style={{ "height": "100%" }} >
          <div className="col-md-2 bg-light border border-top-0" >
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <Link to={"/"}>
                <span className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Inicio</span>
              </Link>

              <Link to={"/"}>
                <span className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Preguntas</span>
              </Link>

              <Link to={"/preguntas/nueva preguntas"}>
                <span className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Hacer una Pregunta</span>
              </Link>
            </div>
          </div>
          <div className='col-md-10  p-2'>
            {children}
          </div>

        </div>

      </div>
    </div>
  )
}

export default Layout