import React, { useEffect, useState } from "react";
import LayoutMaster from "../layouts/LayoutMaster";
import ProductModel from "../model/ProductModel";
import { useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import DOMPurify from "dompurify";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, SET_CART } from "../redux/action";
import Swal from "sweetalert2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Detail = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    pauseOnHover: true
  };
  
  const image = "http://127.0.0.1:8000/";
  const arrCart = useSelector((state) => state.cart);
  const { slug } = useParams();
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [pAlsoLike, setPAlsoLike] = useState([]);
  useEffect(() => {
    ProductModel.find(slug)
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        throw err;
      });
  }, [slug]);
  const description = DOMPurify.sanitize(product.description);
  const id = product.id;
  const addToCart = () => {
    const productCart = arrCart.find((item) => item.product_id === product.id);
        if(productCart) {
          productCart.quantity += count;
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
            quantity: count,
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

  useEffect(() => {
    ProductModel.productAlsoLike()
      .then((data) => {
        setPAlsoLike(data);
        console.log(data);
      })
      .catch((err) => {
        throw err;
      })
  }, [slug])

  return (
    <LayoutMaster>
      {/* Shop Detail Start */}
      <div className="container-fluid pb-5">
        <div className="row px-xl-5">
          <div className="col-lg-5 mb-30">
            <div
              id="product-carousel"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner bg-light">
                <div className="carousel-item active">
                  <img
                    className="w-100 h-100"
                    src={image + product.image}
                    alt="Image"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="w-100 h-100"
                    src={image + product.image}
                    alt="Image"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="w-100 h-100"
                    src={image + product.image}
                    alt="Image"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="w-100 h-100"
                    src={image + product.image}
                    alt="Image"
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#product-carousel"
                data-slide="prev"
              >
                <i className="fa fa-2x fa-angle-left text-dark" />
              </a>
              <a
                className="carousel-control-next"
                href="#product-carousel"
                data-slide="next"
              >
                <i className="fa fa-2x fa-angle-right text-dark" />
              </a>
            </div>
          </div>
          <div className="col-lg-7 h-auto mb-30">
            <div className="h-100 bg-light p-30">
              <h3>{product.name}</h3>
              <div className="d-flex mb-3">
                <div className="text-primary mr-2">
                  <small className="fas fa-star" />
                  <small className="fas fa-star" />
                  <small className="fas fa-star" />
                  <small className="fas fa-star-half-alt" />
                  <small className="far fa-star" />
                </div>
                <small className="pt-1">(99 Reviews)</small>
              </div>
              <h3 className="font-weight-semi-bold mb-2"> 
                <NumericFormat
                    value={product.price}
                    allowLeadingZeros
                    thousandSeparator="."
                    decimalSeparator=","
                    displayType="text"
                />{" "}
                VND</h3>
              <h4>Description</h4>
              <p className="mb-4" dangerouslySetInnerHTML={{ __html: description }}></p>
              <div className="d-flex mb-3">
                <strong className="text-dark mr-3">Sizes:</strong>
                <form>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="size-1"
                      name="size"
                    />
                    <label className="custom-control-label" htmlFor="size-1">
                      XS
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="size-2"
                      name="size"
                    />
                    <label className="custom-control-label" htmlFor="size-2">
                      S
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="size-3"
                      name="size"
                    />
                    <label className="custom-control-label" htmlFor="size-3">
                      M
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="size-4"
                      name="size"
                    />
                    <label className="custom-control-label" htmlFor="size-4">
                      L
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="size-5"
                      name="size"
                    />
                    <label className="custom-control-label" htmlFor="size-5">
                      XL
                    </label>
                  </div>
                </form>
              </div>

              <div className="d-flex align-items-center mb-4 pt-2">
                <div
                  className="input-group quantity mr-3"
                  style={{ width: 130 }}
                >
                  <div className="input-group-btn">
                    <button onClick={() => {
                        if(count > 1) {
                            setCount(count - 1)
                        }
                    }} className="btn btn-primary btn-minus">
                      <i className="fa fa-minus" />
                    </button>
                  </div>
                  <input
                    type="text"
                    min={1}
                    className="form-control bg-secondary border-0 text-center"
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value))}
                  />
                  <div onClick={() => setCount(count + 1)} className="input-group-btn">
                    <button className="btn btn-primary btn-plus">
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
                <button onClick={addToCart} className="btn btn-primary px-3">
                  <i className="fa fa-shopping-cart mr-1" /> Add To Cart
                </button>
              </div>
              <div className="d-flex pt-2">
                <strong className="text-dark mr-2">Share on:</strong>
                <div className="d-inline-flex">
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-linkedin-in" />
                  </a>
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-pinterest" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      {/* Shop Detail End */}
      {/* Products Start */}
      <div className="container-fluid py-5">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">You May Also Like</span>
        </h2>
        <div className="row px-xl-5">
          <div className="col">
              <div className="related-carousel">
                 <Slider {...settings}>
                    <div className="product-item bg-light">
                    <div className="product-img position-relative overflow-hidden">
                      <img className="img-fluid w-100" src="https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g" alt="" />
                      <div className="product-action">
                        <a className="btn btn-outline-dark btn-square" href="">
                          <i className="fa fa-shopping-cart" />
                        </a>
                        <a className="btn btn-outline-dark btn-square" href="">
                          <i className="far fa-heart" />
                        </a>
                        <a className="btn btn-outline-dark btn-square" href="">
                          <i className="fa fa-sync-alt" />
                        </a>
                        <a className="btn btn-outline-dark btn-square" href="">
                          <i className="fa fa-search" />
                        </a>
                      </div>
                    </div>
                    <div className="text-center py-4">
                      <a className="h6 text-decoration-none text-truncate" href="">
                        Product Name Goes Here
                      </a>
                      <div className="d-flex align-items-center justify-content-center mt-2">
                        <h5>$123.00</h5>
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
                </Slider>
              </div>
          </div>
        </div>
      </div>
      {/* Products End */}

    </LayoutMaster>
  );
}
export default Detail;
