import * as React from "react";
import {useContext,useState} from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import "./Login.css";
import logo from "../Assets/reelsLogo.png";
import { makeStyles } from "@mui/styles";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { Link ,useNavigate} from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Login() {

  const useStyles = makeStyles({
    text1: {
      color: "violet",
      textAlign: "center",
    },
    card2: {
      height: "10vh",
      marginTop: "2%",
    },
  });
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async()=>{
    try{
      setError(null);
      setLoading(true);
      let res = await login(email, password);
      console.log(res)
      setLoading(false)
      navigate('/')
    }catch(err){
      setError(err);
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
  }

  return (
    <div className="loginwrapper">
      <div className="logincard">
        <Card varient="outlined">
          <div className="reels-logo">
            <img src={logo} alt="Reels" />
          </div>
          <CardContent>
            <Typography
              className={classes.text1}
              fontSize="25px"
              component="div"
            >
              Reel It Feel It
            </Typography>
            {error && (
              <Alert margin="dense" severity="error">
                {error}
              </Alert>
            )}
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={email}
              onChange={(event)=>{setEmail(event.target.value)}}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={password}
              onChange={(event)=>setPassword(event.target.value)}
            />
          </CardContent>

          <Typography
            className={classes.text1}
            fontSize="15px"
            component="div"
            style={{ color: "blue" }}
          >
            Forgot Password ?
          </Typography>
          <CardActions>
            <Button
              size="small"
              fullWidth={true}
              color="primary"
              variant="contained"
              onClick={handleLogin}
              disabled={loading}
            >
              Login
            </Button>
          </CardActions>
        </Card>

        <Card variant="outlined" className={classes.card2}>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              Don't have an acount?  
              <Link
                to="/signup"
                style={{ textDecoration: "none", cursor: "pointer" }}
              > Sign Up
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
