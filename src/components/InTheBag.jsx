import React from 'react';
import _ from 'underscore';
import ax from 'axios';

const InTheBag = ({bag, golfer}) => {

  const capitalizeFirst = (str) => {
    let strArr = str.split(' ');
    for (let i = 0; i < strArr.length; i ++) {
      strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
    }
    return strArr.join(' ');
  }

  if (bag.length === 0) {
    return (
      <>
      </>
    )
  } else {
    return (
      <div className="disc-bag">
        <h3>{golfer[0]}'s Bag:</h3>
        {_.sortBy(bag, (disc) => {
          return Number(disc.SPEED);
        }).map((disc, i) => {
          return (
            <div className="disc" key={i}>{capitalizeFirst(disc.model)}</div>
            );
        })}
      </div>
    )
  }
}

export default InTheBag;