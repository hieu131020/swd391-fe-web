import { Fragment, Suspense } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/header/Header";
import CreateCategory from "./pages/CreateCategory";
import CreateProduct from "./pages/CreateProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ChangePass from "./pages/ChangePass";

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/rigister" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/detail" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/passWordChange" element={<ChangePass />} />
        </Routes>
      </Suspense>
      {/* <CreateCategory /> */}
    </Fragment>
    // <CreateProduct />
  );
}

export default App;
