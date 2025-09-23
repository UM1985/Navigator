import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://68c3e48081ff90c8e61a7736.mockapi.io/product";

const AddProduct = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  // Load products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (error) {
      toast.error("⚠️ Failed to load products!");
      console.error(error);
    }
  };

  // Add or Update product
  const onSubmit = async (data) => {
    try {
      if (editId) {
        // Update existing product
        await axios.put(`${API_URL}/${editId}`, data);
        toast.success("✅ Product updated successfully!");
      } else {
        // Add new product
        await axios.post(API_URL, data);
        toast.success("🎉 Product added successfully!");
      }
      fetchProducts(); // refresh list
      reset();
      setEditId(null);
    } catch (error) {
      toast.error("⚠️ Failed to save product!");
      console.error(error);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      toast.error("🗑️ Product deleted!");
    } catch (error) {
      toast.error("⚠️ Failed to delete!");
      console.error(error);
    }
  };

  // Edit product (load values into form)
  const editProduct = (product) => {
    setEditId(product.id);
    setValue("name", product.name);
    setValue("price", product.price);
    setValue("category", product.category);
    setValue("image", product.image);
  };

  return (
    <div className="container my-5 d-flex flex-column align-items-center">
      <div className="card shadow-lg p-4 col-md-6 col-lg-5">
        <h3 className="text-center mb-4 text-primary">
          🛒 {editId ? "Update Product" : "Add Product to Cart"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="p_name" className="form-label fw-semibold">
              Product Name
            </label>
            <input
              type="text"
              id="p_name"
              className="form-control"
              placeholder="Enter product name"
              {...register("name", { required: true })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="p_price" className="form-label fw-semibold">
              Product Price (₹)
            </label>
            <input
              type="number"
              className="form-control"
              id="p_price"
              placeholder="Enter price"
              {...register("price", { required: true })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label fw-semibold">
              Category
            </label>
            <select
              className="form-select"
              id="category"
              defaultValue=""
              {...register("category", { required: true })}
            >
              <option value="" disabled hidden>
                Select category
              </option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Grocery">Grocery</option>
              <option value="Accessories">Accessories</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="discount" className="form-label fw-semibold">
              Discount
            </label>
            <select
              className="form-select"
              id="discount"
              defaultValue=""
              {...register("discount", { required: true })}
            >
              <option value="" disabled hidden>
                Select Discount
              </option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="25">25</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="p_url" className="form-label fw-semibold">
              Image URL
            </label>
            <input
              type="url"
              className="form-control"
              id="p_url"
              placeholder="Paste image URL here"
              {...register("image", { required: true })}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              {editId ? "✏️ Update Product" : "➕ Add Product"}
            </button>
          </div>
        </form>
      </div>

      {/* Show products */}
      <div className="row mt-4 w-100">
  {products.map((product) => (
    <div key={product.id} className="col-md-3 mb-3">
      <div className="card h-100 shadow-sm">
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
          style={{ height: "200px", objectFit: "contain" }}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>

          {/* Price with discount */}
          {product.discount ? (
            <p className="card-text">
              <span className="text-muted text-decoration-line-through me-2">
                ₹{product.price}
              </span>
              <span className="fw-bold text-success">
                ₹{product.price - (product.price * product.discount) / 100}

              </span>
            </p>
          ) : (
            <p className="card-text fw-bold">₹{product.price}</p>
          )}

          <p className="badge bg-info">{product.category}</p>

          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-warning btn-sm"
              onClick={() => editProduct(product)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteProduct(product.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default AddProduct;
