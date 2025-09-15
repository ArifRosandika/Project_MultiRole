import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dasboard from "./pages/Dashboard.jsx";
import Login from "./component/Login.jsx";
import User from "./pages/User.jsx";
import Product from "./pages/Product.jsx";
import AddUser from "./pages/AddUser.jsx";
import Edituser from "./pages/EditUser.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import EditProduct from "./pages/EditProduct.jsx";

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dasboard />} />
          <Route path="/users" element={<User />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<Edituser />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;