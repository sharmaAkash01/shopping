import React, { useEffect } from "react";
import { CartState } from "../context/Context";
import SingleProduct from "./SingleProduct";
import Categories from "./Categories";
import "./styles.css";

const Home = () => {
  const {
    state: { products, limit },
    dispatch,
    productState: { searchQuery }
  } = CartState();

  const fetchProducts = async () => {
    const api = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);
    const response = await api.json();
    dispatch({ type: "SET_PRODUCTS", data: response });
  };

  const infiniteScrollHandler = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      dispatch({ type: "SET_NEW_PRODUCTS" });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [limit]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScrollHandler);
    return () => {
      window.removeEventListener("scroll", infiniteScrollHandler);
    };
  }, []);

  function transformProducts() {
    let sortedProducts = products
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) => {
        return prod?.title?.toLowerCase().includes(searchQuery);
      });
    }
    return sortedProducts;
  }

  return (
    <div className="home">
      <Categories />
      <div className="productContainer">
        {transformProducts().map((prod) => {
          return <SingleProduct prod={prod} key={prod.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
