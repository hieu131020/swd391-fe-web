import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import {
  AccountCircleIcon,
  BookIocn,
  ClothesIcon,
  HomeIcon,
  PersonIcon,
  PhonelinkIcon,
  PianoIcon,
  SearchIcon,
} from "../../components/icon/index";
import { useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { async } from "@firebase/util";
const categorys = [
  {
    content: "",
    name: "Trang Chủ",
  },
  {
    content: "Electronic Device",
    name: "Electronic Device",
  },
  {
    content: "Musical Instruments",
    name: "Musical Instruments",
  },
  {
    content: "Book",
    name: "Book",
  },
  {
    content: "clothes",
    name: "Clothes",
  },
];
// const search = "";
const Header = ({ onPageChange }) => {
  const navigate = useNavigate();

  const { user, logOut } = UserAuth();
  // const mail = null;
  // const mail1 = "Sign in";
  const handlSignOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  function handlePageChange(datasearch) {
    if (onPageChange) {
      onPageChange(datasearch);
    }
  }
  return (
    <div className="header">
      <div className="top_bar">
        <div className="container">
          <div className="row">
            <div className="col d-flex flex-row">
              <div className="top_bar_contact_item">
                <div className="top_bar_icon">
                  <img
                    src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560918577/phone.png"
                    alt=""
                  />
                </div>
                +099999999
              </div>
              <div className="top_bar_contact_item">
                <div className="top_bar_icon">
                  <img
                    src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560918597/mail.png"
                    alt=""
                  />
                </div>
                <a href="mailto:fastsales@gmail.com">123123@fpt.edu.vn</a>
              </div>
              {/* <div className="top_bar_content ml-auto"> */}
              {/* <div className="top_bar_menu"> */}
              {user?.email ? (
                <ul className="standard_dropdown top_bar_dropdown">
                  <li>
                    <a>
                      <div className="user_icon">
                        <img
                          src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560918647/user.svg"
                          alt=""
                        />
                      </div>
                      {user.email}
                    </a>
                    <ul>
                      <li>
                        <Link to="/profile">Tài khoản của tôi</Link>
                      </li>
                      <li>
                        <a onClick={handlSignOut} href="#">
                          Đăng xuất
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              ) : (
                <ul className="standard_dropdown top_bar_dropdown">
                  <li>
                    <Link to="/login">Sign In </Link>
                  </li>
                </ul>
              )}
              {/* <ul className="standard_dropdown top_bar_dropdown">
                <li>
                  <Link to="/login">
                    <div className="user_icon">
                      <img
                        src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560918647/user.svg"
                        alt=""
                      />
                    </div>
                    {mail || mail1}
                  </Link>
                  <ul>
                    <li>
                      <Link to="/profile">Tài khoản của tôi</Link>
                    </li>
                    <li>
                      <a href="#">Đăng xuất</a>
                    </li>
                  </ul>
                </li>
              </ul> */}
              {/* </div> */}
              {/* <div className=" top_bar_user sm-10 "></div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Header Main --> */}

      <div className="header_main">
        <div className="container">
          <div className="row">
            {/* <!-- Logo --> */}
            <div className="col-lg-2 col-sm-3 col-3 order-1">
              <div className="logo_container">
                <div className="logo">
                  <Link to="/">F-Market</Link>
                </div>
              </div>
            </div>

            {/* <!-- Search --> */}
            <div className="col-lg-6 col-12 order-lg-2 order-3 text-lg-left text-right">
              <div className="header_search">
                <div className="header_search_content">
                  <div className="header_search_form_container">
                    <form action="#" className="header_search_form clearfix">
                      <input
                        type="search"
                        required="required"
                        className="header_search_input"
                        placeholder="Search for products..."
                        onChange={(e) => handlePageChange(e.target.value)}
                      />

                      <button
                        // onClick={setParams()}
                        type="submit"
                        className="header_search_button trans_300"
                        // value="Submit"
                      >
                        <SearchIcon />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Wishlist --> */}
            <div className="col-lg-4 col-9 order-lg-3 order-2 text-lg-left text-right">
              <div className="wishlist_cart d-flex flex-row align-items-center justify-content-end">
                {/* <!-- Cart --> */}
                <div className="cart">
                  <div className="cart_container d-flex flex-row align-items-center justify-content-end">
                    <div className="cart_icon">
                      <img
                        src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560918704/cart.png"
                        alt=""
                      />
                      {/* <div className="cart_count">
                        <span>3</span>
                      </div> */}
                    </div>
                    <div className="cart_content">
                      <div className="cart_text">
                        <Link to="/cart">Cart</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Main Navigation --> */}

      <nav className="main_nav">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="main_nav_content d-flex flex-row">
                {/* <!-- Categories Menu -->

							

							<!-- Main Nav Menu --> */}

                <div className="main_nav_menu">
                  <ul className="standard_dropdown main_nav_dropdown">
                    {categorys.map((category, index) => (
                      <li
                        key={index}
                        onClick={() => handlePageChange(category.content)}
                      >
                        <a href="#">{category.name}</a>
                      </li>
                    ))}
                    <li>
                      <Link to="/createProduct">
                        <PersonIcon />
                        Cửa Hàng Của Tôi
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
