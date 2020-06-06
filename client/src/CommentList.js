import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default ({postId}) =>{
    const [comments, setComments] = useState([])
    const commentsByPostId = async ()=>{
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
        setComments(res.data)
    }
    useEffect(()=> {
        commentsByPostId();
    }, []
    )
  
    const renderCommentsByPostId = comments.map(comment=> {
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