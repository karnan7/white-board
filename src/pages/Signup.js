import React, { useState, useContext } from 'react'
import styled from 'styled-components';
import { Link, Navigate } from 'react-router-dom'

import { UserContext } from '../context/UserContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import toast from 'react-hot-toast';

const Signup = () => {
    const context = useContext(UserContext);

    const[ email, setEmail ] = useState("");
    const[ password, setPassword ] = useState("");

    const handleSignup = () => {
        createUserWithEmailAndPassword(auth,email, password)
            .then((userCredential)=> {
                const user = userCredential.user;
                console.log("user", user);
                context.setUser(user);
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignup()
    }

    if(context.user?.uid){
        return <Navigate to="/"/>
    }
    return (
        <Container>
            <Content>
                <h1>Sign Up</h1>
                <Form onSubmit={handleSubmit}>
                    <Input 
                    name='email'
                    type='email'
                    placeholder='Enter your Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input 
                    name='password'
                    type='password'
                    placeholder='Enter a Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <LoginButton type='submit'>Sign Up</LoginButton>
                </Form>
                <div>
                    Already have an account?<Link to="/"> Sign In</Link>
                </div>
            </Content>
        </Container>
    )
}

export default Signup;

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
