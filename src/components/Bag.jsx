import React from 'react';
import InTheBag from './InTheBag.jsx';

const Bag = ({golfers}) => {

  return (
    <div className="bag-zone">
      {golfers.map((golfer, i) => {
        return (
          <InTheBag key={i} golfer={golfer} />
          )
      })}
    </div>
  )

}

export default Bag;