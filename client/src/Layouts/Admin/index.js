import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  FormControl,
  InputLabel,
  Input,
  Container,
  Button,
  Grid,
  Link,
  Checkbox,
  FormLabel,
  FormControlLabel,
  Modal,
} from "@mui/material";
import ProductModel from "../../Components/ProductModel";

const Admin = (props) => {
  const [open, setOpen] = useState(false);

  const categoriesList = [
    { label: "Normal", value: "normal" },
    { label: "Premium", value: "premium" },
    { label: "Sell", value: "sell" },
    { label: "Uncategorize", value: "uncategorize" },
  ];
  const navigation = useNavigate();
  const submit = () => {
    console.log("submit");
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Container maxWidth="xl">
      <Button sx={{ textAlign: "center", margin: 5 }} onClick={handleOpen}>
        Add New Product
      </Button>
      <ProductModel open={open} setOpen={(value) => setOpen(value)} />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
