import React,{useState} from 'react'
import Posts from "./Posts"
import Post from "./Post"
import {Router,Link } from "@reach/router"
import CreatePost from "./CreatePost"
import UpdatePost from "./UpdatePost"
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import {auth} from "../firebase"
import { Menu } from 'antd';
// import AppNav from "./AppNav"
import { FormOutlined , EditOutlined } from '@ant-design/icons';

function App(props){
       
    const [user,setUser]=useState(false)

    auth.onAuthStateChanged(function(user) {
        if (user) {
        // console.log("User is Signed In")
        // console.log(user)
        setUser(user)
        } else {
          console.log("no user")
        }
      });
 
      const onSignOut=()=>{
        auth.signOut().then(function() {
            console.log('Signed Out')
             setUser(false)
          }).catch(function(error) {
            console.log(error)
          });
      }


    return (
        <div className="app_container">

            <div className="app_main_navigation">

            <Menu   mode="horizontal">
        <Menu.Item key="posts" icon={<FormOutlined />}>
          <Link to={`/blogs/${user.uid}/posts`}> Posts</Link>
        </Menu.Item>
        
        {
            user && <Menu.Item key="create_post"  icon={<EditOutlined />}>
            <Link to="/create_post"> Create Posts</Link>
            </Menu.Item>
        }
       
       
        {
            user?<a onClick={onSignOut} style={{float:'right'}}  > Sign Out</a>:<Link to="/sign_in" style={{float:'right'}}  > Sign In</Link>
        }
        
     
      </Menu>


            </div>

            <Router>
            <SignUp path="sign_up" />
            <SignIn path="sign_in" default />
            <Posts path="blogs/:uid/posts" user={user}/>
            <Post path="blogs/:uid/post/:id" user={user} />
            <CreatePost  path="create_post" user={user}/>
            <UpdatePost  path="update_post/:id" user={user} />
            
            </Router>
            
        </div>
    )
}


export default App