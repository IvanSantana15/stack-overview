import {BrowserRouter as Router, Route,Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import AskQuestion from "./AskQuestion";
import Header from "./Header";
import Layout from "./Layout";
import Login from "./Login";
import MainContent from "./MainContent";
import Question from "./Question";
import Register from "./Register";

function App() {
  return (
    <div className="App w-100 " >
     
     <Router>
        <AuthProvider> 
       <Layout>
          <Routes>
            <Route path="/iniciar" element={<Login />} />
            <Route path="/registrarme" element={<Register/>} />
            <Route path="/nueva-pregunta" element={<AskQuestion/>} />
            <Route path="/preguntas/:id" element={<Question/>} />
            <Route path="/"  element={<MainContent/>} />
            
          </Routes>
          </Layout>
         </AuthProvider> 
      </Router>

    </div>
  );
}

export default App;
