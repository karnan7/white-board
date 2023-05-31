import React,{ useState } from 'react'
import WhiteBoard from './pages/WhiteBoard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/Login';
import Signup from './pages/Signup';
import { UserContext } from './context/UserContext';
import { Toaster } from 'react-hot-toast';


const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      <Router>
        <Toaster/>
        <UserContext.Provider value={{user,setUser}}>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/whiteboard' element={<WhiteBoard/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  )
}

export default App;
