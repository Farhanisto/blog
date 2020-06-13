import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default ({comments}) =>{
    
    // const [comment, setComments] = useState([])
    // const commentsByPostId = async ()=>{
    //     // const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
    //     setComments(comments)
    //     console.log(comment, 'state')
    // }
    // useEffect(()=> {
    //     commentsByPostId();
    // }, [comment]
    // )
  
    const renderCommentsByPostId = comments.map(comment=> {
        console.log(comment, 'key')
        return(      
              <li key={comment.id}>{comment.content}</li>
        )
    })
    return (
        <ul >
            {renderCommentsByPostId}
        </ul>
    )
}