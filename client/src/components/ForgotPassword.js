import React, { useEffect, useState } from 'react'
import "./style/forgotPass.css"
import arrow from "./static/arrow.png"
import { useNavigate} from 'react-router-dom';
const baseUrl = process.env.REACT_APP_BASE_URL;
export default function ForgotPassword(props) {

  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("token")){ 
      navigate(`/`)
    } 
  })
   
    const [credentials, setCredentials] = useState({email: ""})

     // OTP generate routing get called 
  const handleSubmit = async(e)=>{
   
    e.preventDefault();
    const response = await fetch(`${baseUrl}/api/auth/otpgenerate?email=${credentials.email}`,
    {              
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          }
      });
      
      const json = await response.json();
      
      if(response.status == 200) {
        props.showAlert(`OTP has been sended at ${credentials.email} Successfully`, "success")
        navigate("/enter-otp")
      } else {
          const error = await json.error;
          props.showAlert(json.msg, "danger")
      }
  }


  const onChange = (e)=>{
    setCredentials({...credentials , [e.target.name] : e.target.value});
}


  
  
  
    return (
    
  <div className='d-flex justify-content-center '>

  <div className='arrow mb-5'>
    <img src={arrow} className="arrow-img img-fluid rounded-top " alt=""/>
  </div>


<form className="form-horizontal" action='' method="POST" onSubmit={handleSubmit}>
<fieldset>
<div id="legend">
  <legend className="">Please Verify your email</legend>
</div>


<div className="control-group mb-5">
  {/* <!-- E-mail --> */}
  <label className="control-label" for="email">E-mail</label>
  <div className="controls">
    <input onChange={onChange} value={credentials.email} type="email"  id="email" name="email" placeholder="user@gmail.com" className="input-xlarge" required/>
      </div>
</div>
  {/* <!-- Button --> */}
  <div className="controls d-flex justify-content-center mb-2">
    <button className="btn btn-primary" onClick={handleSubmit}type='submit'>Send OTP</button>
  </div>


</fieldset >

</form>


  

</div>
  )
}
