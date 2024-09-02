import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import PgFOF from './Components/PgFOF';
import './App.css';
import Cart from './Components/Cart';
import Userprofile from './Components/Userprofile';
import CrudDemo from './Components/CrudDemo';
import Addproduct from './Components/Addproduct';
import Allproductpage from './Components/Some-Product-Components/Allproductpage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/cart' element={<Cart/>}/>
        <Route exact path='/userprofile' element={<Userprofile/>}/>
        <Route exact path='/crudemo' element={<CrudDemo/>}/>
        <Route exact path='/sellproduct' element={<Addproduct/>}/>
        <Route exact path='/product-type/mobiles' element={<Allproductpage type={'Mobile'}/>}/>
        <Route exact path='/product-type/laptops' element={<Allproductpage type={'Laptop'}/>}/>
        <Route exact path='/product-type/cameras' element={<Allproductpage type={'Camera'}/>}/>
        <Route exact path='/product-type/shoes' element={<Allproductpage type={'Shoes'}/>}/>

        <Route path='*' element={<PgFOF/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
