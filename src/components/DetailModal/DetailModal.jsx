import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import CheckoutModal from "../CheckoutModal/CheckoutModal";

const DetailModal = ({
  open,
  onClose,
  product,
  selectedOption,
  onOptionChange,
  onAddToCart,
  Level
}) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleOrderNow = () => {
    setIsCheckoutOpen(true); 
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false); 
  };

  if (!product) return null;

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "24px",
            }}
          >
            <i className="fas fa-times" />
          </button>

          <Typography
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            {product.name}
          </Typography>

          <img
            src={product.img}
            alt={product.name}
            style={{ width: "100%", height: "300px",margin: "20px 0",objectFit: "cover", borderRadius: "10px" }}
          />

          <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
            {Level === null ? (`Giá: ${product.price} VN`) :  (`Giá: ${(product.price - (product.price * (Level * 0.1)))} VN`) }
          </Typography>

          <RadioGroup
            row
            value={selectedOption}
            onChange={onOptionChange}
            sx={{ justifyContent: "center", mb: 2 }}
          >
            {product.option.map((opt, index) => (
              <FormControlLabel
                key={index}
                value={opt}
                control={<Radio />}
                label={opt || "Mặc định"}
                sx={{ mr: 3 }}
              />
            ))}
          </RadioGroup>

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOrderNow}
            >
              Đặt Ngay
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => onAddToCart(product)}
            >
              Thêm vào Giỏ Hàng
            </Button>
          </Box>
        </Box>
      </Modal>

      <CheckoutModal
        open={isCheckoutOpen}
        onClose={handleCloseCheckout}
        product={product}
      />
    </>
  );
};

export default DetailModal;
