import { Link } from "react-router-dom";
import { useState } from "react";
import loginApi from "../../api/loginApi";
import "./style.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    const payload = {
      email: email,
      password: password,
    };
    loginApi.login(payload).then((response) => {
      console.log(response);
      // if (response.body.status === 200) {
      //   console.log(response);
      // }
    });
  };
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
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Password</label>
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
              {/* <div className="form-group">
                  <p className="text-center">
                    By signing up you accept our <a href="#">Terms Of Use</a>
                  </p>
                </div> */}
              <div className="col-md-12 text-center ">
                <Link to="/">
                  <button
                    type="submit"
                    className=" btn btn-block mybtn btn-primary tx-tfm"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </Link>
              </div>
              <div className="col-md-12 ">
                <div className="login-or">
                  <hr className="hr-or" />
                  <span className="span-or">or</span>
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <p className="text-center">
                  {/* <a href="javascript:void();" className="google btn mybtn"> */}
                  <i className="fa fa-google-plus"></i> Sign up using Google
                  {/* </a> */}
                </p>
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
