import React, { useEffect, useState } from "react";
import LayoutMaster from "../layouts/LayoutMaster";
import { useDispatch, useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import { decreaseQuantity, increasingQuantity, removeCartItem } from "../redux/action";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const image = "http://127.0.0.1:8000/";
  const [cartTotal, setCartToltal] = useState(0);
  const dispatch = useDispatch();  
  const navigate = useNavigate();
  
  useEffect(() => {
    let total = 0;
    cart.forEach((cartItem) => {
        total += cartItem.product.price * cartItem.quantity;
    })
    setCartToltal(total);
  }, [cart]);

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  }
  const handleIncreasingQuantity = (productId) => {
    dispatch(increasingQuantity(productId));
  }
  const handleRemoveCartItem = (productId) => {
    dispatch(removeCartItem(productId));
    Swal.fire({
      icon: "success",
      title: "Xóa sản phẩm thành công!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const handleProceedWithPayment = () => {
    let customer = localStorage.getItem("customer");
    customer = customer ? JSON.parse(customer) : "";

    if(!customer) {
      Swal.fire({
        icon: "warning",
        title: "Bạn cần đăng nhập để có thể thanh toán !",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    }else if(cart.length == 0) {
      Swal.fire({
        icon: "warning",
        title: "Không có sản phẩm để thanh toán !",
        showConfirmButton: false,
        timer: 1500,
      });
    }else {
      navigate("/checkout")
    }
  }
  
  
  return (
    <LayoutMaster>
      {/* Breadcrumb Start */}
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <a className="breadcrumb-item text-dark" href="#">
                Home
              </a>
              <a className="breadcrumb-item text-dark" href="#">
                Shop
              </a>
              <span className="breadcrumb-item active">Shopping Cart</span>
            </nav>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}
      {/* Cart Start */}
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
            <table className="table table-light table-borderless table-hover text-center mb-0">
              <thead className="thead-dark">
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {cart.map((cartItem, index) => (
                  <tr key={index}>
                    <td className="align-middle">
                      <img
                        src={image + cartItem.image}
                        alt=""
                        style={{ width: 50 }}
                      />{" "}
                      {cartItem.product.name}
                    </td>
                    <td className="align-middle">
                        <NumericFormat
                            value={cartItem.product.price}
                            allowLeadingZeros
                            thousandSeparator="."
                            decimalSeparator=","
                            displayType="text"
                        />{" "}
                VND</td>
                    <td className="align-middle">
                      <div
                        className="input-group quantity mx-auto"
                        style={{ width: 100 }}
                      >
                        <div className="input-group-btn">
                          <button onClick={() => handleDecreaseQuantity(cartItem.product_id)} className="btn btn-sm btn-primary btn-minus">
                            <i className="fa fa-minus" />
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-sm bg-secondary border-0 text-center"
                          value={cartItem.quantity}
                          min={1}
                          readOnly
                        />
                        <div className="input-group-btn">
                          <button onClick={() => handleIncreasingQuantity(cartItem.product_id)} className="btn btn-sm btn-primary btn-plus">
                            <i className="fa fa-plus" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                        <NumericFormat
                            value={cartItem.product.price * cartItem.quantity}
                            allowLeadingZeros
                            thousandSeparator="."
                            decimalSeparator=","
                            displayType="text"
                        />{" "}VND
                    </td>
                    <td className="align-middle">
                      <button onClick={() => handleRemoveCartItem(cartItem.product_id)} className="btn btn-sm btn-danger">
                        <i className="fa fa-times" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-lg-4">
            <form className="mb-30" action="">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-0 p-4"
                  placeholder="Coupon Code"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary">Apply Coupon</button>
                </div>
              </div>
            </form>
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Cart Summary</span>
            </h5>
            <div className="bg-light p-30 mb-5">
              <div className="border-bottom pb-2">
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
                    />{" "}
                    VND
                  </h5>
                </div>
                <button onClick={handleProceedWithPayment} type="button" className="btn btn-block btn-primary font-weight-bold my-3 py-3">
                  Tiến hành thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cart End */}
    </LayoutMaster>
  );
};
export default Cart;
