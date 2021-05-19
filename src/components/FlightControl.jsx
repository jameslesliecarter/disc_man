import React from 'react';

const FlightControl = ({speed, glide, turn, fade, fetchSimilar}) => {

  const updateSpeed = (e) => {
    if (speed) {
      let newSpeed = (Number(speed) + Number(e.target.title)) + '';
      fetchSimilar({
        'SPEED': newSpeed,
        'GLIDE': glide,
        'TURN': turn,
        'FADE': fade});
    }
  }
  const updateGlide = (e) => {
    if (glide) {
      let newGlide = (Number(glide) + Number(e.target.title)) + '';
      fetchSimilar({
        'SPEED': speed,
        'GLIDE': newGlide,
        'TURN': turn,
        'FADE': fade});
    }

  }

  const updateTurn = (e) => {
    if (turn) {
      let newTurn = (Number(turn) + Number(e.target.title)) + '';
      fetchSimilar({
        'SPEED': speed,
        'GLIDE': glide,
        'TURN': newTurn,
        'FADE': fade});
    }

  }

  const updateFade = (e) => {
    if (fade) {
      let newFade = (Number(fade) + Number(e.target.title)) + '';
      fetchSimilar({
        'SPEED': speed,
        'GLIDE': glide,
        'TURN': turn,
        'FADE': newFade});
    }

  }

  return (
    <div className="flight-control">
      <div className="control-panel">
        <div onClick={updateSpeed} title={-1} className="less-speed">Less Speed</div>
        <div onClick={updateSpeed} title={1} className="more-speed">More Speed</div>
      </div>
      <div className="control-panel">
        <div onClick={updateGlide} title={-.5} className="less-glide">Less Glide</div>
        <div onClick={updateGlide} title={.5} className="more-glide">More Glide</div>
      </div>
      <div className="control-panel">
        <div onClick={updateTurn} title={.5} className="less-turn">Less Turn</div>
        <div onClick={updateTurn} title={-.5} className="more-turn">More Turn</div>
      </div>
      <div className="control-panel">
        <div onClick={updateFade} title={-.5} className="less-fade">Less Fade</div>
        <div onClick={updateFade} title={.5} className="more-fade">More Fade</div>
      </div>
    </div>
  )
}

export default FlightControl;