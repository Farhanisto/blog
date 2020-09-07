import React, {useState} from 'react'
import axios from 'axios'

export default ({postId})=> {
  const [content, setContent] = useState('') 
  const onSubmit = async e =>{
      e.preventDefault()
      await axios.post(`posts.com/posts/${postId}/comments`, {
          content
      })
      setContent('')
  }
  return(
      <div>
          <form onSubmit= {onSubmit}>
              <div className='form-group'>
                <label>New comment</label>
                <input type="text" className="form-control" value={content} onChange= {e=>setContent(e.target.value)}/>
              </div>
            <button className="btn btn-primary">submit</button>
          </form>
      </div>
  )
}