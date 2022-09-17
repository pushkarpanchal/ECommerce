import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ children }) => {
  const history = useNavigate();
  return <div>inner dashborad</div>;
};

export default Dashboard;
