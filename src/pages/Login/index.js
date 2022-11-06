import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import loginApi from "../../api/loginApi";
import "./style.css";
import GoogleButton from "react-google-button";
import { UserAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { googleSignIn, user, loginByAccount } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    const payload = {
      email: email,
      password: password,
    };
    loginByAccount(payload);
  };
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="login">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div id="first">
            <div className="myform form ">
              <div className="logo mb-3">
                <div className="col-md-12 text-center">
                  <h1>Login</h1>
                </div>
              </div>
              {/* <form action="" method="post" name="login"> */}
              <div className="form-group was-validated">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">
                  Please fill out this field.
                </div>
              </div>
              <div className="form-group was-validated">
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
                  required
                />
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">
                  Please fill out this field.
                </div>
              </div>
              {/* <div className="form-group">
                  <p className="text-center">
                    By signing up you accept our <a href="#">Terms Of Use</a>
                  </p>
                </div> */}
              <div className="col-md-12 text-center ">
                {/* <Link to="/"> */}
                <button
                  type="submit"
                  className=" btn btn-block mybtn btn-primary tx-tfm"
                  onClick={handleLogin}
                >
                  Login
                </button>
                {/* </Link> */}
              </div>
              <div className="col-md-12 ">
                <div className="login-or">
                  <hr className="hr-or" />
                  <span className="span-or">or</span>
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="loginbygg">
                  {/* <a href="javascript:void();" className="google btn mybtn"> */}
                  <GoogleButton onClick={handleGoogleSignIn} />
                  {/* </a> */}
                </div>
              </div>
              <div className="form-group">
                <p className="text-center">
                  Don't have account?
                  <Link to="/rigister">Sign up here</Link>
                </p>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
