import React,{useState,useEffect} from 'react'
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import { database } from '../Firebase';
function Comments({postData}) {
    const [comments, setComments] = useState(null)
    useEffect(async () => {
        let arr = []
        for(let i=0;i<postData.comments.length;i++){
            let data = await database.comments.doc(postData.comments[i]).get()
            arr.push(data.data())
        }
        setComments(arr)
    }, [postData])
    return (
        <div>
            {
                comments===null?<CircularProgress/>:
                <>
                    {
                        comments.map((comment)=>(
                            <div style={{display:'flex'}}>
                                <Avatar src={comment.userProfileImage}/>
                                <h5><span>{comment.userName}</span> : &nbsp;&nbsp; {comment.text} </h5>
                            </div>
                        ))
                    }
                </>
            }
            
        </div>
    )
}

export default Comments
