import { useParams } from "react-router-dom";
import { supabase } from "../client.js";
import { useEffect, useState } from "react";

const EditPost = () => { 

    let params = useParams();
    const[post, setPost] = useState({});

    const getPost = async () => {
        const {data} = await supabase.from('Posts').select().eq('id',params.id); 
        setPost(data[0]);
    }

    const FillPostInfo = () => {
       document.getElementById('title').value = post.title;
       document.getElementById('content').value = post.content;
       document.getElementById('image').value = post.img_url;

       let flag = document.getElementsByName('flag');
       if(post.is_tip) 
          flag[0].checked = true;
    }
    
    useEffect(()=>{
        getPost();
    },[]);

    useEffect(()=>{
        FillPostInfo();
    },[post]);

    const updatePost = async (e) => {
        e.preventDefault();
        let secret = document.getElementById('secret').value;

        if(secret === post.secret_key){
        
            let title = document.getElementById('title').value;
            let content = document.getElementById('content').value;
            let imageURL = document.getElementById('image').value;
            let flag = (document.getElementsByName('flag')[0].checked) ? (true) : (false);
            let date = new Date();
            date = "" + date.getTime();
             
            await supabase.from('Posts').update({created_at: date, title: title, content:content, img_url: imageURL, is_tip: flag}).eq('id',params.id);
            
            window.location = '/';
            alert('Post Edits were finalized successfully!');
        }

        else {
            alert('Incorrect Secret Key! Cannot Publish Edits.');
        }
    }

    return (
       <div className="main">
         <div className="create-area">
           <h3>Edit Post! 💭</h3>
           <form onSubmit={updatePost}>
             <input id="title" type="text" placeholder="Title" required/>
             <textarea id="content" rows="10" cols="60" placeholder="Content (Optional)"/>
             <input id="image" type="text" placeholder="Image URL (Optional)"/>
             <input id="secret" type="password" placeholder="Enter the Secret Key to finalize edits" required minLength={5}/>
             
             <div className="flag-area">
               <h4>Flag As: </h4> &nbsp;
               <input type="radio" id="hack" name="flag" value="hack" />
               <label htmlFor="hack">Productivity Hack</label> &nbsp;
               <input type="radio" id="question" name="flag" value="question" defaultChecked/>
               <label htmlFor="question">Question</label> <br />
             </div>

             <input id="form-submit" type="submit" value={"Update"}/>
           </form>
          </div>
       </div>
    )
}

export default EditPost;