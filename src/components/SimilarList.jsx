import React from 'react';
import ax from 'axios';
import SimilarDisc from './SimilarDisc.jsx';


const SimilarList = ({addToBag, golfer, speed, glide, turn, fade, discs, updateSpotlight}) => {


  if (discs.length) {
    return (
      <div className="similar-container">
        <p>Speed: {speed}/ Glide: {glide}/ Turn: {turn}/ Fade: {fade}</p>
        <div className="similar-discs-container">
          {discs.map((disc, i) => {
            return (
              <SimilarDisc addToBag={addToBag} key={i} disc={disc} updateSpotlight={updateSpotlight} />
            )
          })}
        </div>
      </div>
    )
  } else {
    return (
      <div className="similar-container"></div>
    )
  }
}


export default SimilarList;