import './App.css';
import {BrowserRouter, Router, Route, Routes} from 'react-router-dom'
import Nav from './components/Nav';
import Footer from './components/footer';
import Register from './components/Register';
import PrivateComponent from './components/Privatecomponent';
import Login from './components/Login';
import Addproduct from './components/AddProducts';
import ProductList from './components/ProductList';
import Updateproduct from './components/Update';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>

        <Route element={<PrivateComponent />}>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<Addproduct />} />
        <Route path="/update/:id" element={<Updateproduct />} />
        <Route path="/logout" element={<h1>Logout Component</h1>} />
        <Route path="/profile" element={<h1>Profile Component</h1>} />
    
        </Route>

        <Route path='/signup' element={<Register />}/>
        <Route path='/login' element={<Login />} />
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
