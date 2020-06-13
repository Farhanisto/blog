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
        let content
        if(comment.status === 'pending'){
            content = 'awaiting approval' 
        }
        if(comment.status === 'approved'){
            content = comment.content 
        }
        if(comment.status === 'rejected'){
            content = 'rejected'
        }
        console.log(comment, 'key')
        return(      
              <li key={comment.id}>{content}</li>
        )
    })
    return (
        <ul >
            {renderCommentsByPostId}
        </ul>
    )
}