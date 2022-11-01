import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import "./Component.css";
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
  Radio,
  RadioGroup,
} from "@mui/material";
import UploadImage from "./UploadImage";
import axiosClient from "../axios";
import { productsReducer } from "../redux/product/actions";

const Admin = (props) => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState(["normal"]);
  const [type, setType] = useState("clothes");

  const categoriesList = [
    { label: "Normal", value: "normal" },
    { label: "Premium", value: "premium" },
    { label: "Sell", value: "sell" },
    { label: "Uncategorize", value: "uncategorize" },
  ];
  const navigation = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productImage", file);
    formData.append("title", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("categories", categories);
    formData.append("type", type);
    axiosClient
      .post("/add-product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log("res", res);
        setFile(null);
        setImage(null);
        setProductName("");
        setDescription("");
        setCategories(["normal"]);
        setPrice("");
        setType("clothes");
        axiosClient
          .get("/prodcutslist")
          .then((res) => {
            console.log("list", res);
            props.productsReducer(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        props.setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ backgroundColor: "white", overflow: "scroll" }}
      className="product-model"
    >
      <Container maxWidth="sm">
        <form onSubmit={submit}>
          <Grid item sx={{ mb: 1 }}>
            <FormControl sx={{ width: "100%" }}>
              <UploadImage
                image={file}
                showImage={image}
                onChange={(file, image) => {
                  setFile(file);
                  setImage(image);
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
              <FormLabel>Categories</FormLabel>
              <div className="categories">
                {categoriesList.map((item, index) => {
                  return (
                    <FormControlLabel
                      key={`item${index}`}
                      control={
                        <Checkbox
                          value={item.value}
                          defaultChecked={
                            item.value === "normal" ? true : false
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCategories([...categories, e.target.value]);
                            } else {
                              const categ = categories.filter(
                                (item) => item !== e.target.value
                              );
                              setCategories([...categ]);
                            }
                          }}
                        />
                      }
                      label={item.label}
                    />
                  );
                })}
              </div>
            </FormControl>
          </Grid>
          <Grid item sx={{ mb: 1 }}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Product Type
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="clothes"
                name="radio-buttons-group"
                onChange={(e) => {
                  console.log(e.target.value);
                  setType(e.target.value);
                }}
                className="product-type-select"
              >
                <FormControlLabel
                  value="clothes"
                  control={<Radio />}
                  label="Clothes"
                />
                <FormControlLabel
                  value="sunglasses"
                  control={<Radio />}
                  label="Sunglasses"
                />
                <FormControlLabel
                  value="shoes"
                  control={<Radio />}
                  label="Shoes"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item sx={{ mb: 1 }}>
            <Button
              variant="contained"
              type="submit"
              disabled={
                !(
                  file !== null &&
                  productName &&
                  price &&
                  description &&
                  categories.length > 0
                )
              }
            >
              Create
            </Button>
            <Link
              href="#"
              onClick={() => props.setOpen(false)}
              underline="hover"
              sx={{ ml: 4 }}
            >
              {"cancel"}
            </Link>
          </Grid>
        </form>
      </Container>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    productsReducer: (data) => dispatch(productsReducer(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
