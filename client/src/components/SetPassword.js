import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

export default function SetPassword(props) {

    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("token")){ 
          navigate(`/`)
        } 
      })
    
    const [err1, seterr1] = useState("")  
    const [credentials, setCredentails] = useState({email:"", password : "", confirmPassword:""})
    const [notEqual, setnotEqual] = useState("")
    const [eyePass, seteyePass] = useState("fa-solid fa-eye");
    const [eyeConfirm, seteyeConfirm] =useState("fa-solid fa-eye");
    const [visiblepass, setVisiblepass] = useState("password");
    const [visibleconfirm, setVisibleconfirm] = useState("password");
   
    const onChange = (e)=>{
        setCredentails({...credentials , [e.target.name] : e.target.value});
    }

    const eyePassfun = ()=>{

        if(eyePass === "fa-solid fa-eye") {
            setVisiblepass("text")
            seteyePass("fas fa-eye-slash")
        } else {
            setVisiblepass("password")
            seteyePass("fa-solid fa-eye")
        }
    }

    const eyeConfirmfun = ()=>{

        if(eyeConfirm === "fa-solid fa-eye") {
            setVisibleconfirm("text")
            seteyeConfirm("fas fa-eye-slash")
        } else {
            setVisibleconfirm("password")
            seteyeConfirm("fa-solid fa-eye")
        }
    }

    function isValidEmail(email) {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);// const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      
  }

    const handleSubmit = async(e)=>{

        if(credentials.email === ""){
            setTimeout(()=>{
                seterr1("");
              },2000)
            seterr1("Please Enter Your Mail")
        } else if(!isValidEmail(credentials.email)){
            setTimeout(()=>{
                seterr1("");
              },2000)
            seterr1("Invalid Email")
        }
        
        const port = "http://localhost:3000";
        e.preventDefault();
        if(credentials.password === credentials.confirmPassword){
            setnotEqual(<i className="fa-solid fa-check" style={{color: "#24fbff;"}}></i>)

            const response = await fetch(`${port}/api/auth/resetpassword`, {
                                    
            
                method:"POST", 
                headers: {
                    "Content-Type": "application/json",
                    },  
                body:JSON.stringify({email:credentials.email, password:credentials.password})
            })
            
            const json = await response.json();
            if(response.status === 200) {
                props.showAlert(json.msg, "success")
                navigate("/login");
            } else {
                props.showAlert(json.msg, "danger")                
            }
        } else {
            setTimeout(() => {
                setnotEqual("")
            }, 3000);
            setnotEqual("Please confirm the password")
           
        }
    }

    

  return (
    <div className='d-flex justify-content-center'>
      <form className="mb-3" onSubmit={handleSubmit}>
      <h2 className='mb-4'>Reset Password</h2>


        {/* email */}
        <div className='mb-3'>
        <label for="" className="form-label">Email</label>
        <input type="email" onChange={onChange} className="form-control" name="email" id="" aria-describedby="emailHelpId" placeholder="Enter Email-id" required/>
        <small id="emailHelpId" style={{color:"red"}} className="form-text text-muted">{err1}</small>
        </div>


        {/* password */}
        <div className='mb-3'>
        <label for="" className="form-label">Password</label>
        <span  style={{float:"right"}}><i onClick={eyePassfun} className={eyePass}></i></span>
        <input type={visiblepass} onChange={onChange} className="form-control" name="password" id="" aria-describedby="emailHelpId" placeholder="Enter password" required/>
        
        <small id="emailHelpId" className="form-text text-muted">
            Choose a strong password having capital and <br></br>
            small letters, numbers and special characers</small>
        </div>


        {/* confirm password */}
        <div className='mb-3'>
        <label for=""className="form-label">Confirm Password</label>
        <span  style={{float:"right"}}><i onClick={eyeConfirmfun} className={eyeConfirm}></i></span>
        <input type={visibleconfirm} onChange={onChange} className="form-control" name="confirmPassword" id="" aria-describedby="emailHelpId" placeholder="Enter password" required/>
        <p id="confirmpass" style={{color:"red"}} className="form-text mb-2">{notEqual} </p>
        </div>

        {/* button */}

        <button type="submit" style={{marginLeft:"121px"}} name="" id="" className="btn btn-primary text-center" >Submit</button>
     
      </form>
    </div>
  )
}
