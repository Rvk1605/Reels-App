import React,{useState} from "react";
import Alert from "@mui/material/Alert";
import Button from '@mui/material/Button';
import LinearProgress from "@mui/material/LinearProgress";
import {v4 as uuid} from 'uuid';
import {database, storage } from "../Firebase";

function UploadFile(props) {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [upload, setUpload] = useState("Upload Video")
    const handleChange = async (file)=>{
        if(file==null){
            setError("Please select a file to Upload")
            setTimeout(() => {
                setError('')
                setLoading(false)
            }, 2000);
            return;
        }
        if(file.size/(1024*1024)>100){
            setError("Please select a file < 100 MB")
            setTimeout(() => {
                setError('')
            }, 2000);
            return;
        }
        setLoading(true)
        console.log(props.user)
        let uid= uuid()
            const uploadTask = storage.ref(`/posts/${file.name}`).put(file);
            uploadTask.on("state_changed", progress, error, success); //three function with their task name
            function progress(snapshot) {
                setUpload("Uploading Video ...")
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
                  let obj = {
                    likes: [],
                    comments: [],
                    postID: uid,
                    postURL: url,
                    userName: props.user.fullName,
                    userProfile: props.user.profileURL, //for Avatar of User
                    userID: props.user.userId,
                    // createdAt: database.getTimeStamp,
                  };                  //Save the video
                  console.log(obj)
                   database.posts.add(obj).then(async (ref)=>{
                     let res = await  database.users.doc(props.user.userId).update({
                       postID:props.user.postID!=null?[...props.user.postID,ref.id]:[ref.id]
                     })
                   }).then(()=>{
                     setLoading(false)
                    setUpload("Video Uploaded Successfully")
                   }).catch((err)=>{
                     setLoading(false)
                     setTimeout(() => {
                       setError('')
                     }, 2000);
                   });
                });
                setTimeout(() => {
                  setUpload("Upload Video");
                }, 10000);
                // setUpload("Uploaded Successfully")
                
          }
  }

    return (
      <div>
        {error !== "" ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <input
              accept="video/*"
              id="upload-input"
              type="file"
              style={{ display: "none" }}
              onChange={(event)=>handleChange(event.target.files[0])}
            />
            <label htmlFor="upload-input">
              <Button variant="outlined" color="secondary" component="span" >
                {upload}
              </Button>
            </label>
            {loading && <LinearProgress color="secondary" style={{marginTop:'3%'}} />}
          </>
        )}
      </div>
    );
  }

export default UploadFile
