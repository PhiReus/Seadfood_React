import React from "react";
import { useNavigate } from "react-router-dom";
import CustomerModel from "../model/CustomerModel";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email!"),
  password: Yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Vui lòng nhập mật khẩu!"),
});

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    CustomerModel.login(values.email, values.password)
      .then((res) => {
        localStorage.setItem("token", res.authorization.token);
        localStorage.setItem("customer", JSON.stringify(res.customer));
        navigate("/");
        Swal.fire({
          icon: "success",
          title: "Đăng nhập thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Email hoặc mật khẩu không đúng!",
          text: err.message,
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-10 col-lg-12 col-md-9">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-6 d-none d-lg-block bg-login-image" />
              <div className="col-lg-6">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>
                  <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form className="user">
                        <div className="form-group">
                          <Field
                            type="email"
                            name="email"
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                          />
                          <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                          <Field
                            type="password"
                            name="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Password"
                          />
                          <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <Field
                              type="checkbox"
                              name="rememberMe"
                              className="custom-control-input"
                              id="customCheck"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-user btn-block"
                          disabled={isSubmitting}
                        >
                          Login
                        </button>
                        <hr />
                        <a
                          href="index.html"
                          className="btn btn-google btn-user btn-block"
                        >
                          <i className="fab fa-google fa-fw" /> Login with Google
                        </a>
                        <a
                          href="index.html"
                          className="btn btn-facebook btn-user btn-block"
                        >
                          <i className="fab fa-facebook-f fa-fw" /> Login with Facebook
                        </a>
                      </Form>
                    )}
                  </Formik>
                  <hr />
                  <div className="text-center">
                    <a className="small" href="forgot-password.html">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="text-center">
                    <a className="small" href="register.html">
                      Create an Account!
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
