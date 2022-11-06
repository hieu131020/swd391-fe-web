import { useState } from "react";
import { Link } from "react-router-dom";
import userApi from "../../api/userApi";
import Header from "../../components/header/Header";
import { UserAuth } from "../../context/AuthContext";
import "./style.css";
function ChangePass() {
  const [newPassword, setNewPassWord] = useState("");
  const [confirmPassWord, setConfirmPassWord] = useState();
  const { user } = UserAuth();
  const mail = user.email;

  const handleChangePass = () => {
    if (newPassword == null) {
      return;
    }
    const payload = {
      newPassword: newPassword,
      confirmPassword: confirmPassWord,
    };
    console.log(payload);
    userApi
      .updatePassWord(mail, payload)
      .then((res) => {
        // if (res.status == 200) {
        alert(res.message);
        // console.log(res);
        setNewPassWord("");
        setConfirmPassWord("");
        // }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.validateMessage) {
          alert(err.response.data.validateMessage.newPassword);
        } else {
          alert(err.response.data.message);
        }
      });
  };
  return (
    <div>
      <Header />
      <div className="profile container rounded bg-white ">
        <div className="row">
          <div className="menu col-3 ">
            <h4 className="menuProfile">
              <Link to={"/profile"}>Profile Settings </Link>
            </h4>
            <h4 className="menuProfile">Change PassWord</h4>
          </div>
          <div
            className="row col-md-9 card-body"
            style={{ borderLeft: "1px solid" }}
          >
            <div
              className="col-md-5 border-right"
              style={{ marginLeft: "150px" }}
            >
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Change PassWord</h4>
                </div>
                <hr />

                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">New Password</label>
                    <input
                      value={newPassword}
                      onChange={(e) => setNewPassWord(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Enter New Password"
                      //   value=""
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Confirm Password</label>
                    <input
                      value={confirmPassWord}
                      onChange={(e) => setConfirmPassWord(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Enter Confirm Password"
                      //   value=""
                    />
                  </div>
                  {/* <div className="col-md-12">
                    <label className="labels">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter address line "
                      //   value=""
                    />
                  </div> */}
                </div>
                <div className="mt-5 text-center">
                  <button
                    onClick={handleChangePass}
                    className="btn btn-primary profile-button"
                    type="button"
                  >
                    SAVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChangePass;
