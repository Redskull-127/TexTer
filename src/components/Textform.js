import React, {useState} from 'react'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useSpeechSynthesis } from 'react-speech-kit';



export default function Textform(props)  {
    const [value, setvalue] = React.useState('');
    const {speak} = useSpeechSynthesis();


    
    const [text, setText] = useState("");
    const {transcript, resetTranscript } = useSpeechRecognition();
    const [isListening, setIsListening] = useState();
    // const microphoneRef = useRef(null);
    if (!SpeechRecognition) {
        props.showAlert("Error! Browser Not Supported.","Danger")
      }
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            return (
                props.showAlert("Error! Browser Not Supported.","Danger"),
            <div className="mircophone-container" >
                Browser is not Support Speech Recognition.
            </div>
        
        );
  }
  else{

  }
  const handleListing = () => {
    setIsListening(true);
    SpeechRecognition.startListening({
      continuous: true,
    });
    props.showAlert("Speech To Text Started Listing!","Success");
  };
  const stopHandle = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    props.showAlert("Speech To Text Stopped Listing!","Success");
};
  const handleReset = () => {
      stopHandle();
      resetTranscript();
      props.showAlert("Text Area Cleared!","Success");
    };
    
    
    
    

    const handleUpClick = ()=>{
        console.log("Uppercase Was Clicked" + text);
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to UPPERCASE!","Success");
    }
    const handleLoClick = ()=>{
        console.log("Lowercase Was Clicked" + text);
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Converted to LOWERCASE!","Success");
    }
    
    const handleOnChange = (event)=>{
        console.log("On Change");
        setText(event.target.value)
    }
    
    const handleClearClick = ()=>{
        console.log("Clear Was Clicked");
        let newText ='';
        setText(newText)
    }
    
    






    //setText= (setText);
    return (
        <>
        <div className="container"style={{Color: props.mode==='dark'?'white':'black'}}>
            <h1>{props.heading} </h1>
            <div className="mb-3">
            <textarea className="form-control" value={text, value} onChange={handleOnChange, (e) => setvalue(e.target.value)} style={{backgroundColor: props.mode==='light'?'white':'grey', color: props.mode==='dark'?'white':'black'}} id="myBox" rows="8"></textarea>
            </div>
            <button className="btn btn-dark mx-2"onClick={handleUpClick}>UPPERCASE</button>
            <button className="btn btn-dark mx-2"onClick={handleLoClick}>LOWERCASE</button>
            <button className="btn btn-dark mx-2 my-2 "onClick={handleClearClick}>CLEAR</button>
            <button className="btn btn-dark mx-2 my-2 "onClick={handleListing}>START STT</button>
            <button className="btn btn-dark mx-2 my-2 "onClick={() => speak ({text: value})  }>PLAY</button>
            
            <div className="microphone-status">
                {isListening ? "Listening........." : <h3>"Click Start To Listening..."</h3>}
            </div>
            {isListening && (
                <div>
            <button className="btn btn-dark mx-2"onClick={stopHandle}>STOP</button>
            <button className="btn btn-dark mx-2"onClick={handleReset}>RESET</button>
            </div>
            )}
        </div>
        <div className="mb-3">
            <textarea className="form-control" value={transcript} style={{backgroundColor: props.mode==='light'?'white':'grey', color: props.mode==='dark'?'white':'black'}} id="myBox" rows="8"></textarea>
        </div>
        <div className="container my-5">
            <h2> Your text summary  </h2>
            <p>{text.split(" ").length} words and {text.length} characters</p>
            <p>{0.008 * text.split(" ").length} Minuter To Read</p>
            <h2>Preview</h2>
            <p className="container my-3">{text.length>0?text:"Enter something above to preview here!"}</p>
        </div>
        </>
    )
}
