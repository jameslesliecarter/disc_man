import React from 'react';
import _ from 'underscore';

const ManSelector = ({updateMan, man}) => {
  let discMans = [
    'DGA',
    'disc king',
    'discmania',
    'discraft',
    'dynamic discs',
    'element discs',
    'fly high discs',
    'full turn discs',
    'galaxy disc golf',
    'gateway disc sports',
    'guru disc golf',
    'infinite discs',
    'innova',
    'kastaplast',
    'kestrel outdoors',
    'latitude 64',
    'legacy discs',
    'lightning discs',
    'millennium',
    'hyzer bomb',
    'mint discs',
    'MVP',
    'obsidian discs',
    'ozone discs',
    'plastic addicts',
    'prodicgy',
    'prodiscus',
    'reptilian disc golf',
    'RPM',
    'skyquest discs',
    'storm disc golf',
    'streamline',
    'tobu discs',
    'viking discs',
    'westside',
    'yikun sports',
    'axiom',
    'disc golf uk',
    'tokyo discs',
    'black zombie disc golf',
    'above ground level',
    'abc discs',
    'aerobie',
    'ching sports',
    'deity discs',
    'rip disc golf',
    'salient discs',
    'skyiron',
    'ub disc golf - hand candy',
    'vibram disc golf',
    'Thought Space Athletics',
    'Daredevil Discs'
  ];

  const capitalizeFirst = (str) => {
    let strArr = str.split(' ');
    for (let i = 0; i < strArr.length; i ++) {
      strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
    }
    return strArr.join(' ');
  }

  let makeOptions = (arr) => {
    let res = [];
    for (let i = 0; i < arr.length; i ++) {
      res.push({'value': arr[i], 'label': capitalizeFirst(arr[i])});
    }
    return _.sortBy(res, 'label');
  };

  const update = (e) => {
    updateMan(e.target.value);
  };

  let options = makeOptions(discMans);
  return (
    <>
      <select size="10" className={'man-selector'} onChange={update}>
        {options.map((option, i) => {
          return(
            <option key={i} value={option.value} label={option.label}>{option.label}</option>
          )
        })}
      </select>
    </>
  )
}

export default ManSelector;