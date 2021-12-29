import React,{useState,useEffect} from 'react'
import {database} from '../Firebase'
import CircularProgress from "@mui/material/CircularProgress";
import Videos from './Videos'
import Avatar from "@mui/material/Avatar";
import './Posts.css'
import CommentBankIcon from "@mui/icons-material/CommentBank";
import Like from './Like'
import Like2 from './Like2'
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import AddComment from './AddComment';
import Comments from './Comments';

function Posts({userData}) {
    const [posts, setPosts] = useState(null)
    const [open, setOpen] = useState(null);

    const callback = (entries)=>{
      entries.forEach((entry)=>{
        let ele = entry.target.childNodes[0]
        console.log(ele)
        ele.play().then(()=>{
          if(!ele.paused && !entry.isIntersecting){
            ele.pause();
          }
        })
      })
    }
    useEffect(() => {
      const elements = document.querySelectorAll(".videos")
      elements.forEach((element)=>{
        observer.observe(element)
      })
      return ()=>{
        observer.disconnect();
      }
    }, [posts])
    let observer = new IntersectionObserver(callback,{threshold:0.6})

    const handleClickOpen = (id) => {
      setOpen(id);
    };

    const handleClose = (id) => {
      setOpen(null);
    };

    useEffect(() => {
        let postArr = []
        const unsub = database.posts.onSnapshot((querySnapshot)=>{
            postArr = []
            querySnapshot.forEach((doc)=>{
                let data = {...doc.data(),postId:doc.id}
                postArr.push(data)
            })
            setPosts(postArr)
            return unsub;
        })
    }, [])
    return (
    <>
      {
        posts== null || userData == null ? <CircularProgress /> :
        <div className='video-container'>
            {
                
                posts.map((post,index)=>{
                      return (
                        <React.Fragment key={index}>
                          <div className="videos">
                            <Videos src={post.postURL} />
                            <div className="likes-comments fa">
                              <Avatar alt="" src={userData.profileURL} />
                              <h4>{userData.fullName}</h4>
                              <Like userData={userData} postData={post}/>
                              <CommentBankIcon onClick={()=>handleClickOpen(post.postId)} className="comment-styling"/>
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
                                          {post.likes.length==0?"":`${post.likes.length} Likes `}
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
                          </div>
                        </React.Fragment>
                      );
                })
            }
        </div>
      }
      </>
    );
}

export default Posts
