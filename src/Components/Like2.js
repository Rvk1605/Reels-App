import React,{useState,useEffect} from 'react'
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import './Posts.css'
import { database } from '../Firebase';
function Like({userData,postData}) {
    const [like, setLike] = useState(null)
    useEffect(() => {
        let check = postData.likes.includes(userData.userId)?true:false
        setLike(check)
    }, [postData])

    const handleLike = ()=>{
        if(like == true){
            let newArr = postData.likes.filter((el) => el != userData.userId);
            database.posts.doc(postData.postId).update({
              likes: newArr,
            });
        }else{
            let newArr = [...postData.likes,userData.userId]
            database.posts.doc(postData.postId).update({
              likes: newArr,
            });
        }
    }
    return (
      <div>
        {like != null ? (
          <>
            {like == true ? 
              <FavoriteOutlinedIcon onClick={handleLike} className="like" />
             : 
              <FavoriteOutlinedIcon onClick={handleLike} style={{color:'black'}}  className="unlike" />
            }         </>
        ) : (
          <></>
        )}
      </div>
    );
}

export default Like
