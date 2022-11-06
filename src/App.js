import { Fragment, Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import CreateCategory from "./pages/CreateCategory";
import CreateProduct from "./pages/CreateProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ChangePass from "./pages/ChangePass";
import { AuthContextProvider } from "./context/AuthContext";
import Protected from "./components/Protected";
import Cart from "./pages/Cart";

function App() {
  return (
    <AuthContextProvider>
      <Fragment>
        <Suspense fallback={<></>}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/rigister" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/createProduct"
              element={
                <Protected>
                  <CreateProduct />
                </Protected>
              }
            />
            <Route path="/detail" element={<Product />} />
            <Route
              path="/profile"
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
            />
            <Route
              path="/profile/passWordChange"
              element={
                <Protected>
                  <ChangePass />
                </Protected>
              }
            />
            <Route
              path="/cart"
              element={
                <Protected>
                  <Cart />
                </Protected>
              }
            />
          </Routes>
        </Suspense>
      </Fragment>
    </AuthContextProvider>
    // <Cart />
  );
}

export default App;
