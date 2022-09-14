import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StoreProvider from "../store/StoreProvider";
import About from "./About";
import AskQuestion from "./AskQuestion";
import FilteredQuestion from "./FilteredQuestion";
import Layout from "./Layout";
import Login from "./Login";
import MainContent from "./MainContent";
import Question from "./Question";
import Register from "./Register";

function App() {
  return (
    <div className="App w-100 " >

      <Router>
       
          <StoreProvider>
            <Layout>
              <Routes>
                <Route path="/iniciar-sesion" element={<Login />} />
                <Route path="/registrarme" element={<Register />} />
                <Route path="/nueva-pregunta" element={<AskQuestion />} />
                <Route path="/sobre-este-sitio" element={<About/>} />
                <Route path="/preguntas/:docId" element={<Question />} />
                <Route path="/filtered-question/:search" element={<FilteredQuestion/>} />
                <Route path="/" element={<MainContent />} />
              </Routes>
            </Layout>
          </StoreProvider>
       
      </Router>

    </div>
  );
}

export default App;
