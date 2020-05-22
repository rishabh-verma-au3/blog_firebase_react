import React,{useState,useEffect} from 'react'
import { PageHeader } from 'antd';
import PostSnippet from "./PostSnippet"
import api from "../mock_api"
import _ from "lodash"
import db from "../firebase"
function Posts(props){
      
    let [posts,setPosts]=useState([])



    useEffect(()=>{
            
        let userId=props.user.uid ? props.user.uid : props.uid

        let postRef=db.collection('users').doc(userId).collection('posts')

        postRef.onSnapshot(async querySnapShot=>{
            // querySnapShot.forEach(post=>{
            //     let {id}=post
            //      let data=post.data()
               
            //      let payload={
            //          id,...data
            //      }
            //     setPosts(posts=>[...posts,payload]) 
            // })

            let postData=await querySnapShot.docs.map(post=>{
                
                 let data=post.data()
                 let {id}=post
                 let payload={
                     id,...data
                 }

                 return payload
            })
            setPosts(postData)
        })
    },[])

     



    return(
        <div className="posts_container">
              <div className="page_header_container">
                  <PageHeader
                     className="site-page-header"
                     title="Posts"
                     style={{ border:'1px solid rgb(235,237,240)'}}
                     />
               </div>


               <div className="articles_container">
                   
                   {
                       _.map(posts,article=>(
                           <PostSnippet key={article.id} id={article.id} title={_.capitalize(article.title)} content={article.content.substring(0,1000)} user={props.user} uid={props.uid}/>
                       ))
                   }
               </div>
        </div>
    )

}


export default Posts;