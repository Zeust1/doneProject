import "./Signinpage.css";
import latteimg from "../../../public/lateinbox.jpg";

import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { find } from "lodash";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import Signuppage from "../signuppage/Signuppage";
import Onloading from "../../components/modalonloading/Onloading";

import userapi from "../../api/userapi";

const Signinpage = ({ setUserLogin }) => {
  const childRef = useRef();
  const navigate = useNavigate();
  // Hàm để gọi hàm trong component con
  const onLoading = () => {
    childRef.current.onOpen();
  };

  const onClose = () => {
    childRef.current.onClose();
  };

  const goHome = () => {
    navigate("/"); 
  };

  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });

  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setStatus("signin-ok")
    setFormValue({ ...formValue, [name]: value });
  };

  const [status,setStatus] = useState("signin-ok")

  const onSignIn = async (e) => {
    e.preventDefault();
    onLoading();
    const data = await userapi();
    console.log(data)
      if (find(data, formValue)){
        onClose();
        goHome();
        data.forEach((user) => {
          if(user.username === formValue.username && user.password === formValue.password){
            setUserLogin(user);
          }
        })
        return;
      }else{
        onClose();
        setStatus("signin-err")
        return;
      }
  };

  return (
      <div className="signinpage">
        <form className="form" onSubmit={onSignIn}>
          <h1>Sign In</h1>
          <div className="blockinp">
            <input
              type="text"
              name="username"
              value={formValue.username}
              autoComplete="new-password"
              onChange={onChangeForm}
              placeholder="Username"
              required
            />
            <i className="fa-solid fa-user fa-xl"></i>
          </div>
          <div className="blockinp">
            <input
              type="password"
              name="password"
              value={formValue.password}
              autoComplete="new-password"
              onChange={onChangeForm}
              placeholder="Password"
              required
            />
            <i className="fa-solid fa-lock fa-xl"></i>
          </div>
          <div className="signup-in">
            <div>
              <Link to="/signup-page">Don't have account</Link>
            </div>
            <div className="btnform">
              <button type="submit">Sign in</button>
            </div>
          </div>
          <div className="social">
            <p>or</p>
            <div className="social-icon">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/facebook-new.png"
                alt="facebook-new"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/instagram-new--v1.png"
                alt="instagram-new--v1"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/twitter--v1.png"
                alt="twitter--v1"
              />
            </div>
          </div>
          <div className={status}>
            <Stack sx={{ width: "90%" }} spacing={2}>
              <Alert variant="filled" severity="error">
                username or password is wrong
              </Alert>
            </Stack>
          </div>
        </form>
        <div className="image">
          <img src={latteimg} alt="img" />
        </div>
        <Onloading ref={childRef} />
      </div>
  );
};

export default Signinpage;
