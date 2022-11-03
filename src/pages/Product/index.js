import productApi from "../../api/productApi";
import { useEffect, useState } from "react";

import Header from "../../components/header/Header";
import "./style.css";
function Product() {
  const [product, setProduct] = useState({});
  const idP = JSON.parse(localStorage.getItem("idDetail"));
  console.log(idP);
  const loadProduct = () => {
    productApi
      .getProductById(idP)
      .then((res) => {
        setProduct(res.object);
        console.log(product);
        // localStorage.removeItem("idDetail");
      })
      .catch((error) => {
        // alert("Sản Phẩm Không Tồn Tại");
        console.log("fail apiLoadProduct", error);
      });
  };
  useEffect(() => {
    loadProduct();
  }, []);
  return (
    <div className="product">
      <Header />
      <div className="card">
        <div className="container-fliud">
          <div className="wrapper row">
            <div className="preview col-md-6">
              <div className="preview-pic tab-content">
                <div className="tab-pane active" id="pic-1">
                  <img
                    src={product.image}
                    style={{ height: "500px", width: "500px" }}
                  />
                </div>
              </div>
            </div>
            <div className="details col-md-6">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.deception}</p>
              <h4 className="price">
                current price: <span>${product.price}</span>
              </h4>
              <h5 className="sizes">
                sizes:
                <span className="size" data-toggle="tooltip" title="small">
                  {product.size}
                </span>
              </h5>
              <h5 className="colors">
                colors:
                <span> {product.color}</span>
              </h5>
              <div className="action">
                <button className="add-to-cart btn btn-default" type="button">
                  add to cart
                </button>
                <button className="like btn btn-default" type="button">
                  by now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Product;
