import axios from 'axios';
// import PropTypes from 'prop-types'
import React, { useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom';
import "../style/Textform.css";
import { BACKEND } from '../App';

export default function Textform(props) {
  // const location = useLocation()

  const addToDB = async (text) => {
    if (!localStorage.getItem("userId")) {
      alert("Your operations are anonymous")
      return
    }
    await axios.post(`${BACKEND}/text/add-text`, {
      userId: localStorage.getItem("userid"),
      text: text
    }).then(() => {
      alert("Added to database!")
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleUpperClick = () => {
    // console.log("Uppercase was clicked" + text);
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase!", "success");
    // setText(newText);
    addToDB(newText)
    
  }
  const handleLowerClick = () => {
    // console.log("Lowercase was clicked" + text);
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase!", "success");
    addToDB(newText)
  }
  const handleClearClick = () => {
    let newText = '';
    setText(newText)
  }

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([text], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    element.click();
  }
  
  const handleReverse = (event) => {
    /* Convert string to array*/
    let strArr = text.split("");
    /* Reverse array*/
    strArr = strArr.reverse();
    let newText = strArr.join("");
    setText(newText);
    addToDB(newText)
  }

  const handleFirstLetterUppercase = () => {
    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    const upper = text.split(' ').map(capitalize).join(' ');
    setText(upper)
    addToDB(upper)
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Copied to Clipboard!", "success");
  }
  const handleOnChange = (event) => {
    setText(event.target.value);
  }
  const [text, setText] = useState('');
  function wordCounter(text) {
    let wordNumber = text.split(/\s+/).filter(function (n) {
      return n !== "";
    }).length;
    return wordNumber;
  }
  return (
    <>
      <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }} >
        <h1 className='mb-4' >{props.heading}</h1>
        <div className="mb-3">
          <textarea className="form-control" value={text} onChange={handleOnChange} style={{ backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }} id="mybox" rows="8"></textarea>
        </div>
        <button disabled={text.length === 0} className="btn btn-light mx-1 my-1" onClick={handleUpperClick}><strong> Convert To UpperCase</strong></button>
        <button disabled={text.length === 0} className="btn btn-light mx-1 my-1" onClick={handleLowerClick}><strong>Convert To LowerCase</strong></button>
        <button disabled={text.length === 0} className="btn btn-light mx-1 my-1" onClick={handleClearClick}><strong>Clear Text</strong></button>
        <button disabled={text.length === 0} className="btn btn-light mx-1 my-1" onClick={downloadTxtFile}><strong>Download Text</strong></button>
        <button disabled={text.length === 0} className="btn btn-light mx-1 my-1" onClick={handleReverse}><strong>Reverse Text</strong></button>
        <button disabled={text.length === 0} className="btn btn-light mx-1 my-1" onClick={handleFirstLetterUppercase}> <strong> First Letter Uppercase</strong></button>
        <button disabled={text.length === 0} className="btn btn-light mx-1 my-1" onClick={handleCopy}><strong>Copy Text</strong></button>
      </div>
      <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
        <h2 className="sum"> Your text summary</h2>
        <h5 className="my-5">
          There are <b>{wordCounter(text)}</b> words and {text.length}{" "}
          characters.
          </h5>
      
         <h5 className="my-5"> You can read these words in{" "}
          {(0.008 * wordCounter(text)).toPrecision(2)} minutes{" "}
          </h5>
        
        <h2 className="sum">Preview</h2>
        <h5 className="my-5">{text.length > 0 ? text : "Enter Something in Box to preview here"}</h5>
      </div>
    </>
  )
}
