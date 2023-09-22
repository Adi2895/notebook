import React, { useState , useEffect } from "react";
import "./style/signup.css";
// import arrow from "./static/arrow.png"
import { useNavigate, Link } from "react-router-dom";
const baseUrl = process.env.REACT_APP_BASE_URL;


const Signup = (props) => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("token"))
      navigate("/") 
  })

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [err1, seterr1] = useState("");
  const [err2, seterr2] = useState("");
  const [err3, seterr3] = useState("");
  const [notEqual, setnotEqual] = useState("");
  const [eyePass, seteyePass] = useState("fa-solid fa-eye");
  const [eyeConfirm, seteyeConfirm] = useState("fa-solid fa-eye");
  const [visiblepass, setVisiblepass] = useState("password");
  const [visibleconfirm, setVisibleconfirm] = useState("password");
  

  const eyePassfun = () => {
    if (eyePass === "fa-solid fa-eye") {
      setVisiblepass("text");
      seteyePass("fas fa-eye-slash");
    } else {
      setVisiblepass("password");
      seteyePass("fa-solid fa-eye");
    }
  };

  const eyeConfirmfun = () => {
    if (eyeConfirm === "fa-solid fa-eye") {
      setVisibleconfirm("text");
      seteyeConfirm("fas fa-eye-slash");
    } else {
      setVisibleconfirm("password");
      seteyeConfirm("fa-solid fa-eye");
    }
  };

  function isValidEmail(email) {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);// const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
}

  const handleSubmit = async (e) => {
   
    e.preventDefault();


    if (credentials.name === "") {
      setTimeout(()=>{
        seterr1("");
      },2000)
      seterr1("Name Is Required");
    } else seterr1("");

    if (credentials.email === "") {
      setTimeout(()=>{
        seterr2("");
      },2000)
      seterr2("Email Is Required");
    } else {
      seterr2("");
    }
    if (credentials.password === "") {
      setTimeout(()=>{
        seterr3("");
      },2000)
      seterr3("Password Is Required");
    } else {
      seterr3("");
    }





    if(!isValidEmail(credentials.email)){
      setTimeout(()=>{
        seterr2("");
      },2000)
      seterr2("Invalid email")
        return;
    } else if (credentials.password === credentials.confirmPassword) {
      
      const response = await fetch(`${baseUrl}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      
      const json = await response.json();
      
      // alert(response.status)
      if (json.status === 500 || json.status === 400) {
        if (json.status === 500) {
          props.showAlert("Please fill the required details.", "danger");
        } else {
          props.showAlert(json.error, "danger");
        }
      } else {
        props.showAlert(
          `Great! ${credentials.name}, You registered Successfully`,
          "primary"
        );
        navigate("/login");       
      }
    } else {
      setTimeout(() => {
        setnotEqual("");
      }, 2000);
      setnotEqual("Please confirm the password");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="sign-up d-flex justify-content-center">
        <form
          className="form-horizontal"
          action=""
          method="POST"
          onSubmit={handleSubmit}
        >
          <fieldset>
            <div id="legend">
              <legend className="">Register</legend>
            </div>

            <div className="mb-3">
              <label for="" className="form-label">
                Name
              </label>
              <input
                type="text"
                onChange={onChange}
                className="form-control"
                name="name"
                id=""
                aria-describedby="emailHelpId"
                placeholder="Name"
                required
              />
              <small
                style={{ color: "red" }}
                id="emailHelpId"
                className="form-text"
              >
                {err1}
              </small>
            </div>

            {/* email */}
            <div className="mb-3">
              <label for="" className="form-label">
                Email
              </label>
              <input
                type="email"
                onChange={onChange}
                className="form-control"
                name="email"
                id=""
                aria-describedby="emailHelpId"
                placeholder="abc@mail.com"
                required
              />
              <small
                style={{ color: "red" }}
                id="emailHelpId"
                className="form-text "
              >
                {err2}
              </small>
            </div>

            {/* password */}
            <div className="mb-3">
              <label for="" className="form-label">
                Password
              </label>
              <span style={{ float: "right" }}>
                <i onClick={eyePassfun} className={eyePass}></i>
              </span>
              <input
                type={visiblepass}
                onChange={onChange}
                className="form-control"
                name="password"
                id=""
                aria-describedby="emailHelpId"
                placeholder="Enter password"
                required
              />

              <small
                style={{ color: "red" }}
                id="emailHelpId"
                className="form-text"
              >
                {err3}
              </small>
            </div>

            {/* confirm password */}
            <div className="mb-3">
              <label for="" className="form-label">
                Confirm Password
              </label>
              <span style={{ float: "right" }}>
                <i onClick={eyeConfirmfun} className={eyeConfirm}></i>
              </span>
              <input
                type={visibleconfirm}
                onChange={onChange}
                className="form-control"
                name="confirmPassword"
                id=""
                aria-describedby="emailHelpId"
                placeholder="Enter password"
                required
              />
              <small
                id="confirmpass"
                style={{ color: "red" }}
                className="form-text mb-2"
              >
                {notEqual}{" "}
              </small>
            </div>

            {/* <!-- Button --> */}
            <div className="controls d-flex justify-content-center mb-2">
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                type="submit"
              >
                Register
              </button>
            </div>
          </fieldset>
          <div>
            <Link to="/login" className="text-decoration-none">
              Already a user? Login now.
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
export default Signup;
