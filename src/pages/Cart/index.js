import { useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/header/Header";
import cartApi from "../../api/cartApi";
import { UserAuth } from "../../context/AuthContext";
function Cart() {
  const { user } = UserAuth();
  const [products, setProducts] = useState([]);
  const [idProduct, setIdProduct] = useState();
  const [productQuantity, setProductQuantity] = useState();
  const total = products.reduce(
    (result, product) =>
      result + product.productResponse.price * product.quantity,
    0
  );
  const idUser = user.id;
  const loadCart = () => {
    cartApi
      .getCart(idUser)
      .then((res) => {
        console.log(res);
        setProducts(res);
      })
      .catch((error) => {
        // alert("Sản Phẩm Không Tồn Tại");
        console.log("fail apiLoadProduct", error);
      });
  };
  const handleUpdateCart = (id) => {
    const payload = {
      idAccount: idUser,
      idProduct: idProduct,
    };
    console.log(payload);
    cartApi
      .updateCart(id, payload)
      .then((response) => {
        loadCart();
      })
      .catch((error) => console.log("fail update cart product", error));
  };
  const handleDeleteCart = () => {
    cartApi
      .deleteCart(idUser)
      .then((res) => {
        alert("Mua Hàng Thành Công");
        loadCart();
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    loadCart();
  }, []);
  return (
    <div>
      <Header />
      <section class="shopping-cart dark">
        <div class="container">
          <div class="content">
            <div class="row">
              <div class="col-md-12 col-lg-8">
                <div class="items">
                  {products.map((product) => (
                    <div
                      class="product"
                      onClick={() => setIdProduct(product.productResponse.id)}
                    >
                      <div class="row">
                        <div class="col-md-3">
                          <img
                            style={{ height: "100px", width: "100px" }}
                            class="img-fluid mx-auto d-block image"
                            src={product.productResponse.image}
                          />
                        </div>
                        <div class="col-md-8">
                          <div class="info">
                            <div class="row">
                              <div class="col-md-5 product-name">
                                <div class="product-name">
                                  <h5>{product.productResponse.name}</h5>
                                  <div class="product-info">
                                    <div>
                                      Màu:{" "}
                                      <span class="value">
                                        {product.productResponse.color}
                                      </span>
                                    </div>
                                    <div>
                                      Size:{" "}
                                      <span class="value">
                                        {product.productResponse.size}
                                      </span>
                                    </div>
                                    {/* <div>
                                    Memory: <span class="value">32GB</span>
                                  </div> */}
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-4 quantity">
                                <label for="quantity">Quantity: </label>
                                <input
                                  id="quantity"
                                  type="number"
                                  //   value={productQuantity}
                                  value={product.quantity}
                                  class="form-control quantity-input"
                                  onChange={(e) =>
                                    setProductQuantity(e.target.value)
                                  }
                                />
                              </div>
                              <div class="col-md-3 price">
                                <span>
                                  $
                                  {product.productResponse.price *
                                    product.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div class="col-md-12 col-lg-4">
                <div class="summary">
                  <h3>Summary</h3>
                  <div class="summary-item">
                    <span class="text">Subtotal</span>
                    <span class="price">${total}</span>
                  </div>
                  <div class="summary-item">
                    <span class="text">Discount</span>
                    <span class="price">$0</span>
                  </div>
                  <div class="summary-item">
                    <span class="text">Shipping</span>
                    <span class="price">$0</span>
                  </div>
                  <div class="summary-item">
                    <span class="text">Total</span>
                    <span class="price">${total}</span>
                  </div>
                  <button
                    type="button"
                    class="btn btn-primary btn-lg btn-block"
                    onClick={handleDeleteCart}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Cart;
