import React, { useState } from "react";

import "./DrinkGird.css";
import DetailModal from "../DetailModal/DetailModal";

const DrinkGrid = ({ drinks, onSelect, onAddToCart, Level }) => {
    const [selectedDrink, setSelectedDrink] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const handleViewDetailsClick = (drink) => {
        setSelectedDrink(drink);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleOrderNow = () => {
        alert(`Bạn đã đặt ngay: ${selectedDrink.name} với tùy chọn: ${selectedOption}`);
        handleCloseModal();
    };

    let renderDrink = null

    if(Level !== null){
        renderDrink =             
            drinks.map((drink) => (
                <div className="drink-card" key={drink.id}>
                    <img src={drink.img} alt={drink.name} className="drink-image" />
                    <h4>{drink.name}</h4>
                    <div className="drink-price" style={{fontSize: "12px", color: "black", textDecoration: "line-through", fontStyle: "italic"}}>{drink.price} VNĐ</div>
                    <div className="drink-price">{(drink.price - (drink.price * (Level * 0.1)))} VNĐ</div>
                    <div className="button-container">
                        <button onClick={() => handleViewDetailsClick(drink)}>
                            Xem Chi tiết
                        </button>
                    </div>
                </div>
            ))
    }else {
        renderDrink =             
        drinks.map((drink) => (
            <div className="drink-card" key={drink.id}>
                <img src={drink.img} alt={drink.name} className="drink-image" />
                <h4>{drink.name}</h4>
                <div className="drink-price">{drink.price} VNĐ</div>
                <div className="button-container">
                    <button onClick={() => handleViewDetailsClick(drink)}>
                        Xem Chi tiết
                    </button>
                </div>
            </div>
        ))
    }



    return (
        <div className="drink-grid">
            {renderDrink}
            <DetailModal
                open={showModal}
                onClose={handleCloseModal}
                product={selectedDrink}
                selectedOption={selectedOption}
                onOptionChange={handleOptionChange}
                onOrderNow={handleOrderNow}
                onAddToCart={onAddToCart}
                Level={Level} 
            />
        </div>
    );
};

export default DrinkGrid;