import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import PgFOF from './Components/PgFOF';
import './App.css';
import Cart from './Components/Cart';
import Profile from './Components/Profile';
import CrudDemo from './Components/CrudDemo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/cart' element={<Cart/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
        <Route exact path='/crudemo' element={<CrudDemo/>}/>
        <Route path='*' element={<PgFOF/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
