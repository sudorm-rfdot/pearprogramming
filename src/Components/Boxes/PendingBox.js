import React from 'react';
import axios from 'axios';

const PendingBox = (props) => {

  const accept = () => {
    axios.put('/api/pendingrequest', { projectid: props.projectid, userid: props.userid })
      .then(props.getProjects())
  }

  const decline = () => {
    console.log(props.projectid, props.userid)
    axios.post('/api/deleteprojectrequest', { projectid: props.projectid, userid: props.userid })
      .then(props.getProjects())
  }

  return (
    <div id='pending-box'>
      <div id='add-points' className='box new-box'>
        <p>{props.name}</p>
        <button onClick={accept}>Accept</button>
        <button onClick={decline}>Decline</button>
      </div>
    </div>
  )

}

export default PendingBox;