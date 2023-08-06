import React, { useState,useEffect } from "react";
import "./style/signup.css";
// import arrow from "./static/arrow.png"
import { useNavigate, Link } from "react-router-dom";

const Notes = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [notEqual, setnotEqual] = useState("");
  const [eyePass, seteyePass] = useState("fa-solid fa-eye");
  const [eyeConfirm, seteyeConfirm] = useState("fa-solid fa-eye");
  const [visiblepass, setVisiblepass] = useState("password");
  const [visibleconfirm, setVisibleconfirm] = useState("password");
  const navigate = useNavigate();

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

//   useEffect(()=>{
//     if(localStorage.getItem("token")){
//         navigate("/");
//     } else 
//         navigate("/signup");
// })

  const handleSubmit = async (e) => {
    const port = "http://localhost:3000";
    e.preventDefault();

    if (credentials.password === credentials.confirmPassword) {
      if(credentials.name === ""  ||credentials.email === ""  ||
      credentials.password === ""  ||credentials.confirmPassword === ""){
      props.showAlert("Please fill the required details.", "danger");
        return;
    }
      const response = await fetch(`${port}/api/auth/createuser`, {
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
      }, 3000);
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
              <label for="" class="form-label">
                Name
              </label>
              <input
                type="text"
                onChange={onChange}
                class="form-control"
                name="name"
                id=""
                aria-describedby="emailHelpId"
                placeholder="Name"
                required
              />
              <small
                style={{ color: "#a0a0a7" }}
                id="emailHelpId"
                class="form-text"
              >
                Please enter your Name
              </small>
            </div>

            {/* email */}
            <div className="mb-3">
              <label for="" class="form-label">
                Email
              </label>
              <input
                type="email"
                onChange={onChange}
                class="form-control"
                name="email"
                id=""
                aria-describedby="emailHelpId"
                placeholder="abc@mail.com"
                required
              />
              <small
                style={{ color: "#a0a0a7" }}
                id="emailHelpId"
                class="form-text "
              >
                Please enter your email
              </small>
            </div>

            {/* password */}
            <div className="mb-3">
              <label for="" class="form-label">
                Password
              </label>
              <span style={{ float: "right" }}>
                <i onClick={eyePassfun} class={eyePass}></i>
              </span>
              <input
                type={visiblepass}
                onChange={onChange}
                class="form-control"
                name="password"
                id=""
                aria-describedby="emailHelpId"
                placeholder="Enter password"
                required
              />

              <small
                style={{ color: "#a0a0a7" }}
                id="emailHelpId"
                class="form-text"
              >
                Choose a strong password having capital and <br></br>
                small letters, numbers and special characers
              </small>
            </div>

            {/* confirm password */}
            <div className="mb-3">
              <label for="" class="form-label">
                Confirm Password
              </label>
              <span style={{ float: "right" }}>
                <i onClick={eyeConfirmfun} class={eyeConfirm}></i>
              </span>
              <input
                type={visibleconfirm}
                onChange={onChange}
                class="form-control"
                name="confirmPassword"
                id=""
                aria-describedby="emailHelpId"
                placeholder="Enter password"
                required
              />
              <small
                id="confirmpass"
                style={{ color: "red" }}
                class="form-text mb-2"
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
export default Notes;
