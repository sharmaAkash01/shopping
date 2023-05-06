import React from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "../context/Context";

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const addHandler = () => {
    dispatch({ type: "ADD_TO_CART", payload: prod });
  };

  const removeHandler = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: prod });
  };

  return (
    <div className="products">
      <Card >
        <Card.Img variant="top" src={prod.image} alt={prod.title} className="card__img"/>
        <Card.Body>
          <Card.Title>{prod.title}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>Rs {prod.price.toString().split(".")[0]}</span>
            <Rating rating={prod.rating.rate} />
          </Card.Subtitle>
          {cart.some((p) => p.id === prod.id) ? (
            <Button onClick={removeHandler} variant="danger">
              Remove from Cart
            </Button>
          ) : (
            <Button onClick={addHandler}>Add to Cart</Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
