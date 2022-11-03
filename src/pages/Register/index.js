import { Link } from "react-router-dom";
import { useState } from "react";
import registerApi from "../../api/registerApi";
import "./style.css";
function Register() {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState();

  const handleRegister = () => {
    if (!fullName || !email || !password || !phone || !address) {
      alert("Please fill all the fields");
    } else {
      const payload = {
        email: email,
        password: password,
        fullName: fullName,
        phone: phone,
        address: address,
        image: image,
      };
      // console.log(payload);
      registerApi.register(payload).then((response) => {
        if (response === 400) console.log("loi ");
        else {
          alert("Register successfully");
        }
      });
    }
  };

  return (
    <div className="register">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div className="myform form ">
            <div className="logo mb-3">
              <div className="col-md-12 text-center">
                <h1>Signup</h1>
              </div>
            </div>
            {/* <form action="#" name="registration"> */}
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                name="fullname"
                className="form-control"
                id="fullname"
                aria-describedby="emailHelp"
                placeholder="Enter FullName"
                value={fullName}
                onChange={(e) => setfullName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="text"
                name="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="Enter Phone"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                className="form-control"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="col-md-12 text-center mb-3">
              <button
                type="submit"
                className=" btn btn-block mybtn btn-primary tx-tfm"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
            <div className="col-md-12 ">
              <div className="form-group">
                <p className="text-center">
                  <Link to="/login">
                    {/* <a href="#" id="signin"> */}
                    Already have an account?
                    {/* </a> */}
                  </Link>
                </p>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
