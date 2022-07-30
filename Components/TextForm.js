import React, { useState } from "react";

export default function TextForm(props) {

  const [text, setText] = useState("");

  const handleUpCase = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Uppercase", "success");
  };

  const handleLowCase=()=>{
    let newText=text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Uppercase", "success");
  };

  const handleClearClick=()=>{
    let newText="";
    setText(newText);
    props.showAlert("Text Cleared", "success");
  };

  const handleSortClick=()=>{
    handleLowCase();
    let strArr=text.split(" ");
    strArr=strArr.sort();
    let newText=strArr.join(" ");
    setText(newText);
    props.showAlert("Text Sorted", "success");
  };

  const handleSpeakClick=()=>{
    let msg=new SpeechSynthesisUtterance();
    msg.text=text;
    msg.lang='en-IN';
    window.speechSynthesis.speak(msg);
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <div className="container" style={{color:props.mode==='light'?'rgb(2 22 42)':'white'}}>
        <h2 className="mb-2">{props.heading}</h2>
        <div className="mb-3">
          <textarea
            className="form-control my-3"
            id="myBox"
            value={text}
            onChange={handleOnChange}
            rows="8"
            style={{backgroundColor:props.mode==='dark'?'rgb(0 0 0)':'white', color: props.mode==='light'?'rgb(2 22 42)':'white'}}
          ></textarea>
          <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpCase}>
            To UpperCase
          </button>
          <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLowCase}>
            To LowerCase
          </button>
          <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleSortClick}>
            Sort
          </button>
          <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleSpeakClick}>
            Speak
          </button>
          <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>
            Clear
          </button>
        </div>
      </div>
      <div className="container my-2" style={{color:props.mode==='light'?'rgb(2 22 42)':'white'}}>
        <h2>Your Text Summary</h2>
        <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
        <p>Minutes to read: {0.008*text.split(" ").filter((element)=>{return element.length!==0}).length}</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Nothing to preview"}</p>
      </div>
    </>
  );
}
