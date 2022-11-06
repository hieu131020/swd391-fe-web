import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import "./style.css";
import userApi from "../../api/userApi";
import { UserAuth } from "../../context/AuthContext";
function Profile() {
  const imageDefault =
    "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";
  const [imageUpload, setImageUpLoad] = useState(imageDefault);
  // const [user, setUser] = useState([]);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const { user } = UserAuth();
  const mail = user.email;
  const loadUser = () => {
    userApi
      .getUser(mail)
      .then((res) => {
        // setUser(res.object);
        setImageUrl(res.object.image);
        setName(res.object.fullName);
        setPhone(res.object.phone);
        setAddress(res.object.address);
      })
      .catch((error) => {
        // alert("Sản Phẩm Không Tồn Tại");
        console.log("fail apiUserload", error);
      });
  };

  useEffect(() => {
    loadUser();
    uploadImage();
  }, [imageUpload]);
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    // file.preview = URL.createObjectURL(file);
    // console.log(file);
    setImageUpLoad(file);
  };
  const uploadImage = () => {
    if (imageUpload == null || imageUpload === imageDefault) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
      });
      // alert("Image uploaded successfully");
    });
  };
  const handleUpdateProfile = () => {
    const payload = {
      fullName: name,
      phone: phone,
      address: address,
      image: imageUrl,
    };
    console.log(payload);
    userApi
      .updateUser(mail, payload)
      .then((response) => {
        loadUser();
        // setImageUrl("");
        alert("Profile uploaded successfully");
      })
      .catch((error) => console.log("fail update profile", error));
  };
  return (
    <div>
      <Header />
      <div className="profile container rounded bg-white ">
        <div className="row">
          <div className="menu col-3 " style={{ borderRight: "1px solid" }}>
            <h4 className="menuProfile">Profile Settings</h4>
            <h4 className="menuProfile">
              <Link to={"/profile/passWordChange"}>Change PassWord </Link>
            </h4>
          </div>
          <div className="row col-md-9 card-body">
            <div
              className="col-md-5 border-right"
              style={{ marginLeft: "150px" }}
            >
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile Settings</h4>
                </div>
                <hr />

                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Full Name</label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      type="text"
                      className="form-control"
                      placeholder="enter full name"
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Phone Number</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="number"
                      className="form-control"
                      // placeholder="enter phone number"
                      //   value=""
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Address</label>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="enter address line "
                      //   value=""
                    />
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button
                    onClick={handleUpdateProfile}
                    className="btn btn-primary profile-button"
                    type="button"
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4" style={{ marginLeft: "50px" }}>
              <div className="d-flex flex-column align-items-center text-center p-5 py-1">
                {(
                  <img
                    width="150px"
                    src={imageUrl}
                    alt=""
                    style={{
                      marginTop: "50px",
                      // marginLeft: "50px",
                      width: "200px",
                      height: "200px",
                      // marginLeft: "50px",
                      marginBottom: "35px",
                    }}
                  />
                ) || (
                  <img
                    src={imageUpload}
                    alt=""
                    style={{
                      width: "200px",
                      height: "200px",
                      // marginLeft: "20px",
                      marginBottom: "15px",
                    }}
                  />
                )}

                {/* <img
                  width="150px"
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                /> */}
                <input type="file" onChange={handlePreviewAvatar} />
                <span className="font-weight-bold">{name}</span>
                <span className="text-black-50">{mail}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
