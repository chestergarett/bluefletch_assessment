
//dependencies
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//context
import UserContext from './context/user-context';
//css
import './App.css';
//components
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Landing from './components/Landing/Landing';
import Calculator from './components/Calculator/Calculator';

function App() {
  const { isAuthenthenticated } = useContext(UserContext);

  return (
      <Router>
        <Routes>
          {isAuthenthenticated ? 
            <>
            <Route path='/' exact element={<Landing/>}/>
            <Route path='/Landing' element={<Landing/>}/>
            <Route path='/Calculator' element={<Calculator/>}/>
            <Route path="*" element={<Landing/>}/>
            </> :
            <>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/Signup' exact element={<Signup/>}/>
            <Route path="*" element={<Home/>}/>
            </>
          }
        </Routes>
      </Router>
  );
}

export default App;
