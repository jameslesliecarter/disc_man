import React from 'react';

const SimilarDisc = ({addToBag, disc, updateSpotlight}) => {

  const capitalizeFirst = (str) => {
    let strArr = str.split(' ');
    for (let i = 0; i < strArr.length; i ++) {
      strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
    }
    return strArr.join(' ');
  }

  const update = (e) => {
    updateSpotlight(e.target.title);
  }

  const add = (e) => {
    e.preventDefault();
    addToBag(disc.model);
  }

  return (
    <div className="similar-disc">
      <h5>{capitalizeFirst(disc.brand)}</h5>
      <h3>{capitalizeFirst(disc.model)}</h3>
      <div className="spotlight-btn" title={disc.model} onClick={update}>Spotlight Disc</div>
      <div className="add-to-bag-btn" title={disc.model} onClick={add}>Add To Bag</div>
    </div>
  )
}

export default SimilarDisc;