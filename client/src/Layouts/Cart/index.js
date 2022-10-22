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

const Cart = (props) => {
  const history = useNavigate();
  useEffect(() => {
    console.log("cartDetails", props.cartDetails);
  }, []);

  const handleDelete = async () => {
    console.log("remove item");
  };
  return (
    <div>
      {props.cartDetails.length > 0 &&
        props.cartDetails.map((item) => {
          console.log("asa", item);
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
                      sx={{ mr: 1, fontSize: 25 }}
                    >
                      {"-"}
                    </Button>
                    <TextField
                      value={item.quantity}
                      disabled
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      sx={{ width: 50, textAlign: "center" }}
                    />
                    <Button
                      variant="outlined"
                      size="medium"
                      sx={{ fontSize: 25 }}
                    >
                      {"+"}
                    </Button>
                    <Chip
                      label="Remove"
                      onClick={handleDelete}
                      onDelete={handleDelete}
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
