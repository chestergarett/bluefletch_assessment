
//dependencies
import { useContext } from 'react';
//context
import UserProvider from './context/user-provider';
import UserContext from './context/user-context';
//css
import './App.css';
//components
import Calculator from './components/Calculator/Calculator'

function App() {
  return (
    <UserProvider>
      <Home/>
      {/* <Calculator/> */}
    </UserProvider>
  );
}

export default App;
