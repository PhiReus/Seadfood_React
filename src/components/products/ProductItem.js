import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_TO_CART, SET_CART } from "../../redux/action";
import Swal from "sweetalert2";

function ProductItem({product}) {
    const image = "http://127.0.0.1:8000/";
    const arrCart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const homeAddTocart = () => {
        const productCart = arrCart.find((item) => item.product_id === product.id);
        if(productCart) {
          productCart.quantity++;
          const updateCart = [...arrCart];
          localStorage.setItem("cart", JSON.stringify(updateCart));
          dispatch({type: SET_CART, payload: updateCart});
          Swal.fire({
              icon: "success",
              title: "Thêm sản phẩm thành công!",
              showConfirmButton: false,
              timer: 1500,
          });
        }else{
          let item = {
            product_id: product.id,
            quantity: 1,
            product: product,
          };
          const updateCart = [...arrCart, item];
          localStorage.setItem("cart", JSON.stringify(updateCart));
          dispatch({type: SET_CART, payload: updateCart});
          Swal.fire({
              icon: "success",
              title: "Thêm sản phẩm thành công!",
              showConfirmButton: false,
              timer: 1500,
          });
        }
    }

  return (
    <>
        <div className="product-item bg-light mb-4">
          <div className="product-img position-relative overflow-hidden">
            <img className="img-fluid w-100" src={image + product.image} alt="" />
            <div className="product-action">
              <button onClick={homeAddTocart} className="btn btn-outline-dark btn-square" href="">
                <i className="fa fa-shopping-cart" />
              </button>
              {/* <a className="btn btn-outline-dark btn-square" href="">
                <i className="far fa-heart" />
              </a>
              <a className="btn btn-outline-dark btn-square" href="">
                <i className="fa fa-sync-alt" />
              </a> */}
              {/* <Link to={"/detail/" + product.id + "/" + product.slug} className="btn btn-outline-dark btn-square" href="">
                <i className="fa fa-search" />
              </Link> */}
              <Link to={`/detail/${product.slug}`} className="btn btn-outline-dark btn-square" href="">
                <i className="fa fa-search" />
              </Link>
            </div>
          </div>
          <div className="text-center py-4">
            <a className="h6 text-decoration-none text-truncate" href="">
              {product.name}
            </a>
            <div className="d-flex align-items-center justify-content-center mt-2">
              <h5>
                <NumericFormat
                    value={product.price}
                    allowLeadingZeros
                    thousandSeparator="."
                    decimalSeparator=","
                    displayType="text"
                />{" "}
                VND
                </h5>
              <h6 className="text-muted ml-2">
                <del>$123.00</del>
              </h6>
            </div>
            <div className="d-flex align-items-center justify-content-center mb-1">
              <small className="fa fa-star text-primary mr-1" />
              <small className="fa fa-star text-primary mr-1" />
              <small className="fa fa-star text-primary mr-1" />
              <small className="fa fa-star text-primary mr-1" />
              <small className="fa fa-star text-primary mr-1" />
              <small>(99)</small>
            </div>
          </div>
        </div>
    </>
  );
}

export default ProductItem;
