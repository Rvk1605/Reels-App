import React from 'react'
import './Video.css'
import ReactDOM from 'react-dom'
function Videos(props) {
    const handleMuted = (e)=>{
        e.preventDefault();
        e.target.muted = !e.target.muted
    }
    const handleScroll = (e)=>{
        let nextVideo = ReactDOM.findDOMNode(e.target).parentNode.nextSibling; //this will find the  target video on DOm from react tree and check for next Video  
        if(nextVideo){
            nextVideo.scrollIntoView();
            e.target.muted = true;
        }
    }
    return (
        <video src={props.src} onEnded={handleScroll} onClick={handleMuted}  className='video-styling' muted="muted" >

        </video>
    )
}

export default Videos
