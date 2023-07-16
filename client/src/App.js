import './App.css'
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import {BrowserRouter as Router, Route , Routes} from 'react-router-dom'
import { useState } from 'react';

function App() {

  const [alert , setAlert] = useState(null);

  const showAlert = (message , type)=>{
    setAlert({
      msg:message, 
      type:type
    })     

    setTimeout(()=>{
      setAlert(null);
    } , 1000);
  }

  return (
    <>
      <NoteState showAlert={showAlert}>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
              <Route exact path="/about" element={<About />}/>
                
              <Route exact path="/login" element={<Login showAlert={showAlert} />}/>
          
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
              
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}
export default App;