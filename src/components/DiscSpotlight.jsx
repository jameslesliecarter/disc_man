import React from 'react';

const DiscSpotlight = ({disc}) => {
  if (disc.brand) {
    if (disc.FADE - disc.TURN > 2) {
      disc.stability = 'an overstable';
    } else if (disc.FADE - disc.TURN <= -0.5) {
      disc.stability = 'an understable';
    } else {
      disc.stability = 'a stable';
    }
    if (disc.SPEED <= 3) {
      disc.type = 'putter';
    } else if (disc.SPEED <= 6) {
      disc.type = 'midrange driver';
    } else if (disc.SPEED <= 9) {
      disc.type = 'fairway driver';
    } else {
      disc.type = 'distance driver';
    }
  }
  const capitalizeFirst = (str) => {
    let strArr = str.split(' ');
    for (let i = 0; i < strArr.length; i ++) {
      strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
    }
    return strArr.join(' ');
  }

  if (!disc.model) {
    return (
      <>
      </>
    )
  } else {
    return (
      <div className="spotlight-disc">
        <h3>{capitalizeFirst(disc.brand)}</h3>
        <h3>{capitalizeFirst(disc.model)}</h3>
        <p>The {disc.model} from {disc.brand} is {disc.stability} {disc.type}</p>
      </div>
      )
    }
}

export default DiscSpotlight;