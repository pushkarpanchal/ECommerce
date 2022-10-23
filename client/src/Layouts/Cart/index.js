import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Chip,
  TextField,
} from "@mui/material";
import { constant } from "../../Hooks/constent";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosClient from "../../axios";
import { cartReducer } from "../../redux/cart/actions";

const Cart = (props) => {
  const navigation = useNavigate();
  useEffect(() => {
    if (props.cartDetails.length === 0) {
      navigation("/dashboard");
    }
  }, [props.cartDetails]);

  const updateItem = (item, qut) => {
    const data = {
      productId: item.productId,
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

  return (
    <div>
      {props.cartDetails.length > 0 &&
        props.cartDetails.map((item) => {
          return (
            <Card sx={{ maxWidth: "80%", m: "auto", mt: 5 }}>
              <Box sx={{ display: "flex" }}>
                <CardMedia
                  component="img"
                  width="140"
                  image={
                    constant.productImageUrl +
                    item.productData?.productImage?.filename
                  }
                  sx={{ maxWidth: 220, minWidth: 220 }}
                  alt="green iguana"
                />
                <CardContent>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      {item.productData.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {"Price: "}
                      {item.price} {" ₹"}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Typography color="text.secondary" sx={{ mr: 5 }}>
                      {"Qty: "}
                      {item.quantity}
                    </Typography>
                    <Typography color="text.secondary">
                      {"Total Price: "}
                      {item.totalPrice} {" ₹"}
                    </Typography>
                  </Box>
                  <CardActions>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1, height: 40, fontSize: 25 }}
                      onClick={() => updateItem(item, -1)}
                    >
                      {"-"}
                    </Button>
                    <TextField
                      value={item.quantity}
                      disabled
                      size="small"
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      sx={{ width: 50, height: 40, textAlign: "center" }}
                    />
                    <Button
                      variant="outlined"
                      size="medium"
                      sx={{ m: 0, height: 40, fontSize: 25 }}
                      onClick={() => updateItem(item, 1)}
                    >
                      {"+"}
                    </Button>
                    <Chip
                      label="Remove"
                      onClick={() => updateItem(item, 0)}
                      onDelete={() => updateItem(item, 0)}
                      deleteIcon={<DeleteIcon />}
                      variant="outlined"
                    />
                  </CardActions>
                </CardContent>
              </Box>
            </Card>
          );
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartDetails: state.cartDetails.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cartReducer: (data) => dispatch(cartReducer(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
