import React,{useState,useEffect} from 'react'
import { PageHeader } from 'antd';
import { Card } from 'antd';
import api from "../mock_api"
import db from "../firebase"

const Post=(props)=> {
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')

     useEffect(()=>{
             let postRef=db.collection('users').doc(props.uid).collection('posts').doc(props.id)

              postRef.get().then(post=>{
                  let data=post.data()
                      let {content,title}=data
                      setTitle(title)
                      setContent(content)
              })

      
            
     },[])  

    return (
        <div className="post_container">
            <div className="page_header_container">
                  <PageHeader
                     className="site-page-header"
                     title={title}
                     style={{ border:'1px solid rgb(235,237,240)'}}
                     />
               </div>
               <div className="post_content_container">
                   

             <Card   style={{ marginTop:'20px'}}>
                         {
                                content.split('\n').map((item,idx)=>(<p key={idx}>{item}</p>))
                         }
              </Card>
  </div>


              </div>
      
    )
}

export default Post
