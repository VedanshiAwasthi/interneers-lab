import React from "react";
import "../styles/ProductItem.css";

interface ProductItemProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
  };
  onClick: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onClick }) => {
  return (
    <div className="product-card" onClick={onClick}>
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <p className="product-description">{product.description}</p>
    </div>
  );
};

export default ProductItem;
