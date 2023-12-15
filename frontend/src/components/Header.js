import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "#2196F3",
      }}
    >
      <Toolbar style={{backgroundColor:"#3498db"}}>
        <Typography
          component={Link}
          to="/"
          variant="h4"
          style={{ textDecoration: "none", color:"white", fontWeight:"500px"}}
        >
          My Blog
        </Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(event, val) => setValue(val)}
            >
              <Tab LinkComponent={Link} to="/" label="All Blogs" />
              <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs " />
              <Tab LinkComponent={Link} to="/blogs/add" label="Create Blogs " />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/SignIn"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10, backgroundColorcolor:"#114C81", fontSize:"18px"}}
              >
                Sign In
              </Button>
              <Button
                LinkComponent={Link}
                to="/SignUp"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10, backgroundColorcolor:"#114C81", fontSize:"18px"}}
              >
                Sign Up
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10, backgroundColorcolor:"#114C81", fontSize:"18px"}}
            >
              Log Out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
