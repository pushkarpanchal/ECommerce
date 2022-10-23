import React, { useEffect, useState } from "react";
// import { getToken } from "../../Hooks/useToken";
import "./Component.css";
import { connect } from "react-redux";
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Button,
  Grid,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
  FormLabel,
} from "@mui/material";

const UploadImage = (props) => {
  const handleChange = (e) => {
    console.log(e.target.files);
    props.onChange(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <FormLabel htmlFor="name" sx={{ mt: 5 }}>
        Upload Product image
      </FormLabel>
      <div className="fileUpload">
        <input type="file" onChange={handleChange} />
        <img src={props.image} />
      </div>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);
