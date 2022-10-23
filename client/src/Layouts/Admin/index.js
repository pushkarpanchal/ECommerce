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
} from "@mui/material";
import UploadImage from "../../Components/UploadImage";

const Admin = (props) => {
  const [file, setFile] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");

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
  return (
    <Container maxWidth="xl">
      <form onSubmit={submit}>
        <Grid item sx={{ mb: 1 }}>
          <FormControl sx={{ width: "100%" }}>
            <UploadImage
              image={file}
              onChange={(file) => {
                setFile(file);
              }}
            />
          </FormControl>
        </Grid>
        <Grid item sx={{ mb: 1 }}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel htmlFor="name">Product name</InputLabel>
            <Input
              id="name"
              type="text"
              required
              onChange={(e) => setProductName(e.target.value)}
              aria-describedby="my-helper-text"
            />
          </FormControl>
        </Grid>
        <Grid item sx={{ mb: 1 }}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel htmlFor="price">Price</InputLabel>
            <Input
              id="price"
              type="number"
              required
              onChange={(e) => setPrice(e.target.value)}
              aria-describedby="my-helper-text"
            />
          </FormControl>
        </Grid>
        <Grid item sx={{ mb: 1 }}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input
              id="description"
              type="text"
              multiline
              maxRows={4}
              required
              onChange={(e) => setDescription(e.target.value)}
              aria-describedby="my-helper-text"
            />
          </FormControl>
        </Grid>
        <Grid item sx={{ mb: 1 }}>
          <FormControl sx={{ width: "100%" }}>
            <FormLabel htmlFor="description">Categories</FormLabel>
            {categoriesList.map((item, index) => {
              return (
                <FormControlLabel
                  key={`item${index}`}
                  control={
                    <Checkbox
                      value={item.value}
                      onChange={(e) => {
                        console.log(e.target.checked, e.target.value);
                      }}
                    />
                  }
                  label={item.label}
                />
              );
            })}
          </FormControl>
        </Grid>
        <Grid item sx={{ mb: 1 }}>
          <Button variant="contained" type="submit">
            Create
          </Button>
          <Link
            href="#"
            onClick={() => navigation("/dashboard")}
            underline="hover"
            sx={{ ml: 4 }}
          >
            {"cancel"}
          </Link>
        </Grid>
      </form>
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
