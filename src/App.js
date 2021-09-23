import { useState } from 'react';
import './App.css';
// import About from './components/About';
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import Alert from './components/Alert';
// import Speech from './components/Tts';

function App() {
    const [mode, setmode] = useState('light');
    const [alert, setAlert] = useState(null)
    const showAlert = (message, type)=>{
        setAlert({
            msg: message,
            type: type
        })
    }
    const toggleMode = ()=>{
        if(mode === 'dark'){
            setmode('light');
            document.body.style.backgroundColor = 'white';
            showAlert("Light mode has been enabled", "success");
            setInterval(() => {
                document.title = 'TexTer - Light Mode'
            }, 1000);
        }
        else{
            setmode('dark')
            document.body.style.backgroundColor = 'black';
            showAlert("Dark mode has been enabled", "success");
            setInterval(() => {
                document.title = 'TexTer - Dark Mode'
            }, 1000);
        }
    }
    return (
        <>
        {/* <Router> */}
        <Navbar title="TexTer" aboutText="About US" mode={mode} toggleMode={toggleMode}/>
        <Alert alert = {alert} />
        <div className="container my-3" >
        {/* <Switch> */}
          {/* <Route exact path="/about"> */}
            {/* <About /> */}
          {/* </Route> */}
          {/* <Route exact path="/"> */}
            <Textform showAlert={showAlert} heading="Enter The Text To Analyze Below" mode={mode}  />
          {/* </Route> */}
        {/* </Switch> */}
        {/*<About></About>*/}
        {/* <Speech /> */}
        </div>
        {/* </Router> */}
        </>
    )
}

export default App;