import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Loginpage from './pages/loginpage';
import { useSelector, UseSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import Logout from './pages/logout';

function App() {

  const user = useSelector(selectUser);


  return (
    <div className="App">
      {user ? <Logout/> : <Loginpage/>}
    </div>
  );

} 

export default App;
