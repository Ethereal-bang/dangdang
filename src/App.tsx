import React from 'react';
import './App.css';
import {GoodsPage, HomePage, LoginPage} from "./pages";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ShoppingCartPage} from "./pages/ShoppingCartPage";

function App() {
    return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<HomePage />} />
                <Route path={"/login"} element={<LoginPage />} />
                <Route path={"/goods/:id"} element={<GoodsPage />} />
                <Route path={"/shoppingCart"} element={<ShoppingCartPage />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
