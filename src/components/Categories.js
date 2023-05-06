import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "../context/Context";

const Categories = () => {
  const [rate, setRate] = useState(0);
  const [checking, setChecking] = useState("");
  const {
    state: { categories, limit },
    dispatch,
    productState: { searchQuery },
    productDispatch,
  } = CartState();

  const fetchCategories = async () => {
    try {
      const api = await fetch("https://fakestoreapi.com/products/categories");
      const response = await api.json();
      dispatch({ type: "SET_CATEGORIES", payload: response });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  async function categoryHandler(e) {
    try {
      const api = await fetch(
        `https://fakestoreapi.com/products/category/${e.target.name}`
      );
      const response = await api.json();
      dispatch({ type: "SET_PRODUCTS", data: response });
      checkingHandler(e);
    } catch (error) {
      throw new Error(error);
    }
  }

  const clearHandler = async () => {
    const api = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);
    const response = await api.json();
    dispatch({ type: "SET_PRODUCTS", data: response });
    setChecking(false);
  };

  const checkingHandler = (e) => {
    switch (e.target.name) {
      case e.target.name:
        setChecking(e.target.name);
        break;
      default:
        break;
    }
  };

  return (
    <div className="filters">
      <span className="title">Categories</span>
      {categories.length > 0 &&
        categories.map((category, i) => {
          return (
            <span key={i}>
              <Form.Check
                inline
                label={category.toUpperCase()}
                name={category}
                type="radio"
                id={`inline-${i + 1}`}
                onClick={categoryHandler}
                checked={checking === category}
              />
            </span>
          );
        })}
      <span>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        <Rating
          rating={rate}
          onClick={(i) => setRate(i + 1)}
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button variant="light" onClick={clearHandler}>
        Clear Categories
      </Button>
    </div>
  );
};

export default Categories;
