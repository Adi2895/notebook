import React, {useState} from 'react'
import { useNavigate, Link} from 'react-router-dom';

export default function EnterOTP(props) {
    const navigate = useNavigate();
    const [info, setInfo] = useState({OTP:""});

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const port = "http://localhost:3000"
        console.log(info.OTP)
        const response = await fetch(`${port}/api/auth/otpverify?otp=${info.OTP}`, 
        {                      
            method:"GET", 
            headers: {
                "Content-Type": "application/json",
                }   
        });
        
        const json  = await response.json();
        
        if(response.status == 200) {
          props.showAlert(`OTP has been verified Successfully`, "primary")
          navigate("/setpassword")
      } else {
          props.showAlert(json.msg, "danger")
        
      }

    }


    const onChange = (e)=>{
    setInfo({...info , [e.target.name] : e.target.value});
}
  return (
    <form onSubmit={handleSubmit} className="d-flex justify-content-center">
      <div class="mb-3">
        <label for="" class="form-label"> Enter OTP</label>
        <input onChange={onChange} class="form-control mb-3" name="OTP" id=""  placeholder="Please enter the OTP"/>
        <Link class="text-decoration-none" to="/resetpassword" >Send OTP again</Link>
        <button type="submit" style={{marginLeft:"121px"}} name="" id="" class="btn btn-primary text-center" >Submit</button>
      </div>
    </form>
  )
}