import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increase, decrease, remove } from "./store";
import "./App.css";

/* -------------------- Icons -------------------- */
const Icons = {
  Cart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Leaf: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 22L12 2L22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 2C12 2 8 12 8 16C8 20 12 22 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 2C12 2 16 12 16 16C16 20 12 22 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Minus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Trash: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

/* -------------------- Helper selectors -------------------- */
const useCartTotalCount = () => {
  const items = useSelector((s) => s.cart.items);
  return Object.values(items).reduce((acc, it) => acc + it.qty, 0);
};

const useCartTotalPrice = () => {
  const items = useSelector((s) => s.cart.items);
  return Object.values(items).reduce((acc, it) => acc + it.qty * it.price, 0);
};

/* -------------------- Components -------------------- */
function Header() {
  const totalCount = useCartTotalCount();
  return (
    <header className="header">
      <div className="flex-left">
        <Link to="/products" className="logo">
          <span className="logo-icon"><Icons.Leaf /></span>
          The Green Haven
        </Link>
        <nav className="nav">
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </div>
      <div>
        <Link to="/cart" className="cart-link">
          <Icons.Cart /> <span>{totalCount}</span>
        </Link>
      </div>
    </header>
  );
}

/* -------- Landing page -------- */
function Landing() {
  const navigate = useNavigate();
  return (
    <div
      className="landing"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80)",
      }}
    >
      <div className="landing-overlay">
        <h1 className="landing-title">GreenHome</h1>
        <p className="landing-text">
          At GreenHome, we handpick low-maintenance and statement houseplants to bring life
          into your home. Our expert team ensures each plant is healthy and ready to thrive
          in your space. A better green space starts here with our carefully selected collection.
        </p>
        <button onClick={() => navigate("/products")} className="btn">
          Get Started
        </button>
      </div>
    </div>
  );
}

/* -------- Product cards -------- */
function ProductCard({ product }) {
  const dispatch = useDispatch();
  const inCart = useSelector((s) => !!s.cart.items[product.id]);

  const handleAdd = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-card">
      <div className="product-badge">{product.category}</div>
      <div className="img-container">
        <img src={product.thumb} alt={product.name} className="product-img" />
      </div>
      <h3 className="product-name">{product.name}</h3>
      <div className="product-bottom">
        <div className="price">₱{product.price.toLocaleString()}</div>
        <button
          onClick={handleAdd}
          disabled={inCart}
          className={inCart ? "btn-disabled" : "btn"}
        >
          {inCart ? (
            <>
              <Icons.Check /> Added
            </>
          ) : (
            <>
              <Icons.Plus /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* -------- Product listing page -------- */
function ProductList() {
  const products = useSelector((s) => s.products);
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="container">
      <h2 className="section-title">Shop Houseplants</h2>
      {categories.map((cat) => (
        <section key={cat} className="category">
          <h3 className="category-title">{cat}</h3>
          <div className="grid">
            {products
              .filter((p) => p.category === cat)
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/* -------- Cart page -------- */
function CartPage() {
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();
  const totalCount = useCartTotalCount();
  const totalPrice = useCartTotalPrice();
  const itemList = Object.values(items);

  return (
    <div className="container">
      <h2 className="section-title">
        <span className="title-icon"><Icons.Cart /></span>
        Your Cart
      </h2>
      
      <div className="cart-summary">
        <div className="summary-item">Total items: <span className="highlight">{totalCount}</span></div>
        <div className="summary-item">Total cost: <span className="highlight">₱{totalPrice.toLocaleString()}</span></div>
      </div>

      {itemList.length === 0 ? (
        <div className="empty-cart-message">
          <div className="empty-cart-icon">
            <Icons.Cart />
          </div>
          <p>Your cart is empty.</p>
          <Link to="/products" className="btn">
            <Icons.ArrowRight /> Shop now
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items-container">
            {itemList.map((it) => (
              <div key={it.id} className="cart-item">
                <div className="cart-img-container">
                  <img src={it.thumb} alt={it.name} className="cart-img" />
                </div>
                <div className="cart-info">
                  <div className="item-name">{it.name}</div>
                  <div className="item-price">₱{it.price.toLocaleString()}</div>
                  <div className="qty-controls">
                    <button 
                      onClick={() => dispatch(decrease(it.id))} 
                      className="qty-btn"
                      aria-label="Decrease quantity"
                    >
                      <Icons.Minus />
                    </button>
                    <span className="qty-display">{it.qty}</span>
                    <button 
                      onClick={() => dispatch(increase(it.id))} 
                      className="qty-btn"
                      aria-label="Increase quantity"
                    >
                      <Icons.Plus />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(remove(it.id))}
                  className="btn-delete"
                  aria-label="Delete item"
                >
                  <Icons.Trash /> Delete
                </button>
              </div>
            ))}
          </div>
          <div className="cart-actions">
            <button className="btn checkout-btn">
              <Icons.Check /> Checkout (Coming Soon)
            </button>
            <Link to="/products" className="btn continue-btn">
              <Icons.ArrowRight /> Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

/* -------- Main App -------- */
export default function App() {
  return (
    <Router basename="/thegreenhaven">
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}
