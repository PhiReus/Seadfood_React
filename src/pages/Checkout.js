import React from "react";
import LayoutMaster from "../layouts/LayoutMaster";
import BillingAddress from "../components/checkouts/BillingAddress";
import OrderTotal from "../components/checkouts/OrderTotal";
import ShippingAddress from "../components/checkouts/ShippingAddress";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import OrderModel from "../model/OrderModel";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "../redux/action";

const Checkout = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch(); 
  let customer = localStorage.getItem("customer");
  customer = customer ? JSON.parse(customer) : "";
  const initialValues = {
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
    cart: cart
  };
  const handleCheckoutOrder = (values) => {
    values.customer_id = customer.id;
    console.log(values);

    OrderModel.checkout(values)
      .then((res) => {
        localStorage.removeItem("cart");
        dispatch(removeCart());        
        Swal.fire({
          icon: "success",
          title: "Thanh toán thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        console.error(err.response);
        Swal.fire({
          icon: "error",
          title: "Thanh toán thất bại!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
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
                <span className="breadcrumb-item active">Checkout</span>
              </nav>
            </div>
          </div>
        </div>
        {/* Breadcrumb End */}
        {/* Checkout Start */}
        <Formik
          // enableReinitialize={true}
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={handleCheckoutOrder}
        >
          <Form>
            <div className="container-fluid">
              <div className="row px-xl-5">
                <div className="col-lg-8">
                  <h5 className="section-title position-relative text-uppercase mb-3">
                    <span className="bg-secondary pr-3">Billing Address</span>
                  </h5>
                  <BillingAddress/>
                  {/* <div className="collapse mb-5" id="shipping-address">
                    <h5 className="section-title position-relative text-uppercase mb-3">
                      <span className="bg-secondary pr-3">Shipping Address</span>
                    </h5>
                    <ShippingAddress/>
                  </div> */}
                </div>
                <div className="col-lg-4">
                  <h5 className="section-title position-relative text-uppercase mb-3">
                    <span className="bg-secondary pr-3">Order Total</span>
                  </h5>
                    <OrderTotal/> 
                </div>
              </div>
            </div>
          </Form>
        </Formik>
       
        {/* Checkout End */}
    </LayoutMaster>
  );
};
export default Checkout;
