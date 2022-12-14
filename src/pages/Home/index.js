import { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import { AddShoppingCartIcon, ShoppingCartIcon } from "../../components/icon";
import Pagination from "../../components/Pagination";
import "./style.css";
import cartApi from "../../api/cartApi";
function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [params, setParams] = useState({
    content: "",
    pageNo: 0,
    pageSize: 100,
  });
  const iduser = JSON.parse(localStorage.getItem("userId"));
  const handleAppToCart = (id) => {
    cartApi
      .addToCart(iduser, id)
      .then((response) => {
        console.log(response);
        alert("Added Product To Cart successfully");
      })
      .catch((error) => console.log("fail add product to cart", error));
  };
  const handleBuyNow = (id) => {
    cartApi
      .addToCart(iduser, id)
      .then((response) => {
        navigate("/cart");
      })
      .catch((error) => console.log("fail add product to cart", error));
  };
  const loadProducts = () => {
    productApi
      .getAllProduct({ params })
      .then((res) => {
        setProducts(res.list);
      })
      .catch((error) => {
        // alert("Sản Phẩm Không Tồn Tại");
        console.log("fail apiLoadProduct", error);
      });
  };
  useEffect(() => {
    loadProducts();
    setCurrentPage(1);
    // localStorage.removeItem("idDetail");
  }, [params]);
  const handleGetId = (id) => {
    // localStorage.clear();
    localStorage.setItem("idDetail", JSON.stringify(id));
  };
  function handlePageChange(datasearch) {
    setParams({
      ...params,
      content: datasearch,
    });
  }
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = products.slice(firstPostIndex, lastPostIndex);
  return (
    <div className="products">
      <Header
        //  setParams={setDataSearch}
        onPageChange={handlePageChange}
      />
      <div className="container">
        <div className="product-items">
          {currentPosts.map((product) => (
            <div
              className="product"
              key={product.id}
              onClick={() => handleGetId(product.id)}
            >
              <div className="product-content">
                <Link to="/detail">
                  <div
                    className="product-img"
                    // onClick={handleGetId(product.id)}
                  >
                    <img
                      src={product.image}
                      alt=""
                      style={{ width: "200px", height: "200px" }}
                    />
                  </div>
                </Link>
                <div className="product-btns">
                  <button
                    type="button"
                    className="btn-cart"
                    onClick={() => handleAppToCart(product.id)}
                  >
                    add to cart
                    <span>
                      <AddShoppingCartIcon />
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn-buy"
                    onClick={() => handleBuyNow(product.id)}
                  >
                    buy now
                    <span>
                      <ShoppingCartIcon />
                    </span>
                  </button>
                </div>
              </div>
              <Link to="/detail">
                <div
                  className="product-info"
                  //  onClick={handleGetId(product.id)}
                >
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">$ {product.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Pagination
          totalPosts={products.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
export default Home;
