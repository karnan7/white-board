import React, { useState, useContext } from 'react'
import { FcGoogle } from 'react-icons/fc'
import styled from 'styled-components';
import { Link, Navigate } from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from '../config/firebaseConfig';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';

const Login = () => {
    const context = useContext(UserContext)
    const [ email, setEmail ] = useState("abc@example.com")
    const [ password, setPassword ] = useState("123456")

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                context.setUser(user);
            })
            .catch((error) => {
                toast.error("User not found. Please sign up")
            })
    }
    const handleGoogleSignIn = (e) => {
        e.preventDefault();
        const googleAuthProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleAuthProvider)
        .then((userCredential) => {
            context.setUser(userCredential.user);
        })
        .catch((error) => {
            toast.error("User not found. Please sign up")
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin()
    }

    if(context.user?.uid){
        return <Navigate to="/whiteboard"/>
    }
  return (
    <Container>
        <Content>
            <h1>Sign in</h1>
            <Form onSubmit={handleSubmit}>
                <Input 
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <Input 
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ></Input>
                <LoginButton type='submit'>sign in</LoginButton>
            </Form>
            <Google onClick={handleGoogleSignIn}>
                <FcGoogle style={{fontSize:"20px"}}/>
                <p>Sign in with google</p>
            </Google>
            <div>
                Don't have an account?<Link to="/signup"> Sign up</Link>
            </div>
        </Content>
    </Container>
  )
}

export default Login;

const Container = styled.div`
    min-height:100vh;
    display:grid;
    place-content:center;
`
const Content =styled.div`
    display:flex;
    align-items:center;
    gap:30px;
    flex-direction:column;
    height:500px;
    width:350px;
    border-radius:10px;
    padding: 0px 20px;
    box-shadow: 0px 0px 20px 2px;
    h1{
        text-transform:uppercase;
    }

`
const Form = styled.form`
    display:grid;
    gap:35px;
    width:100%;
`
const Input = styled.input`
    height:40px;
`
const LoginButton = styled.button`
        padding: 18px;
        border-radius:10px;
        border:none;
        background-color:#007BA7;
        color:#fff;
        text-transform:uppercase;
        letter-spacing:2px;
        cursor:pointer;
`
const Google = styled(LoginButton)`
    display:flex;
    align-items: center;
    gap:15px;
    background-color:#333;
    padding: 5px 15px;
    width:100%;
    letter-spacing:0;

`
