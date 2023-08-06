import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Notes from './Notes'
export default function Home(props) {
    const {showAlert} = props;
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("token")){
            navigate("/");
        } else 
            navigate("/login");
    })
    return (
        <div>
            <Notes showAlert={showAlert} />
        </div>
    )
}