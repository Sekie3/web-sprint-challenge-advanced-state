import React from 'react';
import { connect } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

function Wheel(props) {
  
  const handleCounterClockwiseClick = () => {
    props.moveCounterClockwise();
  };

  const handleClockwiseClick = () => {
    props.moveClockwise();
  };

  const determineActiveCog = (index) => { 
    const adjustedIndex = ((props.currentWheelState % 6) + 6) % 6;
    return index === adjustedIndex;
}


  return (
    <div id="wrapper">
      <div id="wheel">
        {Array(6).fill(null).map((_, index) => (
          <div 
            key={index} 
            className={`cog ${determineActiveCog(index) ? 'active' : ''}`} 
            style={{ "--i": index }}
          >
            {determineActiveCog(index) ? 'B' : ''}
          </div>
        ))}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleCounterClockwiseClick}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={handleClockwiseClick}>
          Clockwise
        </button>
      </div>
    </div>
  );
}


const mapStateToProps = (state) => ({
  currentWheelState: state.wheel
});

const mapDispatchToProps = {
  moveClockwise,
  moveCounterClockwise
};

export default connect(mapStateToProps, mapDispatchToProps)(Wheel);
