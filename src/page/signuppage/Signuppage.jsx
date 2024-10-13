import "./Signuppage.css";
import { useState } from "react";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";

import gift from "../../../public/newgift.svg"
import gift2 from "../../../public/gift2.svg"

import post from "../../api/post";

const Signuppage = () => {

  const navigate = useNavigate()

  const goBack = () => {
    navigate("/signin-page"); // Điều hướng về Route cha là Dashboard
  };

  const init = {
    name: "",
    id: "",
    phone: "",
    birthday: "",
    email: "",
    level: "",
    username: "",
    password: ""
  }

  const [onSuccess, setOnSuccess] = useState("hide")

  const [formValue, setFormValue] = useState(init);

  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  

  const handleOnSubmit = async (e) => {
    console.log("1")
    e.preventDefault()
    console.log(e.target)
    await post(formValue)
    setOnSuccess("success")
    setFormValue(init)
  }

  const onClose = () => {
  setOnSuccess("hide")
  goBack()
  }

  return (
    <div className="signuppage">
      <div className="banner">
        <div className="shopping-image">
          <img
            src="https://khokhoahoc.org/wp-content/uploads/2022/03/static1.squarespace-300x300-1.png"
            alt="banner"
            style={{height:"100%"}}
          />
        </div>

        <div className="text">
          <h4>
            Hãy đăng ký và nhận vô vàn ưu đãi từ chương trình Membership ngay
            thôi nhé !
          </h4>
        </div>
        <div className="gift">
          <img src={gift2} alt="gift" style={{width: "200px",height: "300px"}}/>
        </div>
      </div>
      <div className={onSuccess} onClick={onClose}>
        <Alert severity="success">
        Your account has been created.</Alert>
      </div>
      <div className="signupForm">
        <form onSubmit={handleOnSubmit} className="form-signup">
          <h2>Sign Up</h2>
          <div className="inp">
            <input type="text" placeholder="Họ tên" name="name" value={formValue.name} required autoComplete="new-password" onChange={onChangeForm}/>
            <input type="date" placeholder="Năm sinh" name="birthday" value={formValue.birthday} required autoComplete="new-password" onChange={onChangeForm}/>
            <input type="number" placeholder="CCCD" name="id" value={formValue.id} required autoComplete="new-password" onChange={onChangeForm}/>
            <input type="email" placeholder="Email" name="email" value={formValue.email} required autoComplete="new-password" onChange={onChangeForm}/>
            <input type="tel" placeholder="Sđt" name="phone" value={formValue.phone} required autoComplete="new-password" onChange={onChangeForm}/>
            <input type="text" placeholder="Level" name="level" value={formValue.level} required autoComplete="new-password" onChange={onChangeForm}/>
            <input type="text" placeholder="Username" name="username" value={formValue.username} required autoComplete="new-password" onChange={onChangeForm}/>
            <input type="password" placeholder="Password" name="password" value={formValue.password} required autoComplete="new-password" onChange={onChangeForm}/>
          </div>
            <button className="btnsignup" type="submit">Sign up</button>
        </form>
        
        <img src={gift} alt="gift" />
      </div>
    </div>
  );
};

export default Signuppage;
