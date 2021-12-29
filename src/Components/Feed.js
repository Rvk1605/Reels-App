import React,{useContext,useEffect,useState} from 'react';
import {AuthContext} from "../Context/AuthContext";
import UploadFile from "../Components/UploadFile" ;
import {database} from '../Firebase'
import Posts from './Posts'
import Navbar from './Navbar';
function Feed() {
    const {user,logout} = useContext(AuthContext)
    const [userData, setuserData] = useState("")
    useEffect(() => {
      const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
        setuserData(snapshot.data())
        console.log(snapshot.data());
      })
      return ()=>{unsub()}
    }, [user])
    return (
      <div>
        <Navbar userData={userData}/>
        <div style={{ display: "flex", justifyContent: "center",marginTop:'12vh' }}>
          <UploadFile user={userData} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "25px",
          }}
        >
          <Posts userData={userData} />
        </div>
      </div>
    );
}

export default Feed
