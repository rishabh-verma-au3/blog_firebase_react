import React,{useState,useEffect} from 'react'
import { PageHeader,Input } from 'antd';
const {TextArea}=Input;
import { Button } from 'antd';
import db from "../firebase"
import { navigate } from "@reach/router"
const UpdatePost=(props)=> {
    
    const [title,setTitle]=useState('');
    const[content,setContent]=useState('');
     
    useEffect(()=>{
        let postRef=db.collection('users').doc(props.user.uid).collection('posts').doc(props.id)

         postRef.get().then(post=>{
             let data=post.data()
                 let {content,title}=data
                 setTitle(title)
                 setContent(content)
         })

 
       
},[])  




    const onTitleChange=(event)=>{
              setTitle(event.target.value)
    }
     
    const onContentChange=(event)=>{
        setContent(event.target.value)
    }

    const onUpdatePost=()=>{
     
         let  postRef= db.collection('users').doc(props.user.uid).collection('posts').doc(props.id)
         let payload={
             title,content
         }
        
         postRef.update(payload).then(docref=>{
             console.log("Succesfully Updated:"+docref.id)
             
         })
       
       
         navigate('/posts')
            
    }
    

    return (
        <div className="create_post_container">
           <div className="page_header_container">
                  <PageHeader
                     className="site-page-header"
                     title="Create Posts"
                     style={{ border:'1px solid rgb(235,237,240)'}}
                     />
               </div>
               <div className="post_inputs_container">
                   <div className="post_input_container">
                              
                              <div className="post_input_title">
                                     <h2>Post Title</h2>
                              </div>
                              <div className="post_input">
                                   <Input placeholder="Post Title" value={title} onChange={onTitleChange}/>

                              </div>
                   </div>

                   <div className="post_input_container">
                              
                              <div className="post_input_title">
                                     <h2>Post Content</h2>
                              </div>
                              <div className="post_input">
                                 <TextArea rows={10} value={content} onChange={onContentChange}/>

                              </div>
                   </div>
                   <div className="post_input_button">
                   <Button type="primary" size="Large" onClick={onUpdatePost} >Edit Post</Button>

                   </div>
               </div>
        </div>
    )
}

export default UpdatePost
