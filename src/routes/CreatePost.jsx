import { supabase } from "../client.js";

const CreatePost = () => {

    const insertPost = async (e) => {
        e.preventDefault();
        
        let title = document.getElementById('title').value;
        let content = document.getElementById('content').value;
        let imageURL = document.getElementById('image').value;
        let secret = document.getElementById('secret').value;
        let flag = (document.getElementsByName('flag')[0].checked) ? (true) : (false);
        let date = new Date();
            date = "" + date.getTime();
         
        await supabase.from('Posts').insert({created_at: date, title: title, content:content, img_url: imageURL, secret_key: secret, is_tip: flag});
        
        window.location = '/';
    }

    return (
       <div className="main">
         <div className="create-area">
           <h3>Create a New Post! 💭</h3>
           <form onSubmit={insertPost}>
             <input id="title" type="text" placeholder="Title" required/>
             <textarea id="content" rows="10" cols="60" placeholder="Content (Optional)"/>
             <input id="image" type="text" placeholder="Image URL (Optional)"/>
             <input id="secret" type="password" placeholder="Secret Key" required minLength={5}/>
             
             <div className="flag-area">
               <h4>Flag As: </h4> &nbsp;
               <input type="radio" id="hack" name="flag" value="hack" />
               <label htmlFor="hack">Productivity Hack</label> &nbsp;
               <input type="radio" id="question" name="flag" value="question" defaultChecked/>
               <label htmlFor="question">Question</label> <br />
             </div>

             <input id="form-submit" type="submit" value={"Submit"}/>
           </form>
          </div>
       </div>
    )
}

export default CreatePost;