import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='signup' element={<Signup />}></Route>
          <Route path='signin' element={<Signin />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
