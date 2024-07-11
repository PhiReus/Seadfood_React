import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";

const OrderTotal = () => {
  const cart = useSelector((state) => state.cart);
  const [cartTotal, setCartTotal] = useState(0);
  console.log(cart);
  useEffect(() => {
    let total = 0;
    cart.forEach((cartItem) => {
      total += cartItem.product.price * cartItem.quantity;
    })
    setCartTotal(total);
  }, []);
  return (
    <>
      <div className="bg-light p-30 mb-5">
        <div className="border-bottom">
          <h6 className="mb-3">Products</h6>
          {cart.map((cartItem, idx) => (
            <div className="d-flex justify-content-between" key={idx}>
              <p>{cartItem.product.name}</p>
              <p>
              <NumericFormat
                value={cartItem.product.price}
                allowLeadingZeros
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
              />{" "}VND
              </p>
            </div>
          ))}
        </div>
        <div className="border-bottom pt-3 pb-2">
          <div className="d-flex justify-content-between mb-3">
            <h6>Subtotal</h6>
            <h6>$150</h6>
          </div>
          <div className="d-flex justify-content-between">
            <h6 className="font-weight-medium">Shipping</h6>
            <h6 className="font-weight-medium">$10</h6>
          </div>
        </div>
        <div className="pt-2">
          <div className="d-flex justify-content-between mt-2">
            <h5>Total</h5>
            <h5>
            <NumericFormat
                value={cartTotal}
                allowLeadingZeros
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
            />{" "}VND
            </h5>
          </div>
        </div>
        <button type="submit" className="btn btn-block btn-primary font-weight-bold py-3">
            Place Order
        </button> 
      </div>
    </>
  );
};
export default OrderTotal;
