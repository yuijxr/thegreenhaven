import { configureStore, createSlice } from "@reduxjs/toolkit";

/* -------------------- Sample Data -------------------- */
const initialProducts = [
  // Indoor Plants
  { id: "p1", name: "Monstera Deliciosa", price: 1250, category: "Indoor Plants", thumb: "https://florastore.com/cdn/shop/files/1711701_Atmosphere_04_SQ_MJ.jpg?v=1755163489&width=1080" },
  { id: "p2", name: "ZZ Plant", price: 1800, category: "Indoor Plants", thumb: "https://glasswingshop.com/cdn/shop/products/8D2A2067.jpg?v=1595400475&width=533" },
  { id: "p3", name: "Snake Plant", price: 850, category: "Indoor Plants", thumb: "https://www.thespruce.com/thmb/SsHaPRyZppWJ-ZHmbKhl_vdBWBo=/2048x0/filters:no_upscale():max_bytes(150000):strip_icc()/snake-plant-care-overview-1902772-04-d3990a1d0e1d4202a824e929abb12fc1-349b52d646f04f31962707a703b94298.jpeg" },
  
  // Succulents
  { id: "p5", name: "Echeveria Elegans", price: 350, category: "Succulents", thumb: "https://upload.wikimedia.org/wikipedia/commons/2/27/Rosa_de_alabastro_%28Echeveria_elegans%29%2C_jard%C3%ADn_del_molino%2C_Sierra_de_San_Felipe%2C_Set%C3%BAbal%2C_Portugal%2C_2012-05-11%2C_DD_01.JPG" },
  { id: "p6", name: "Aloe Vera", price: 450, category: "Succulents", thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCl3AtMewWq9J3w6LMiNyVOYgS7fUaaaOQog&s" },
  { id: "p7", name: "Jade Plant", price: 550, category: "Succulents", thumb: "https://m.media-amazon.com/images/I/51Q9RYkL8cL._UF1000,1000_QL80_.jpg" },
  
  // Hanging Plants
  { id: "p9", name: "English Ivy", price: 650, category: "Hanging Plants", thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZS3ctLnVAiHzEj8Xiapmoy4UzwZW_M_2j_Q&s" },
  { id: "p10", name: "String of Pearls", price: 750, category: "Hanging Plants", thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNvEz1yWhWZgzeFFLIPUp7D1M1RGgF706BIJNNiu8232Xqx4KCWEwVbrWJhuDkrFjglSjioWHn_GI9orNBd0eyGMuaFRbX440jlEQQR5c" },
  { id: "p11", name: "Spider Plant", price: 550, category: "Hanging Plants", thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIbVRQb2bPU8DuuccHfezRVt5tKTnmpf2ZJQ&s" },
  
  // Air Plants
  { id: "p13", name: "Tillandsia Ionantha", price: 250, category: "Air Plants", thumb: "https://littleprinceplants.com/wp-content/uploads/2019/02/Tillandsia-ionantha-Rubra-Air-Plant.jpg" },
  { id: "p14", name: "Tillandsia Xerographica", price: 350, category: "Air Plants", thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgntTzhudJzdmlVEV2XYZQHUyWh83hbXutKg&s" },
  { id: "p15", name: "Tillandsia Bulbosa", price: 300, category: "Air Plants", thumb: "https://rareandair.co.za/wp-content/uploads/2021/04/bulbosa-in-flower.jpg" },
];

/* -------------------- Redux slices -------------------- */
const productsSlice = createSlice({
  name: "products",
  initialState: initialProducts,
  reducers: {},
});

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: {} },
  reducers: {
    addToCart(state, action) {
      const p = action.payload;
      if (state.items[p.id]) return;
      state.items[p.id] = { ...p, qty: 1 };
    },
    increase(state, action) {
      const id = action.payload;
      if (state.items[id]) state.items[id].qty += 1;
    },
    decrease(state, action) {
      const id = action.payload;
      if (!state.items[id]) return;
      state.items[id].qty -= 1;
      if (state.items[id].qty <= 0) delete state.items[id];
    },
    remove(state, action) {
      const id = action.payload;
      delete state.items[id];
    },
    clearCart(state) {
      state.items = {};
    },
  },
});

export const { addToCart, increase, decrease, remove, clearCart } =
  cartSlice.actions;

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
