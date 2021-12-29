import React,{useState} from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { database } from '../Firebase';

function AddComment({userData,postData}) {
    const [text, setText] = useState("")
    const handleClick = ()=>{
        let obj = {
            text:text,
            userProfileImage:userData.profileURL,
            userName:userData.fullName
        }
        database.comments.add(obj).then((doc)=>{
            database.posts.doc(postData.postId).update({
                comments:[...postData.comments,doc.id]
                
            })
        })
        console.log(database.posts)
        setText("")
    }
    return (
      <div style={{display:"flex"}}>
        <TextField id="filled-basic" label="Add a comment" variant="filled" value={text} onChange={(event)=>setText(event.target.value)} />
        <Button variant="text" onClick={handleClick}>Post</Button>
      </div>
    );
}

export default AddComment
