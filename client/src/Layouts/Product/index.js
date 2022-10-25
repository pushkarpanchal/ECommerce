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

const Product = (props) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (props.productsList) {
      setProductList([...props.productsList]);
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
        console.log("list", res);
      })
      .catch((err) => {
        console.log(err);
      });
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
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {productList.length > 0 &&
          productList.map((product, index) => {
            return (
              <Grid
                item
                key={`in-${index}`}
                xs={productList.length < 3 ? 6 : 4}
              >
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      constant.productImageUrl + product.productImage?.filename
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
                    <Button size="small">Add To Cart</Button>
                    {props?.auth?.userRoll === "admin" && (
                      <Chip
                        label="Remove"
                        onClick={() => console.log("sfsd")}
                        onDelete={() => console.log("sfsd")}
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
