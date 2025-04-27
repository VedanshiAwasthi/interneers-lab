import { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import "../styles.css";
import { getPaginatedProducts } from "services/productService";
import { getErrorMessage } from "utils/errorHandler";
import "../styles/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getPaginatedProducts(currentPage)
      .then((data) => {
        setProducts(data);
        setTotalPages(data.length || 1);
      })
      .catch((err) => setError(getErrorMessage(err)));
  }, [currentPage]);

  const handleCardClick = (productId: string) => {
    window.open(`/product/${productId}`, "_blank");
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <div className="product-list">
        {products.map((product: any) => (
          <ProductItem
            key={product.id}
            product={product}
            onClick={() => handleCardClick(product.id)}
          />
        ))}
      </div>

      <div className="pagination-buttons">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
