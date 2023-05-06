import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Cart from "./components/Cart";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact Component={Home}></Route>
        <Route path="/cart" Component={Cart}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
