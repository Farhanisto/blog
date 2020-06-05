import React, {useState, useEffect} from 'react'
import axios from 'axios'


export default ()=> {
    const [posts, setPosts] = useState({})

    const getPosts = async ()=>{
        const res = await axios.get('http://localhost:4000/posts')
        setPosts(res.data)
    }
    useEffect(()=>{
        getPosts()
    },[])

    const renderPosts =  Object.values(posts).map(post => {
        return(
            <div className="card" key={post.id} style= {{width: '30%', marginBottom: '20px'}}>
            <div className="card-body"> 
              {post.title}
            </div>    
            </div>
        )
    })
    
    return (
        <div className='d-flex flex-row flex-wrap justify-content-between'>
            {renderPosts}
        </div>
    )
}