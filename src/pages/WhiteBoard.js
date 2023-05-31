import { useEffect, useState, useRef, useContext } from 'react';
import { fabric } from 'fabric';
import { FaPen, FaEraser, FaCheck, FaSortDown } from 'react-icons/fa'
import './whiteboard.css';
import { signOut } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { auth } from '../config/firebaseConfig';

const WhiteBoard = () => {
  const canvasRef = useRef(null);
  const context = useContext(UserContext);
  const [penColor, setPenColor] = useState('black');
  const [penSize, setPenSize] = useState(3);
  const [eraserSize, setEraserSize] = useState(25)
  const [fabricCanvas, setFabricCanvas] = useState();

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current,{
      isDrawingMode: true,
      renderOnAddRemove: false,
      width:window.innerWidth,
      height:window.innerHeight,
    })

    setFabricCanvas(canvas)

    return () => {
      canvas.dispose();
    } 
  }, [canvasRef])

  const handlePen = () => {
    if(fabricCanvas){
      handlePenSize(penSize);
      handleColorChange(penColor)
    }

  }

  const handlePenSize = (width) => {
    if(fabricCanvas){
      fabricCanvas.freeDrawingBrush.width = width;
      setPenSize(width);
      fabricCanvas.renderAll.bind(fabricCanvas);
    }
  }

  const defaultBackground = "#fff"
  const handleEraser = (color) =>{
    if(fabricCanvas){
      fabricCanvas.freeDrawingBrush.color = color;
      fabricCanvas.renderAll();
    }
    handleEraserSize(eraserSize); 
  }
  const handleEraserSize = (width) => {
    if(fabricCanvas){
      fabricCanvas.freeDrawingBrush.width = width;
      setEraserSize(width);
      fabricCanvas.renderAll.bind(fabricCanvas);
    }
  }

  const colors =["#333333", "#219653", "#F2C94C", "#2F80ED", "#EB5757"]
  const handleColorChange =(color) => {
      if(fabricCanvas){
        fabricCanvas.freeDrawingBrush.color = color;
        setPenColor(color);
        fabricCanvas.renderAll.bind(fabricCanvas);
      }
      handlePenSize(penSize);
  }

  const handleClear = () => {
    if(fabricCanvas){
      fabricCanvas.clear();
      handlePen()
    }
  }

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      context.setUser(null);
    })

  }

  return (
    <div className="App" style={{background: defaultBackground}}>
        <nav>{
          context.user? (
            <>
              <div className="pen">
                <button onClick={handlePen} className='logo' style={{background:`${penColor}`}}><FaPen color='white'/></button>
                <input 
                type='range'
                className='range' 
                min='1' max='100'
                value={penSize}
                onChange={(e) => handlePenSize(e.target.value)}
                />
              </div>
              <div className="colors">
                {colors.map((color)=>(
                  <button
                  className='color-btn'
                  key={color}
                  style={{backgroundColor: color}}
                  onClick={()=> handleColorChange(color)}
                  >{color === penColor ? <FaCheck color='white'/> : ""}</button>
                ))}
                <div className='color-picker'>
                  <span></span>
                  <input 
                  type='color' 
                  onChange={(e) => handleColorChange(e.target.value)}
                  />
                </div>
              </div>
              <div className='eraser' onClick={()=>handleEraser(defaultBackground)} >
                <button className="logo"><FaEraser/></button>
                <input 
                type='range'
                className='range'
                value={eraserSize}
                onChange={(e) => handleEraserSize(e.target.value)} 
                />
              </div>
              <button className='clear-btn' onClick={handleClear}>Clear</button>

              <div className='logout'>
                <div className='user-image'>
                  <img src={context.user.photoURL} alt=''/>
                  <FaSortDown style={{fontSize:"25px", padding:"0px 13px"}}/>
                </div>
                <div className='dropdown' onClick={handleSignOut}>
                  <span>Log out</span>
                </div>
              </div>
            </>
          ) : (<Navigate to="/"/>)
          }
            

        </nav>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default WhiteBoard;
