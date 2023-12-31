import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { supabase } from './client.js';
import LoadingGIF from './assets/loading.gif'
import './App.css'

function App() {
  
  var prevSearch = "";
  const [filters, setFilters] = useState({order: false, filter: 3, searchQuery: prevSearch});

  const[posts, setPosts] = useState([]);

  const fetchAllPosts = async () => {
      
      if(filters.order===false) {
           var {data} = await supabase.from('Posts').select().order('created_at', {ascending: false});
      }
      else {
            var {data} = await supabase.from('Posts').select().order('vote_count', {ascending: false});
      }

      if(filters.filter === 1)  {
        data = data.filter((p) => {
                 return p.is_tip;
               });
      }
      else if(filters.filter === 2) {
        data = data.filter((p) => {
                return !p.is_tip;
               });  
      }

      if(filters.searchQuery){
         data = data.filter((p) => {
               return (p.title.toLowerCase()).includes(filters.searchQuery);
         });
      }
      
      setPosts(data);
  }
  
  function setPrevSearch(s) {
     prevSearch = s;
  }

  useEffect(()=>{
    document.getElementById('searchBar').addEventListener('input', (e)=>{
      setPrevSearch((e.target.value).trim().toLowerCase());
      setFilters({order: filters.order, filter: filters.filter, searchQuery: prevSearch});
    });
  }, []);

  useEffect(()=>{
    fetchAllPosts();
   }, [filters]);

 
  return (
    <>
        <div className='main'>
           <div className='filters'>
              <div className='filter-item'>
                  <h4>Order By: </h4>
                  <button id="latest-filter" className={(filters.order) ? ('filter-released'):('filter-selected')} onClick={()=>{setFilters({order: false, filter: filters.filter});}} >Latest</button>
                  <button id="popular-filter" className={(filters.order) ? ('filter-selected'):('filter-released')} onClick={()=>{setFilters({order: true, filter: filters.filter});}} >Most Popular</button>
              </div>

              <div className='filter-item'>
                  <h4>Filter By: </h4>
                  <button className={(filters.filter == 1) ? ('filter-selected'):('filter-released')} onClick={()=>{setFilters({order: filters.order, filter: 1});}} >Hacks</button>
                  <button className={(filters.filter == 2) ? ('filter-selected'):('filter-released')} onClick={()=>{setFilters({order: filters.order, filter: 2});}} >Questions</button>
                  <button className={(filters.filter == 3) ? ('filter-selected'):('filter-released')} onClick={()=>{setFilters({order: filters.order, filter: 3});}} >All</button>
              </div>

           </div>

           <div className='gallery'>
            {posts.length==0 &&
                <img src={LoadingGIF}/>
            }

           {posts.length!=0 && 
               posts.map((P) => {
                  let date = new Date(parseFloat(P.created_at));
                  let mins = Math.floor((Date.now() - date.getTime())/(60*1000));
                  let hrs = Math.floor(mins / 60), days = Math.floor(hrs/24);

                  return (
                    <Link key={P.id} to={`/view/${P.id}`}>
                     <div  className='card'> 
                       <p>Posted {(days>0) ? (days+" days ago") : ((hrs>0)?(hrs+" hours ago"):((mins>0)?(mins+" minutes ago"):("Now"))) }</p>
                       <h2>{P.title}</h2>
                       <p> <b>Flaged as: </b>{(P.is_tip) ? ("Productivity Hack"):("Question")}</p>
                       <p>{P.vote_count} ⬆️ upvotes</p>
                     </div>
                    </Link>
                  )
               })

           }

           </div>

        </div>
    </>
  )
}

export default App;