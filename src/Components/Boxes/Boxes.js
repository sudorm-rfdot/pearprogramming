import React from 'react';
import { withRouter } from 'react-router-dom'
import './Boxes.scss'

const Boxes = (props) => {



  return (
    <button id='boxesparent' className='box' onClick={() => {props.history.push(`/Projects/${props.projectObj.project_id}`)}}>
        <p>{props.name}</p>
    </button>
  )

}

export default withRouter(Boxes)