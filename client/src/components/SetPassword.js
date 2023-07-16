import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function SetPassword(props) {

    const [credentials, setCredentails] = useState({email:"", password : "", confirmPassword:""})
    const [notEqual, setnotEqual] = useState("")
    const [eyePass, seteyePass] = useState("fa-solid fa-eye");
    const [eyeConfirm, seteyeConfirm] =useState("fa-solid fa-eye");
    const [visiblepass, setVisiblepass] = useState("password");
    const [visibleconfirm, setVisibleconfirm] = useState("password");
    const navigate = useNavigate();
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

    const handleSubmit = async(e)=>{
        
        const port = "http://localhost:3000";
        e.preventDefault();
        if(credentials.password === credentials.confirmPassword){
            setnotEqual(<i class="fa-solid fa-check" style={{color: "#24fbff;"}}></i>)

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

      <form class="mb-3" onSubmit={handleSubmit}>

      <h2 className='mb-4'>Reset Password</h2>


        {/* email */}
        <div className='mb-3'>
        <label for="" class="form-label">Email</label>
        <input type="email" onChange={onChange} class="form-control" name="email" id="" aria-describedby="emailHelpId" placeholder="abc@mail.com" required/>
        <small id="emailHelpId" class="form-text text-muted">Please enter your email</small>
        </div>


        {/* password */}
        <div className='mb-3'>
        <label for="" class="form-label">Password</label>
        <span  style={{float:"right"}}><i onClick={eyePassfun} class={eyePass}></i></span>
        <input type={visiblepass} onChange={onChange} class="form-control" name="password" id="" aria-describedby="emailHelpId" placeholder="Enter password" required/>
        
        <small id="emailHelpId" class="form-text text-muted">
            Choose a strong password having capital and <br></br>
            small letters, numbers and special characers</small>
        </div>


        {/* confirm password */}
        <div className='mb-3'>
        <label for=""class="form-label">Confirm Password</label>
        <span  style={{float:"right"}}><i onClick={eyeConfirmfun} class={eyeConfirm}></i></span>
        <input type={visibleconfirm} onChange={onChange} class="form-control" name="confirmPassword" id="" aria-describedby="emailHelpId" placeholder="Enter password" required/>
        <p id="confirmpass" style={{color:"red"}} class="form-text mb-2">{notEqual} </p>
        </div>

        {/* button */}

        <button type="submit" style={{marginLeft:"121px"}} name="" id="" class="btn btn-primary text-center" >Submit</button>
     
      </form>
    </div>
  )
}
