import "bootstrap/dist/css/bootstrap.min.css";
import AddProduct from "./layout/AddProduct";
import Navbar from "./component/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from "./component/Error";
const App = () => {
  return (
    <>
    
    
     <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/" element={<AddProduct />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="*" element={<Error />} /> 
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App