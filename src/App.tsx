import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import Home from './pages/Home/Home';
import { useEffect } from 'react';
import api from './lib/api';
import { useSetAtom } from 'jotai';
import { constantsAtom } from './modules/constants/constants';

function App() {
  const setConstants = useSetAtom(constantsAtom);

  useEffect(() => {
    api.get('/constants')
      .then(response => setConstants(response.data));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='signup' element={<Signup />}></Route>
          <Route path='signin' element={<Signin />}></Route>
          <Route path='home' element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
