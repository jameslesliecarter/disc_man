import React from 'react';
import SimilarDisc from './SimilarDisc.jsx';


const SimilarList = ({discs, updateSpotlight}) => {

  return (
    <div className="similar-container">
    {discs.map((disc, i) => {
      return (
        <SimilarDisc key={i} disc={disc} updateSpotlight={updateSpotlight} />
        )
    })}
    </div>
  )
}


export default SimilarList;