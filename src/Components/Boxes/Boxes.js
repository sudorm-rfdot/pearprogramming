import React from 'react';
import './Boxes.scss'

const Boxes = (props) => {



  return (
    <div id='boxesparent'>
      <div>
        <p>{props.name}</p>
      </div>
    </div>
  )

}

export default Boxes