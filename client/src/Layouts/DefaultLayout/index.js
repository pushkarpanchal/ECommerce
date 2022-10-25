import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
// import { getToken } from "../../Hooks/useToken";
import { connect } from "react-redux";
import Header from "../../Components/Header";
import axiosClient from "../../axios";
import { productsReducer } from "../../redux/product/actions";

const DefaultLayout = (props) => {
  const navigation = useNavigate();
  useEffect(() => {
    if (!props.auth) {
      navigation("/");
    } else {
      getProductsList();
    }
  }, []);

  const getProductsList = async () => {
    axiosClient
      .get("/prodcutslist")
      .then((res) => {
        console.log("list", res);
        props.productsReducer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <Outlet />
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
