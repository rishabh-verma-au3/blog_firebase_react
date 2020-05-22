import React from 'react'
import { Card } from 'antd';
import {Link } from "@reach/router"
import db from "../firebase"
const PostSnippet=(props)=>{
 
        const onDeletePost=()=>{
             let postRef=db.collection('users').doc(props.user.uid).collection('posts').doc(props.id)
             postRef.delete()
            }




    return(
              <div className="post_snippet_container">
                     <Card
                     style={{ marginTop: 16 }}
                     type="inner"
                     title={props.title}
                     extra={
                     <div className="post_snippet_links"><Link to={`/blogs/${props.uid}/post/${props.id}`} style={{marginRight:'15px'}}>Read More</Link>{props.user && 
                       <div className="post_edit_Links" style={{float:"right"}}> 
                     <Link to={`/update_post/${props.id}`} style={{marginRight:"15px"}}>Edit</Link><a onClick={onDeletePost} >Delete</a></div>}</div>}
                 >
                
                <div className="article_content">  
                  {props.content.split('\n').map((item,idx)=>(<p key={idx}>{item}</p>))
                              }
                </div>
               </Card>


              </div>
    )
}

export default PostSnippet;