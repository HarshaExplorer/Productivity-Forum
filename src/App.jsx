import { useState, useEffect } from 'react'
import { supabase } from './client.js';
import './App.css'

function App() {
  
  const [order, setOrder] = useState(false); // false means order by latest and true means order by most popular
  const [filterHack, setFilterHack] = useState(0);
  const [filterQuestion, setFilterQuestion] = useState(0);

  const[posts, setPosts] = useState([]);

  useEffect(()=>{
   fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
     const {data} = await supabase.from('Posts').select().order('id', { ascending: false });

     setPosts(data);
  }

  function orderResults(orderType) {

    if((orderType===1))
      setOrder(false);
    else if((orderType===2))
      setOrder(true);

     if(orderType === 2) { // order by most popular
       console.log('Order by most popular');
     }
     else if (orderType === 1){ // else order by latest
       console.log('Order by latest');
     }
  }

  function filterByHack() {
    setFilterHack((filterHack===0)?(1):(0));

    if(filterHack===0) { 
      console.log('Filter by hack!');
    }
  }

  function filterByQuestion() {
    setFilterQuestion((filterQuestion===0)?(1):(0));

    if(filterQuestion===0) { 
      console.log('Filter by question!');
    }
  }

  return (
    <>
        <div className='main'>
           <div className='filters'>
              <div className='filter-item'>
                  <h4>Order By: </h4>
                  <button id="latest-filter" className={order ? ('filter-released'):('filter-selected')} onClick={()=>{orderResults(1);}} >Latest</button>
                  <button id="popular-filter" className={order ? ('filter-selected'):('filter-released')} onClick={()=>{orderResults(2);}} >Most Popular</button>
              </div>

              <div className='filter-item'>
                  <h4>Filter By: </h4>
                  <button className={filterHack===0 ? ('filter-released'):('filter-selected')} onClick={()=>{filterByHack();}} >Hacks</button>
                  <button className={filterQuestion===0 ? ('filter-released'):('filter-selected')} onClick={()=>{filterByQuestion();}} >Questions</button>
              </div>

           </div>

           <div className='gallery'>
           {posts.length!=0 && 
               posts.map((P) => {
                  let date = Date.parse(P.created_at);
                  let mins = Math.floor((Date.now() - date)/(60*1000));
                  let hrs = Math.floor(mins / 60), days = Math.floor(hrs/24);

                  return (
                    <div key={P.id} className='card'> 
                       <p>Posted {(days>0) ? (days+" days ago") : ((hrs>0)?(hrs+" hours ago"):((mins>0)?(mins+" minutes ago"):("Now"))) }</p>
                       <h3>{P.title}</h3>
                       <p> <b>Flaged as: </b>{(P.is_tip) ? ("Productivity Hack"):("Question")}</p>
                       <p>{P.vote_count} ⬆️ upvotes</p>
                    </div>
                  )
               })

           }

           </div>

        </div>
    </>
  )
}

export default App
