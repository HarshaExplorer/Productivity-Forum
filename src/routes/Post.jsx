import { useEffect, useState } from "react";
import { supabase } from "../client.js";
import { Link, useParams } from "react-router-dom";

const Post = () => { 
    let params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [imgPath, setPath] = useState("");

    const updateVotes = async () => {
                
        setPost({id: post.id, created_at: post.created_at, title: post.title, content: post.content, img_url: post.img_url, vote_count: (post.vote_count+1), secret_key: post.secret_key, is_tip: post.is_tip, comments: post.comments});
        setPath(post.img_url);
        await supabase.from('Posts').update({vote_count: (post.vote_count+1)}).eq('id', params.id);
    }
    
    const deletePost = async () => {
        let pwd = prompt('Enter the secret key to remove this post: ');

        if(pwd === post.secret_key){
           await supabase.from('Posts').delete().eq('id', params.id);
           window.location = '/' ;
           alert('Post Removed Successfully!');
        }

        else{
           alert('Incorrect Secret Key!');
        }  
    }

    const uploadComment = async (text) => {
        await supabase.from('Posts').update({comments: (post.comments+text+'\n')}).eq('id', post.id);

        getPost();
        
    }

    const getPost = async () => {
      const {data} = await supabase.from('Posts').select().eq('id',params.id);

      if(data[0].comments)
        setComments( (data[0].comments).split("\n") );

      setPath(data[0].img_url);
      setPost(data[0]);
    }

    useEffect(()=>{
        getPost();
    },[]);

    let date = new Date(parseFloat(post.created_at));
    let mins = Math.floor((Date.now() - date.getTime())/(60*1000));
    let hrs = Math.floor(mins / 60), days = Math.floor(hrs/24);
 

    return (
        <div className="post-main">
           <div className="post-area"> 
             <div className="post-card">
                <p>Posted {(days>0) ? ((days<2)?("1 day ago"):(days+" days ago")) : ((hrs>0)?((hrs<2)?("1 hour ago"):(hrs+" hours ago")):((mins>0)?((mins<2)?("1 minute ago"):(mins+" minutes ago")):("Now"))) }</p>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                {imgPath.length > 0 && <img src={`${post.img_url}`}/>}
                <p> <b>Flaged as: </b>{(post.is_tip) ? ("Productivity Hack"):("Question")}</p>
                <div className="more-controls">
                   <div><a onClick={()=>{updateVotes();}}> ⬆️ {post.vote_count} upvotes</a></div>
                   <div>
                      <Link to={`/edit/${post.id}`}>Edit 📝 &nbsp;&nbsp;</Link>
                      <a onClick={()=>{deletePost();}}>Remove🗑️</a>
                   </div>
                </div>
                <div className="comments-section">
                    <div className="comments-display">
                      {comments && 
                            comments.map((c) => {
                                if(c!=="")
                                  return (<p key={Math.floor(Math.random() * 10000)}>- {c}</p>)
                            })
                      }
                    </div>

                      <input id="commentBox" type="text" placeholder="Leave your thoughts and comments here... " onKeyDown={(e)=>{
                                if(e.key==='Enter' && (e.target.value).trim() !== "") {
                                    e.preventDefault();
                                    uploadComment((e.target.value).trim());
                                    e.target.value = "";
                                }
                      }}/>
                </div>
             </div>
             
           </div>
        </div>
    )
}

export default Post;