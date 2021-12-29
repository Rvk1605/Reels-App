import React, { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import "./Signup.css";
import logo from "../Assets/reelsLogo.png";
import { makeStyles } from "@mui/styles";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { Link ,useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { database,storage } from "../Firebase";

export default function SignUp() {
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
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [upload, setUpload] = useState("Upload Profile Image")
  const { signup } = useContext(AuthContext);

  const handleClick =async ()=>{
    if(file == null){
      setError("Oops! Profile Image Not Uploaded");
      setTimeout(() => {
        setError(null)
      }, 2000);
      return ;
    }
    try{
      setError(null)
      setLoading(false)
      let userObj = await signup(email,password)
      let uid = userObj.user.uid
      console.log(uid)
      const uploadTask = storage.ref(`/users/${file.name}`).put(file);
      uploadTask.on("state_changed", progress, error, success); //three function with their task name
      function progress(snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes )* 100;
        console.log(`uploaded ${progress} %`);
      }
      function error(err) {
        setError(err);
        setTimeout(() => {
          setError(null);
          
        }, 2000);
        setLoading(false);
        return;
      }
      function success() {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.users.doc(uid).set({
            email:email,
            userId:uid,
            fullName:name,
            profileURL:url,
            // createdAt:database.getTimeStamp
          })
        });
        setLoading(false)
        navigate('/login')
        setUpload("Uploaded Successfully")
    }}catch(err){
      setError(err);
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
  }

  return (
    <div className="signupwrapper">
      <div className="signupcard">
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
            {error != null && (
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
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              onChange={(event) => setName(event.target.value)}
            />
            <Button
              color="secondary"
              fullWidth={true}
              variant="outlined"
              margin="dense"
              component="label"
            >
              {/* <CloudUploadIcon/> */}
              {upload}
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setFile(event.target.files[0])
                  setUpload("Image Added")
                }}
                hidden
              />
            </Button>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              fullWidth={true}
              color="primary"
              variant="contained"
              disabled={loading}
              onClick={handleClick}
            >
              Sign Up
            </Button>
          </CardActions>
          <Typography
            className={classes.text1}
            fontSize="25px"
            component="div"
          ></Typography>
        </Card>

        <Card variant="outlined" className={classes.card2}>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              Have an account?{" "}
              <Link
                to="/login"
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                Login
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
