import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
// import { getToken } from "../../Hooks/useToken";
import { connect } from "react-redux";
import Header from "../../Components/Header";

const DefaultLayout = (props) => {
  const navigation = useNavigate();
  useEffect(() => {
    if (!props.auth) {
      navigation("/");
    }
  }, []);

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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
