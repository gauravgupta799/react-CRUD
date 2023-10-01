import Footer from './layout/Footer';
import Navbar from './layout/Navbar';
import Home from './pages/home';
import Products from './pages/products';

import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <main className="main">
      <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={ <Home/>}/>
            <Route path="/products" element={  <Products/>}/>
          </Routes>
          <Footer/>
      </BrowserRouter>
    </main>
  );
}

export default App;
