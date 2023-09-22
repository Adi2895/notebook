import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
export default function About() {

    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem("token")) {
            navigate("/login")
        }
    },[])

    return (
        <>
        <div>
            <div className="container justify content center">
            <h2>Welcome user!</h2>
            <p>We are extremly happy that you choose us to make notes from our websites. 
                <strong> yourNotes.com </strong>
            </p>

            <p>You might have questions in your
                mind that why should we choose this websites to 
                make notes right?.
            </p>

            <p>
                We actually provide a high level of security for the user 
                as much as possible regarding the data of the user.
            </p>

            </div>

        </div>


        <div>

        <ul>
                <li>Data Collection:</li>
                <p> We stote the user personal details for 
                    the authentication purposes and the data 
                    stored by the user as notes will not be shared
                    to any other unauthorized users. </p>


                <li>Data usage:</li>
                <p>Collected data may be used to 
                    facilitate user authentication 
                , enalble access to specific features, and 
                ensure the security of the applicaiton.
                </p>

                <li>Data Storage:</li>
                <p>Your data is permanently stored in the 
                    MongoDB database a cross platform, non-relational 
                    database. In case of server failure, Your data is stored in the 
                    mutilple servers. It support redundency. 
                </p>

                <li>Data Protection:</li>
                <p>Your data is highly protected from 
                    the unauthorized user.Only the authorized user 
                    can have the access to read, write and update the data. 
                </p>

                <li>Third-Party Sharing:</li>
                <p>Dear user, Your data is not shared with 
                third parties app or websited not only for
                the authentication purpose. 
                But will share the updates even information is shared 
                for authentication purpose.
                </p>

                <li>User Rights:</li>
                <p> Only the authorized user have the right 
                    to read, write, delete and updates the notes.
                    <br></br>
                    In case you forgot the password, You can 
                    send the OTP on the registered email address after
                verification you can change the password.
                </p>

                <li>Changes to the Privacy Policy:</li>
                <p>The privacy policy may be updated from time to time and 
                    how they will be notified of such changes.</p>
        </ul>



        </div>




</>

    )
}
