import "./App.css";
import { useState, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";


import Logo from "../public/logo.png";
import Usericon from "../public/circle-user.svg";
import Carticon from "../public/shopping-cart-add.svg";
import Locationicon from "../public/location.png";


import Shopaddress from "./components/shopaddress/Shopaddress";
import Homepage from "./page/homepage/Homepage";
import Signinpage from "./page/signinpage/Signinpage";
import Profile from "./page/profile/Profile";
import Signuppage from "./page/signuppage/Signuppage";
import Onloading from "../src/components/modalonloading/Onloading";


import Menu from "./page/Menu/menu"
import CartModal from "./components/CartModal/CartModal.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CheckoutModal from"../src/components/CheckoutModal/CheckoutModal.jsx";


import Shoplocation from "../src/api/shoplocation.json";
import api from "./api/userapi.js";



function App() {

  const childRef = useRef();

  const [userLogin, setUserLogin] = useState("");
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]); 
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const [isDetailOpen, setIsDetailOpen] = useState(false); 
  const [selectedProduct, setSelectedProduct] = useState(null); 



  let pTag1 = null;
  let pTag2 = null;

  if (location === "/") {
    pTag1 = (
      <p
        onClick={() => {
          window.scrollTo({ top: 10, behavior: "smooth" });
        }}
      >
        Cà phê
      </p>
    );
    pTag2 = (
      <p
        onClick={() => {
          window.scrollTo({ top: 500, behavior: "smooth" });
        }}
      >
        Về chúng tối
      </p>
    );
  } else {
    pTag1 = <p>Cà phê</p>;
    pTag2 = <p>Về chúng tôi</p>;
  }


  const onLoading = () => {
    childRef.current.onOpen();
  };

  const onClose = () => {
    childRef.current.onClose();
  };

  const signout = async () => {
    onLoading();
    setUserLogin("");
    const data = await api();
    navigate("/")
    onClose()
  };




  // tâm..................................................
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.selectedOption === product.selectedOption
      );
  
      if (existingItemIndex !== -1) {
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1, options: [product.selectedOption] }];
      }
    });
  };

  const toggleCartModal = () => {
    setIsCartOpen(!isCartOpen); 
  };

  const handleShowDetail = (product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedProduct(null);
  };
// tâm................................................



  return (
    <div className="container">
      <div className="header">
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img
            src={Logo}
            alt="this logo"
            style={{ width: "50px", height: "50px" }}
          />
          <h1>Coffe shop</h1>
        </div>
        <div className="navigation">
          <Link to="/">Trang chủ</Link>
          {location === "/" && pTag1}
          <Link to="/menu-page">Thực đơn</Link>
          {location === "/" && pTag2}
          {
            userLogin &&           
            <div className="infoUser">
              <Link to="/profile">Welcome, {userLogin.username}</Link>
              <i className="fa-solid fa-certificate fa-2xl"><p>{`${userLogin.level * 10}`}%</p></i>
            </div>
          }
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span>
            <img src={Locationicon} alt="locationicon" />
            <Link to="/location-store" element={<Shopaddress />}>
              Tìm cửa hàng
            </Link>
          </span>
          <div className="cart-icon" style={{ width: "30px", height: "30px" }}>
            <img
              src={Carticon}
              alt="user icon"
              onClick={toggleCartModal}
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
            />
            <p
              style={{
                border: "1px solid",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "20px",
                height: "20px",
                fontWeight: "bold",
                fontSize: "10px",
              }}
            >
              {cartItems.length}
            </p>
          </div>
          <div className="iconuer" style={{ width: "30px", height: "30px" }}>
            <img
              src={Usericon}
              alt="user icon"
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
              className="icon"
            />
            <div
              className="showMenu"
              style={{
                width: "120px",
                height: "fit-content",
                backdropFilter: "blur(20px)",
              }}
            >
              <dl>
                <dt>
                  {userLogin && <Link to="/profile">Cá nhân</Link>} 
                </dt>
                {!userLogin && (
                  <dt>
                    <button className="signout">
                      <Link to="/signin-page">Đăng nhập</Link>
                    </button>
                  </dt>
                )}
                {userLogin && (
                  <dt>
                    <button onClick={signout} className="signout">
                      Đăng xuất
                    </button>
                  </dt>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile" element={<Profile info={userLogin}/>} />
        <Route
          path="/location-store"
          element={<Shopaddress Shoplocation={Shoplocation} />}
        />
        <Route
          path="/signin-page"
          element={<Signinpage setUserLogin={setUserLogin} />}
        />
        <Route path="/signup-page" element={<Signuppage/>}/>
        <Route path="/checkout" element={<CheckoutModal />} />
        <Route
          path="/menu-page"
          element={
            <Menu
              onShowDetail={handleShowDetail}
              onAddToCart={handleAddToCart}
              Level={userLogin ? userLogin.level : null}
            />
          }
        />
      </Routes>
      <CartModal
        open={isCartOpen}
        onClose={toggleCartModal}
        cartItems={cartItems}
        setCartItems={setCartItems}
        Level={userLogin ? userLogin.level : null}
        User={userLogin ? userLogin.username : "Khách lẻ"}
      />
      <div className="Footer">
        <Footer />
      </div>
      <Onloading ref={childRef} />
    </div>
  );
}

export default App;
