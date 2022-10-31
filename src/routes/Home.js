import React, {useEffect, useState} from "react";
import Nweet from "components/Nweet";
import {db, dbService} from '../fbase';
import NweetFacotry from '../components/NweetFacotry';

const Home = ({user}) => {

    const [nweets , setNweets] = useState([]);

    useEffect(() => {
        dbService.onSnapshot(dbService.collection(db, "nweets"), (snapshot) => {
            const nweetArray = snapshot.docs.map(doc => ({id : doc.id, ...doc.data()}));
            setNweets(nweetArray);
        })
    }, [])

    return (
      <div className='container'>
          <NweetFacotry user={user}/>
          <div style={{marginTop : 30}}>
          {
              nweets.map(n => <Nweet key={n.id} nweetObj={n} isOwner={n.creatorId === user.uid}/>)
          }
          </div>
      </div>
    );
}

export default Home;
