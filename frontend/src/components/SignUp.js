import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/blog-icon.svg"
import "./signup.css"

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const handleChange = (event) => {
    setInputs((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };
    const sendRequest = async () => {
        if (!inputs.name || !inputs.email || !inputs.password) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/api/user/signup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',  // Fix the typo in 'application'
                },
                body: JSON.stringify({
                    name: inputs.name,
                    email: inputs.email,
                    password: inputs.password,
                }),
            });

            if (res.ok) {
                alert("User successfully created! Please login");
                navigate("/");  // Assuming 'navigate' is a valid function to redirect the user
            } else {
                alert("User registration failed, please try again later.");
            }
        } catch (error) {
            console.error(error);  // Log the actual error for debugging
            alert('An error occurred during registration. Please try again later.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        sendRequest();
    };
    return (
        <div className="container">
            <div className="left">
                <img src={logo} alt="logo"/>
            </div>
        <div className="right">
        <div className="dummy"></div>
        <form onSubmit={handleSubmit}>
            <Box
            maxWidth={600}
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            justifyContent={"center"}
            boxShadow="10px 10px 20px #ccc"
            padding={10}
            paddingLeft={0}
            paddingRight={0}
            margin="auto"
            borderRadius={10}
            >
            <Typography variant="h3" padding={1} textAlign="center" style={{color:"#114C81"}}>
                Sign Up
            </Typography>
            <TextField
                name="name"
                onChange={handleChange}
                type={"text"}
                value={inputs.name}
                placeholder="Name"
                margin="normal"
                style={{width:"60%"}}
            />
            <TextField
                name="email"
                onChange={handleChange}
                type={"email"}
                value={inputs.email}
                placeholder="Email"
                margin="normal"
                style={{width:"60%"}}
            />
            <TextField
                name="password"
                onChange={handleChange}
                type={"password"}
                value={inputs.password}
                placeholder="Password"
                margin="normal"
                style={{width:"60%"}}
            />
            <Button
                type="submit"
                variant="contained"
                style={{fontSize:"18px" ,paddingLeft: "150px", paddingRight: "150px" ,borderRadius: 3, marginTop: 25,marginBottom:10,borderRadius:"50px", backgroundColor: '#114C81', color: '#fff' }}
            >
                Sign Up
            </Button>
            {message && (
                <Typography
                variant="body2"
                color={message.includes("error") ? "error" : "success"}
                sx={{ marginTop: 2 }}
                >
                {message}
                </Typography>
            )}
            <div className="sign-in">Already have an account? <a href="/SignIn">Login</a></div>
            </Box>
            
        </form>
        </div>
        </div>
    );
};
export default Signup;
