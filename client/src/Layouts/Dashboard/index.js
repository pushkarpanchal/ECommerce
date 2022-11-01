import React, { useEffect } from "react";
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

const Dashboard = ({ children }) => {
  const history = useNavigate();
  return (
    <Container>
      <Grid container>
        <div className="heroImg">
          <img src={constant.publicImageUrl + "maxresdefault.jpg"} />
        </div>
      </Grid>
    </Container>
  );
};

export default Dashboard;
