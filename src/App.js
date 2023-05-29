
import './App.css';
import { useEffect, useState, useRef } from 'react';
import { fabric } from 'fabric';
import { FaPen, FaEraser, FaCheck } from 'react-icons/fa'

function App() {
  const canvasRef = useRef(null);
  const [penColor, setPenColor] = useState('black');
  const [penSize, setPenSize] = useState(3);
  const [eraserSize, setEraserSize] = useState(5)
  const [fabricCanvas, setFabricCanvas] = useState();

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current,{
      isDrawingMode: true,
    })
    canvas.setWidth(window.innerWidth);
    canvas.setHeight(window.innerHeight);
    setFabricCanvas(canvas)

    return () => {
      canvas.dispose();
    }
    
  }, [canvasRef])

  const handlePenSize = (width) => {
    if(fabricCanvas){
      fabricCanvas.freeDrawingBrush.width = width;
      setPenSize(width);
      fabricCanvas.renderAll.bind(fabricCanvas);
    }
  }

  const handleEraserSize = (width) => {
    if(fabricCanvas){
      fabricCanvas.freeDrawingBrush.color = "#fff"
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
  }

  return (
    <div className="App">
        <nav>
            <div className="pen">
                <button className='logo' style={{background:`${penColor}`}}><FaPen color='white'/></button>
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
            <div className='eraser' >
                <button className="logo"><FaEraser/></button>
                <input 
                type='range'
                className='range'
                value={eraserSize}
                onChange={(e) => handleEraserSize(e.target.value)} 
                />
            </div>
        </nav>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default App;
