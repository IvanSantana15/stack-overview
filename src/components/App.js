import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import StoreProvider from "../store/StoreProvider";
import AskQuestion from "./AskQuestion";
import FilteredQuestion from "./FilteredQuestion";
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
          <StoreProvider>
            <Layout>
              <Routes>
                <Route path="/iniciar" element={<Login />} />
                <Route path="/registrarme" element={<Register />} />
                <Route path="/nueva-pregunta" element={<AskQuestion />} />
                <Route path="/preguntas/:docId" element={<Question />} />
                <Route path="/filtered-question/:search" element={<FilteredQuestion/>} />
                <Route path="/" element={<MainContent />} />

              </Routes>
            </Layout>
          </StoreProvider>
        </AuthProvider>
      </Router>

    </div>
  );
}

export default App;
