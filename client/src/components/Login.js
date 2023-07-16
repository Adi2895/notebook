import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import {useDispatch} from 'react-redux'
// import actionCreators from './state/index'
// import { bindActionCreators } from 'redux';
import "./style/login.css";

const Login = (props) => {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const [eyePass, seteyePass] = useState("fa-solid fa-eye");

  const [visiblepass, setVisiblepass] = useState("password");

  const eyePassfun = () => {
    
    if (eyePass === "fa-solid fa-eye") {
      setVisiblepass("text");
      seteyePass("fas fa-eye-slash");
    } else {
      setVisiblepass("password");
      seteyePass("fa-solid fa-eye");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    if (json.success === false) {
      props.showAlert("Invalid Credentials", "danger");
    } else {
      props.showAlert("You logged Successfully", "success");

      localStorage.setItem("token", json.authToken);
      navigate("/");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom mt-3">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5 mb-4">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                alt="img"
                className="img-fluid"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit}>
                {/* sign in with facebook , twitter, linkedin */}
                {/* <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                        <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                        <button type="button" className="btn btn-primary btn-floating mx-1">
                                            <i className="fab fa-facebook-f"></i>
                                        </button>
    
                                        <button type="button" className="btn btn-primary btn-floating mx-1">
                                            <i className="fab fa-twitter"></i>
                                        </button>
    
                                        <button type="button" className="btn btn-primary btn-floating mx-1">
                                            <i className="fab fa-linkedin-in"></i>
                                        </button>
                                    </div>
    
                                    <div className="divider d-flex align-items-center my-4">
                                        <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                    </div> */}

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="email">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    className="form-control form-control-lg"
                    onChange={onChange}
                    placeholder="Enter a valid email address"
                    required
                  />
                </div>

                <div className="form-outline mb-1">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <small style={{ float: "right" }}>
                    <i onClick={eyePassfun} class={eyePass}></i>
                  </small>
                </div>
                <input
                  type={visiblepass}
                  id="password"
                  name="password"
                  value={credentials.password}
                  className="form-control form-control-lg"
                  onChange={onChange}
                  placeholder="Enter password"
                  required
                />

                <div className="d-flex justify-content-between align-items-center">
                  <div className="mt-2">
                    <Link
                      to="/resetpassword"
                      style={{ color: "red", textDecoration: "none" }}
                      className=""
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have any account?
                    <Link to="/signup" className="link-danger">
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
