import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";
import { database } from '../Firebase';
import Navbar from './Navbar';
import './Profile.css'
import "./Posts.css";
import Like2 from "./Like2";
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import AddComment from "./AddComment";
import Comments from "./Comments";

function Profile() {
    const {id} = useParams();
    const [userData, setuserData] = useState(null)
    const [posts, setPosts] = useState(null)
    useEffect(() => {
        database.users.doc(id).onSnapshot((snap)=>{
            setuserData(snap.data());
        })
    }, [id])
    useEffect(() => {
      let postArr = [];
      const unsub = database.posts.onSnapshot((querySnapshot) => {
        postArr = [];
        querySnapshot.forEach((doc) => {
          let data = { ...doc.data(), postId: doc.id };
          postArr.push(data);
        });
        setPosts(postArr);
        return unsub;
      });
    }, []);

    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
      setOpen(id);
    };

    const handleClose = (id) => {
      setOpen(null);
    };

    return (
      <>
        {posts == null || userData == null ? 
          <CircularProgress />
         : 
          <>
            <Navbar userData={userData} />
            <div className="spacer"></div>
            <div className="container">
              <div className="upper-part">
                <div className="profile-img">
                  <img src={userData.profileURL} alt="" />
                </div>
                <div className="info">
                  <Typography variant="h6">Name : {userData.fullName}</Typography>
                  <Typography variant="h6">Email : {userData.email}</Typography>
                  <Typography variant="h6">Posts : {userData.postID.length}</Typography>
                </div>
              </div>
              <hr />
              <div className='profile-video-container'>
                    <div className='profile-videos'>
                        {
                            posts.map((post,index)=>{
                                return (
                                    <React.Fragment key={index}>
                                    <div className="videos">
                                        <video muted="muted" style={{cursor:'pointer'}} onClick={()=>handleClickOpen(post.postId)}>
                                            <source src={post.postURL}/>
                                        </video>
                                        <Dialog
                                            open={open===post.postId}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            fullWidth={true}
                                            maxWidth='sm'
                                        >
                                            <div className='modal-container'>
                                            <div className='modal-video-container'>
                                                <video controls autoPlay={true} muted={true}>
                                                    <source src={post.postURL}/>
                                                </video>
                                            </div>
                                            <div className='modal-comment-container'>

                                                <Card variant="outlined">
                                                    <Typography style={{marginLeft:"5px" ,fontWeight:'bold'}}>
                                                      {post.likes.length===0?"":`${post.likes.length} Likes `}
                                                    </Typography>
                                                    <div>
                                                        <Like2 style={{margin:"10px"}} userData={userData} postData={post}/>
                                                        <AddComment userData={userData} postData={post}/>
                                                    </div>
                                                </Card>

                                                <Card className='comments-card' varient="outlined">
                                                    <div className='scrollbar-hidden comments'>
                                                        <Comments  postData={post}/>
                                                    </div>
                                                    
                                                </Card>

                                            </div>
                                            </div>
                                            
                                        </Dialog>
                                    </div>
                                    </React.Fragment>
                                );
                            })
                        }
                    </div>
              </div>
            </div>
          </>
        }
      </>
    )
}

export default Profile
