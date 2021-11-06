
//dependencies
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';

//context
import UserProvider from './context/user-provider';
import UserContext from './context/user-context';
//css
import './App.css';
//components
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Landing from './components/Landing/Landing';
import Calculator from './components/Calculator/Calculator';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/Signup' exact element={<Signup/>}/>
          <Route path='/Landing' element={<Landing/>}/>
          <Route path='/Calculator' element={<Calculator/>}/>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
