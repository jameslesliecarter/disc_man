import React from 'react';
import ax from 'axios';
import _ from 'underscore';

const ModelSelector = ({models, updateModel}) => {

  const update = (e) => {
    ax.get(`/disc?model=${e.target.value}`)
      .then(data => {
        updateModel(data.data[0]);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const capitalizeFirst = (str) => {
    let strArr = str.split(' ');
    for (let i = 0; i < strArr.length; i ++) {
      strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
    }
    return strArr.join(' ');
  }

  if (models.length === 0) {
    return (
      <>
      </>
    )
  } else {
  return (
    <>
    <select size="10" className={'model-selector'} onChange={update}>
      {_.sortBy(models, (model) => {
      return model.model.toLowerCase();
      }).map((model, i) => {
        return (
          <option key={i} value={model.model} label={capitalizeFirst(model.model)}>{capitalizeFirst(model.model)}</option>
        )}
      )}
    </select>
    </>
  )}
}

export default ModelSelector;