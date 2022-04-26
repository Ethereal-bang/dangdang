import React from 'react';
import './App.css';
import {HomePage, LoginPage} from "./pages";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<HomePage />} />
                <Route path={"/login"} element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
