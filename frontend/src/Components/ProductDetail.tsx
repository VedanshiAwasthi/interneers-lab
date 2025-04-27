import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductById,
  deleteProduct,
  updateProduct,
  addCategory,
} from "../services/productService";
import { getErrorMessage } from "../utils/errorHandler";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!productId) {
      setError("Invalid product ID.");
      return;
    }

    getProductById(productId)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(getErrorMessage(err)));
  }, [productId]);

  const handleDelete = async () => {
    try {
      await deleteProduct(productId!);
      alert("Product deleted");
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleAddCategory = async () => {
    try {
      const categ_id = prompt("Enter Category ID:");
      if (!categ_id || !productId) return;

      await addCategory(productId, categ_id);
      alert("Category added");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const description = (
      form.elements.namedItem("description") as HTMLInputElement
    ).value;
    const brand = (form.elements.namedItem("brand") as HTMLInputElement).value;
    const price = (form.elements.namedItem("price") as HTMLInputElement).value;
    const quantity = (form.elements.namedItem("quantity") as HTMLInputElement)
      .value;

    const updatedData = {
      name: name || product.name,
      description: description || product.description,
      brand: brand || product.brand,
      price: price || product.price,
      quantity: quantity || product.quantity,
    };

    try {
      await updateProduct(productId!, updatedData);
      alert("Product updated successfully!");
      setProduct((prev: any) => ({ ...prev, ...updatedData }));
      setShowForm(false);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <p>Price: ₹{product.price}</p>
      <p>{product.description}</p>

      <button onClick={handleAddCategory}>Add Category</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => setShowForm(true)}>Upload</button>

      {showForm && (
        <div className="form-overlay">
          <form onSubmit={handleUpload} className="upload-form">
            <input type="text" name="name" placeholder={product.name} />
            <input
              type="text"
              name="description"
              placeholder={product.description}
            />
            <input type="text" name="brand" placeholder={product.brand} />
            <input
              type="number"
              name="price"
              placeholder={String(product.price)}
              step="0.01"
            />
            <input
              type="number"
              name="quantity"
              placeholder={String(product.quantity)}
              min="0"
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
