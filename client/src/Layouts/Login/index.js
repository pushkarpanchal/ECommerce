import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Container,
  Button,
  Grid,
  Link,
} from "@mui/material";
import { connect } from "react-redux";

import axiosClient from "../../axios";
import { loginReducer } from "../../redux/auth/actions";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    axiosClient
      .post("/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        props.loginReducer(res.data);
        navigation("/dashborad");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitSignUp = (e) => {
    e.preventDefault();
    axiosClient
      .post("/signup", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        props.loginReducer(res.data);
        navigation("/dashborad");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Grid container width="lg">
        {!showSignup ? (
          <form onSubmit={submit}>
            <Grid item sx={{ mb: 1 }}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input
                  id="my-input"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="my-helper-text"
                />
              </FormControl>
            </Grid>
            <Grid item sx={{ mb: 1 }}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  aria-describedby="my-helper-text"
                />
              </FormControl>
            </Grid>
            <Grid item sx={{ mb: 1 }}>
              <Button variant="contained" type="submit">
                Login
              </Button>
              <Link
                href="#"
                onClick={() => setShowSignup(true)}
                underline="hover"
                sx={{ ml: 4 }}
              >
                {"SignUp"}
              </Link>
            </Grid>
          </form>
        ) : (
          <form onSubmit={submitSignUp}>
            <Grid item sx={{ mb: 1 }}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input
                  id="my-input"
                  type="text"
                  required
                  onChange={(e) => setName(e.target.value)}
                  aria-describedby="my-helper-text"
                />
              </FormControl>
            </Grid>
            <Grid item sx={{ mb: 1 }}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input
                  id="my-input"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="my-helper-text"
                />
              </FormControl>
            </Grid>
            <Grid item sx={{ mb: 1 }}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  aria-describedby="my-helper-text"
                />
              </FormControl>
            </Grid>
            <Grid item sx={{ mb: 1 }}>
              <Button variant="contained" type="submit">
                Sign Up
              </Button>
              <Link
                href="#"
                onClick={() => {
                  setShowSignup(false);
                  resetForm();
                }}
                underline="hover"
                sx={{ ml: 4 }}
              >
                {"Login"}
              </Link>
            </Grid>
          </form>
        )}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginReducer: (data) => dispatch(loginReducer(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
