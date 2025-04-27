import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./Components/ProductList";
import ProductDetail from "./Components/ProductDetail"; 

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Product Catalog</h1>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
