import React, { useState } from "react";
import Alert from '@mui/material/Alert';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import CheckoutModal from "../CheckoutModal/CheckoutModal";
import post from "../../api/post";


const CartModal = ({ open, onClose, cartItems, setCartItems ,Level, User}) => {

  const [pay,setPay] =useState("false")
  const percent = Level/10
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const totalPrice = cartItems.reduce(
    (total, item) => (Level = null ? total + item.price * item.quantity : total + (item.price - ( item.price * percent)) * item.quantity),
    0
  );

  const handleRemove = (index , cartItems) => {
   pay !== "true" ? 
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index))
    : setCartItems([])
  };

  const handleQuantityChange = (index, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setSelectedProduct(cartItems); // Truyền danh sách sản phẩm khi thanh toán
      setIsCheckoutOpen(true);
    }
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };
  const notify = async () => {
   cartItems.forEach((element) => {
     post ({
      username: User,
      img : element.img,
      productname: element.name,
      price: Level === null ? element.price : element.price - (element.price * percent),
      quantity: element.quantity,
      bought : element.quantity * (Level === null ? element.price : element.price - (element.price * percent))
    })
   });
  toast("Thanh toán thành công")
  onClose()
  setCartItems([])
};


  const handlePaid = () => {
    if(totalPrice > 0) {
      setPay("true")
      notify()
    }else{
      return
    }

  }

  return (
    <>
      <Modal open={open} onClose={()=> {onClose();setPay("false")}}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Giỏ hàng
          </Typography>

          <List sx={{ maxHeight: "300px", overflowY: "auto", mt: 2 }}>
            {cartItems.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderBottom: "1px solid #ddd",
                  pb: 1,
                  mb: 2,
                }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ width: "80px", height: "80px", borderRadius: "8px" }}
                />

                <Box sx={{ flex: 1 }}>
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <>
                        <Typography variant="body2">
                          {Level === null ? 
                          `Đơn giá: ${item.price} VNĐ `
                          : `Đơn giá: ${item.price - (item.price * percent)} VNĐ `
                          }
                        </Typography>
                      </>
                    }
                  />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    onClick={() => handleQuantityChange(index, -1)}
                    disabled={item.quantity <= 1}
                    size="small"
                  >
                    <Remove />
                  </IconButton>
                  <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                  <IconButton
                    onClick={() => handleQuantityChange(index, 1)}
                    size="small"
                  >
                    <Add />
                  </IconButton>
                </Box>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemove(index)}
                  size="small"
                  sx={{ ml: 2 }}
                >
                  Xóa
                </Button>
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" sx={{ textAlign: "right", mt: 2 }}>
            Tổng cộng: {totalPrice.toLocaleString()} VNĐ
          </Typography>

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="secondary" onClick={()=> {onClose();setPay("false")}}>
              Đóng
            </Button>
            <Button variant="contained" color="primary" onClick={handlePaid}>
              Thanh toán
            </Button>
          </Box>
        </Box>
      </Modal>
      <ToastContainer/>
    </>
  );
};

export default CartModal;