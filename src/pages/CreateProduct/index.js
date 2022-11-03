import { useEffect, useState } from "react";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import productApi from "../../api/productApi";
import "./style.css";
import Pagination from "../../components/Pagination";
import categoryApi from "../../api/categoryApi";
import Header from "../../components/header/Header";
function CreateProduct() {
  const imageDefault =
    "https://firebasestorage.googleapis.com/v0/b/uploadingfile-175d8.appspot.com/o/images%2Fdefault-placeholder.png?alt=media&token=d2bc7810-18f8-4189-8942-bbe46c57ec2a";
  const [imageUpload, setImageUpLoad] = useState(imageDefault);
  const [imageUrl, setImageUrl] = useState("");
  const [products, setProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [productName, setProductName] = useState();
  const [productColor, setProductColor] = useState();
  const [productQuantity, setProductQuantity] = useState();
  const [productCategory, setProductCategory] = useState();
  const [productDescription, setProductDescription] = useState();
  const [productSize, setProductSize] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productId, setProductId] = useState();
  const [params, setParams] = useState({
    content: "",
    pageNo: 0,
    pageSize: 100,
  });

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
  const loadCategory = () => {
    categoryApi
      .getAllCategory()
      .then((res) => setCategorys(res))
      .catch((error) => console.log("fail categoryApi", error));
  };
  useEffect(() => {
    loadProducts();
    loadCategory();
    uploadImage();
  }, [imageUpload]);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = products.slice(firstPostIndex, lastPostIndex);
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    file.preview = URL.createObjectURL(file);
    // console.log(file);
    setImageUpLoad(file);
  };
  const uploadImage = () => {
    if (imageUpload == null || imageUpload == imageDefault) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
      });
      // alert("Image uploaded successfully");
    });
  };
  const handleReset = () => {
    setProductName("");
    setProductColor("");
    setProductQuantity("");
    setProductCategory("");
    setProductDescription("");
    setProductSize("");
    setProductPrice("");
    setImageUrl("");
    setImageUpLoad("");
  };
  const handleAddProduct = () => {
    // uploadImage();
    const payload = {
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      size: productSize,
      deception: productDescription,
      color: productColor,
      image: imageUrl,
      idSystemCategory: productCategory,
    };
    console.log(payload);
    productApi
      .createProduct(1, payload)
      .then((response) => {
        loadProducts();
        handleReset();
        // setImageUrl("");
        alert("product uploaded successfully");
      })
      .catch((error) => console.log("fail add product", error));
  };
  const handleUpdateProduct = () => {
    // uploadImage();
    const payload = {
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      size: productSize,
      deception: productDescription,
      color: productColor,
      image: imageUrl,
      idSystemCategory: productCategory,
    };
    console.log(payload);
    productApi
      .updateProduct(productId, payload)
      .then((response) => {
        loadProducts();
        handleReset();
        // setImageUrl("");
        alert("product uploaded successfully");
      })
      .catch((error) => console.log("fail add product", error));
  };
  const handleDelete = () => {
    productApi
      .deleteProduct(productId)
      .then((res) => {
        loadProducts();
      })
      .catch((error) => console.log("fail delete  product", error));
  };
  return (
    <div>
      <Header />
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <div className="container  h-100" style={{ paddingTop: "15px" }}>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-5">
                      <h5 className="mb-3">
                        {/* <a href="#!" className="text-body"> */}
                        <i className="fas fa-long-arrow-alt-left me-2"></i>Cửa
                        Hàng Của Tôi
                        {/* </a> */}
                      </h5>
                      <hr />
                      {currentPosts.map((product) => (
                        <div
                          className="card mb-3"
                          key={product.id}
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setProductId(product.id);
                            setProductName(product.name);
                            setProductColor(product.color);
                            setProductQuantity(product.quantity);
                            setProductCategory(product.systemCategoryId);
                            setProductDescription(product.deception);
                            setProductSize(product.size);
                            setProductPrice(product.price);
                            setImageUrl(product.image);
                          }}
                        >
                          <div className="card-body">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row align-items-center">
                                <div>
                                  <img
                                    src={product.image}
                                    className="img-fluid rounded-3"
                                    alt="Shopping item"
                                    style={{ width: "65px" }}
                                  />
                                </div>
                                <div className="ms-3">
                                  <h5>{product.name}</h5>
                                  <p className="small mb-0">
                                    {product.size}, {product.color}
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center">
                                <div style={{ width: "50px" }}>
                                  <h5 className="fw-normal mb-0">
                                    {product.quantity}
                                  </h5>
                                </div>
                                <div style={{ width: "80px" }}>
                                  <h5 className="mb-0">${product.price}</h5>
                                </div>
                                <a href="#!" style={{ color: "#cecece" }}>
                                  <i className="fas fa-trash-alt"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <hr />
                      <Pagination
                        totalPosts={products.length}
                        postsPerPage={postsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                      />
                    </div>

                    <div className="col-lg-7">
                      <div className="card   rounded-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="mb-4">
                              Tên Sản Phẩm:
                              <input
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                type="text"
                                style={{
                                  marginLeft: "15px",
                                  marginBottom: "25px",
                                }}
                              />
                              <br />
                              Màu Sắc:
                              <input
                                value={productColor}
                                onChange={(e) =>
                                  setProductColor(e.target.value)
                                }
                                type="text"
                                style={{
                                  marginLeft: "15px",
                                  marginBottom: "25px",
                                }}
                              />{" "}
                              <br />
                              Số Lượng:
                              <input
                                onChange={(e) =>
                                  setProductQuantity(e.target.value)
                                }
                                value={productQuantity}
                                type="number"
                                style={{ marginLeft: "15px" }}
                              />
                            </div>

                            <div>
                              {(imageUrl && (
                                <img
                                  src={imageUrl}
                                  alt=""
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    marginLeft: "50px",
                                    marginBottom: "35px",
                                  }}
                                />
                              )) || (
                                <img
                                  src={imageUpload.preview}
                                  alt=""
                                  style={{
                                    width: "100px",
                                    height: "150px",
                                    marginLeft: "50px",
                                    marginBottom: "15px",
                                  }}
                                />
                              )}
                              <input
                                type="file"
                                onChange={handlePreviewAvatar}
                              />
                              {/* <button onClick={uploadImage}>Upload Image</button> */}
                            </div>
                          </div>

                          <form className="mt-4">
                            <div className="form-outline form-white mb-4">
                              <label className="form-label">Thể Loại:</label>

                              <select
                                value={productCategory}
                                className="form-select"
                                onChange={(e) =>
                                  setProductCategory(e.target.value)
                                }
                              >
                                {categorys.map((category) => (
                                  <option key={category.id} value={category.id}>
                                    {category.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div
                              style={{
                                marginBottom: "25px",
                              }}
                            >
                              <label className="form-label">Mô Tả:</label>
                              <textarea
                                onChange={(e) =>
                                  setProductDescription(e.target.value)
                                }
                                value={productDescription}
                                className="form-control"
                                rows="3"
                              ></textarea>
                            </div>

                            <div className="row mb-4">
                              <div className="col-md-6">
                                <div className="form-outline form-white">
                                  <label className="form-label">Size:</label>
                                  <input
                                    onChange={(e) =>
                                      setProductSize(e.target.value)
                                    }
                                    value={productSize}
                                    type="text"
                                    className="form-control form-control-lg"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-outline form-white">
                                  <label className="form-label">Giá</label>
                                  <input
                                    onChange={(e) =>
                                      setProductPrice(e.target.value)
                                    }
                                    value={productPrice}
                                    type="number"
                                    className="form-control form-control-lg"
                                  />
                                </div>
                              </div>
                            </div>
                          </form>

                          <hr className="my-4" />
                          <button
                            onClick={handleUpdateProduct}
                            type="button"
                            className="btn btn-warning btn-block btn-lg"
                            style={{ marginRight: "50px", marginLeft: "50px" }}
                          >
                            <div className="d-flex justify-content-between">
                              <span>Cập Nhật</span>
                            </div>
                          </button>
                          <button
                            type="button"
                            style={{ marginRight: "50px" }}
                            className="btn btn-success btn-block btn-lg"
                            onClick={handleAddProduct}
                          >
                            <div className="d-flex justify-content-between">
                              <span>Thêm Mới</span>
                            </div>
                          </button>
                          <button
                            onClick={handleDelete}
                            style={{ marginRight: "50px" }}
                            type="button"
                            className="btn btn-danger btn-block btn-lg"
                          >
                            <div className="d-flex justify-content-between">
                              <span>Xoá</span>
                            </div>
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary btn-block btn-lg"
                            onClick={handleReset}
                          >
                            <div className="d-flex justify-content-between">
                              <span>Reset</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default CreateProduct;
