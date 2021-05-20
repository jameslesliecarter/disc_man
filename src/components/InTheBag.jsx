import React from 'react';
import _ from 'underscore';
import ax from 'axios';

const InTheBag = ({bag, golfer, spotlight, removeFromBag}) => {

  const capitalizeFirst = (str) => {
    let strArr = str.split(' ');
    for (let i = 0; i < strArr.length; i ++) {
      strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
    }
    return strArr.join(' ');
  }

  const updateSpotlight = (e) => {
    spotlight(e.target.innerText.split('\n')[0].toLowerCase());
  }

  const removeDisc = (e) => {
    console.log(e.target.parentElement.innerText.split('\n')[0].toLowerCase());
    removeFromBag(e.target.parentElement.innerText.split('\n')[0].toLowerCase());
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
            <div className="disc" key={i}>
              <div onClick={updateSpotlight} >{capitalizeFirst(disc.model)}
              </div>
              <span onClick={removeDisc}>Remove</span>
            </div>
            );
        })}
      </div>
    )
  }
}

export default InTheBag;