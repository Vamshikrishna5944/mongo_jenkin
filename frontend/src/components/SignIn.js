// import React, { useState } from "react";
// import { Box, Button, TextField, Typography } from "@mui/material";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { authActions } from "../store";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// const Auth = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [inputs, setInputs] = useState({
//     email: "",
//     password: "",
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (event) => {
//     setInputs((prevValue) => ({
//       ...prevValue,
//       [event.target.name]: event.target.value,
//     }));
//   };

//   const sendRequest = async () => {
//     try {
//       const res = await axios.post("http://localhost:8000/api/user/signin", {
//         email: inputs.email,
//         password: inputs.password,
//       });

//       const data = res.data;
//       setMessage(data.message); // Set the message received from the server
//       if (data.user) {
//         localStorage.setItem("userId", data.user._id);
//         dispatch(authActions.signin());
//         navigate("/");
//       }
//     } catch (error) {
//       if (error.response) {
//         if (error.response.status === 400) {
//           setMessage("Invalid credentials. Please check your email and password.");
//         } else if (error.response.status === 404 && (!inputs.email || !inputs.password) ) {
//           setMessage("Enter your Credentials.");
//         } else if (error.response.status === 404) {
//           setMessage("User not found. Please sign up if you don't have an account.");
//         } else {
//           setMessage("An unexpected error occurred. Please try again later.");
//         }
//       } else if (error.request) {
//         setMessage("No response received from the server. Please try again later.");
//       } else {
//         setMessage("An unexpected error occurred. Please try again later.");
//       }
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setMessage("");
//     sendRequest();
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <Box
//           maxWidth={400}
//           display="flex"
//           flexDirection={"column"}
//           alignItems="center"
//           justifyContent={"center"}
//           boxShadow="10px 10px 20px #ccc"
//           padding={3}
//           margin="auto"
//           marginTop={5}
//           borderRadius={10}
//         >
//           <Typography variant="h3" padding={3} textAlign="center">
//             Sign In
//           </Typography>
//           <TextField
//             name="email"
//             onChange={handleChange}
//             type={"email"}
//             value={inputs.email}
//             placeholder="Email"
//             margin="normal"
//           />
//           <TextField
//             name="password"
//             onChange={handleChange}
//             type={"password"}
//             value={inputs.password}
//             placeholder="Password"
//             margin="normal"
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             sx={{ borderRadius: 3, marginTop: 3 }}
//             color="warning"
//           >
//             Sign In
//           </Button>
//           {message && (
//             <Typography
//               variant="body2"
//               color={message.includes("error") ? "error" : "success"}
//               sx={{ marginTop: 2 }}
//             >
//               {message}
//             </Typography>
//           )}
//           <Button
//             component={Link}
//             to="/SignUp" 
//             variant="contained"
//             sx={{ borderRadius: 3, marginTop: 3 }}
//             color="warning"
//           >
//             New Here? Sign Up Now
//           </Button>
//         </Box>
//       </form>
//     </div>
//   );
// };

// export default Auth;

import React, { useState } from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './signin.css'
import logo from "../assets/blog-icon.svg"

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
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
    try {
      const res = await axios.post("http://localhost:8000/api/user/signin", {
        email: inputs.email,
        password: inputs.password,
      });

      const data = res.data;
      setMessage(data.message); // Set the message received from the server
      if (data.user) {
        localStorage.setItem("userId", data.user._id);
        dispatch(authActions.signin());
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setMessage("Invalid credentials. Please check your email and password.");
        } else if (error.response.status === 404 && (!inputs.email || !inputs.password)) {
          setMessage("Enter your Credentials.");
        } else if (error.response.status === 404) {
          setMessage("User not found. Please sign up if you don't have an account.");
        } else {
          setMessage("An unexpected error occurred. Please try again later.");
        }
      } else if (error.request) {
        setMessage("No response received from the server. Please try again later.");
      } else {
        setMessage("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleSubmit = (event) => {
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
      <form className="form" onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            boxShadow="10px 10px 20px #ccc"
            padding={15}
            paddingLeft={0}
            paddingRight={0}
            margin="auto"
            borderRadius={10}
          >
            <Typography variant="h3" padding={1} textAlign="center" style={{color:"#114C81"}}>
              Sign In
            </Typography>
            <TextField
              name="email"
              onChange={handleChange}
              type="email"
              value={inputs.email}
              placeholder="Email"
              margin="normal"
              style={{width:"60%"}}
            />
            <TextField
              name="password"
              onChange={handleChange}
              type="password"
              value={inputs.password}
              placeholder="Password"
              margin="normal"
              style={{width:"60%"}}
            />
            <Button
              type="submit"
              variant="contained"
              style={{fontSize:"18px" ,paddingLeft: "135px", paddingRight: "135px", borderRadius: 3, marginTop: 20,marginBottom:5,borderRadius:"50px", backgroundColor: '#114C81', color: '#fff' }}
            >
              Sign In
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
            <div className="create-account">Don't have account? <a href="/SignUp">Create account</a></div>
          </Box>
        </form>
      </div>
      
      </div>
  );
};

export default Auth;
