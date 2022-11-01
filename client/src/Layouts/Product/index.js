import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Container,
  Button,
  Chip,
  Grid,
  Link,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { connect } from "react-redux";
import axiosClient from "../../axios";
import { useNavigate } from "react-router-dom";
import { constant } from "../../Hooks/constent";
import { cartReducer } from "../../redux/cart/actions";
import { productsReducer } from "../../redux/product/actions";

const Product = (props) => {
  const [productListSG, setProductListSG] = useState([]);
  const [productListCl, setProductListCl] = useState([]);
  const [productListSh, setProductListSh] = useState([]);

  useEffect(() => {
    if (props.productsList) {
      const productData = {
        sunGlass: [],
        cloths: [],
        shoes: [],
      };
      props.productsList.forEach((item) => {
        if (item.type === "sunglasses") {
          productData.sunGlass = [...productData.sunGlass, item];
        } else if (item.type === "clothes") {
          productData.cloths = [...productData.cloths, item];
        } else {
          productData.shoes = [...productData.shoes, item];
        }
      });
      setProductListSG([...productData.sunGlass]);
      setProductListCl([...productData.cloths]);
      setProductListSh([...productData.shoes]);
    }
  }, [props.productsList]);

  const onSearchProduct = (value) => {
    let search = "";
    if (value === "") {
      search = "";
    } else {
      search = `?search=${value}`;
    }

    axiosClient
      .get(`/prodcutslist${search}`)
      .then((res) => {
        props.productsReducer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProductList = () => {
    axiosClient
      .get(`/prodcutslist`)
      .then((res) => {
        console.log("list", res);
        props.productsReducer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateItem = (item, qut) => {
    const data = {
      productId: item._id,
      quantity: qut,
      price: item.price,
    };
    axiosClient
      .post("/add-to-cart", data)
      .then((res) => {
        axiosClient
          .get("/cart-items")
          .then((res) => {
            props.cartReducer(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeProduct = (item) => {
    axiosClient
      .delete(`/deleteproduct/${item._id}`, {
        headers: { method: "DELETE" },
      })
      .then((res) => {
        getProductList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const listView = (listItem, type) => {
    return (
      listItem.length > 0 && (
        <div>
          <Typography gutterBottom variant="h4" component="div">
            {type}
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {listItem.map((product, index) => {
              return (
                <Grid
                  item
                  key={`${type}-in-${index}`}
                  xs={listItem.length < 3 ? 6 : 4}
                >
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        constant.productImageUrl +
                        product.productImage?.filename
                      }
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => updateItem(product, 1)}
                      >
                        Add To Cart
                      </Button>
                      {props?.auth?.userRoll === "admin" && (
                        <Chip
                          label="Remove"
                          onClick={() => removeProduct(product)}
                          onDelete={() => removeProduct(product)}
                          deleteIcon={<DeleteIcon />}
                          variant="outlined"
                        />
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )
    );
  };

  return (
    <Container maxWidth="xl">
      <Grid sx={{ mt: 5, mb: 2 }}>
        <InputLabel htmlFor="search">search</InputLabel>
        <Input
          type={"search"}
          name="search"
          onChange={(e) => {
            console.log(e.target.value);
            onSearchProduct(e.target.value);
          }}
        />
      </Grid>
      {listView(productListSG, "Sunglasses")}
      {listView(productListCl, "Clothes")}
      {listView(productListSh, "Shoes")}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth?.data,
    productsList: state.productsList.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cartReducer: (data) => dispatch(cartReducer(data)),
    productsReducer: (data) => dispatch(productsReducer(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
