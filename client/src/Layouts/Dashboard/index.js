import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { constant } from "../../Hooks/constent";
import { connect } from "react-redux";
import { cartReducer } from "../../redux/cart/actions";
import axiosClient from "../../axios";

const Dashboard = (props) => {
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
  const history = useNavigate();

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

  const listView = (listItem, type) => {
    return (
      listItem.length > 0 && (
        <div className="deshboard-list-item">
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
    <Container>
      <Grid container>
        <div className="heroImg">
          <img src={constant.publicImageUrl + "maxresdefault.jpg"} />
        </div>
        {listView(productListSG, "Sunglasses")}
        {listView(productListCl, "Clothes")}
        {listView(productListSh, "Shoes")}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    productsList: state.productsList.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cartReducer: (data) => dispatch(cartReducer(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
