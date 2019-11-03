import React, { Component, PropTypes } from 'react';
import './slider.css';


const getElement = function(selector) { return document.querySelector(selector); }

class YetAnotherSlider extends Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    // this.handleLowMouseMove = this.handleLowMouseMove.bind(this);
    this.handleHighMouseMove = this.handleHighMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleLowTouchMove = this.handleLowTouchMove.bind(this);
    this.handleHighTouchMove = this.handleHighTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.incrementLowValue = this.incrementLowValue.bind(this);
    this.incrementHighValue = this.incrementHighValue.bind(this);
    this.decrementLowValue = this.decrementLowValue.bind(this);
    this.decrementHighValue = this.decrementHighValue.bind(this);
    this.state = {
      mouseDown: false,
      touchDown: false,
      touchIdentifier: null,
      x: null,
      changeX: null,
      low: this.props.low,
      high: this.props.high
    };
    this.right = 0; 
    this.left = 0;
  }
  componentDidMount() {
    const leftRailThumb = document.getElementById('rootRailThumbLeft');
    const rightRailThumb = document.getElementById('rootRailThumbRight');
    // leftRailThumb.addEventListener('mouseup', this.handleMouseUp, false);
    // leftRailThumb.addEventListener('mousedown', this.handleMouseDown, false);
    // leftRailThumb.addEventListener('mouseout', this.handleMouseUp, false);
    // leftRailThumb.addEventListener('mousemove', this.handleLowMouseMove, false);

    rightRailThumb.addEventListener('mouseup', this.handleMouseUp, false);
    rightRailThumb.addEventListener('mousedown', this.handleMouseDown, false);
    // rightRailThumb.addEventListener('mouseout', this.handleMouseUp, false);
    rightRailThumb.addEventListener('mousemove', this.handleHighMouseMove, false);

  }

  componentWillUnmount() {
    // document.removeEventListener('click', this.handleClick, false);
    leftRailThumb.removeEventListener('click', this.handleclick, false);
    rightRailThumb.removeEventListener('click', this.handleclick, false);
  }
  handleclick() {
      alert('something happend');
  }
  resetThumb() {
    this.setState({
      mouseDown: false,
      touchDown: false,
      touchIdentifier: null,
      x: null,
    });
  }
  handleMouseDown({ screenX }) {
    console.log('down-->', screenX);
    const { touchDown } = this.state;
    if (touchDown) return;
    this.setState({
      mouseDown: true,
      touchDown: false,
      touchIdentifier: null,
      x: screenX,
      changeX: 0
    });
    // document.getElementById('rootRailThumbRight').addEventListener('mousemove', this.handleHighMouseMove, true);
  }
  handleMouseUp() {
    const { touchDown, x, changeX } = this.state;
    console.log('UP-->', x);
    if (touchDown) return;
    const { high, increment, low, max, min, onChange } = this.props;
    onChange({
      high: Math.min(high + changeX, max),
      low,
    });
    this.resetThumb();
  }
  // handleLowMouseMove({ screenX }) {
  //   const { mouseDown, touchDown, x } = this.state;
  //   if (touchDown) return;
  //   if (!mouseDown) return;
  //   if (screenX > x) {
  //     this.resetThumb();
  //     this.incrementLowValue();
  //   }
  //   if (screenX < x) {
  //     this.resetThumb();
  //     this.decrementLowValue();
  //   }
  // }
  handleHighMouseMove({ screenX }) {
    const { mouseDown, touchDown, x } = this.state;
    console.log('MOVE-->', screenX, "x: ", x);
    if (touchDown) return;
    if (!mouseDown) return;
    const { high, increment, max, min, onChange, low } = this.props;
    // if (screenX > x) {
    //   // this.resetThumb();
    //   this.setState({
    //     changeX: screenX - x
    //   });
    //   this.incrementHighValue(screenX - x);
    // }
    // if (screenX < x) {
    //   this.resetThumb();
    //   this.decrementHighValue();
    // }
    this.setState({
      changeX: screenX - x
    });
    document.getElementById('rootRailThumbRight').style.left = `${(((Math.min(high + screenX - x, max) - min) / (max - min)) * 100)}%`
  }
  handleTouchStart({ touches }) {
    const { mouseDown } = this.state;
    if (mouseDown) return;
    if (touches.length > 1) return;
    const { screenX, identifier } = touches[0];
    this.setState({
      mouseDown: false,
      touchDown: true,
      touchIdentifier: identifier,
      x: screenX,
    });
  }
  handleLowTouchMove({ changedTouches }) {
    const { mouseDown, touchDown, touchIdentifier, x } = this.state;
    if (mouseDown) return;
    if (!touchDown) return;
    for (let i = 0; i < changedTouches.length; i += 1) {
      const { identifier, screenX } = changedTouches[i];
      if (identifier === touchIdentifier) {
        if (screenX > x) {
          this.resetThumb();
          this.incrementLowValue();
        }
        if (screenX < x) {
          this.resetThumb();
          this.decrementLowValue();
        }
      }
    }
  }
  handleHighTouchMove({ changedTouches }) {
    const { mouseDown, touchDown, touchIdentifier, x } = this.state;
    if (mouseDown) return;
    if (!touchDown) return;
    for (let i = 0; i < changedTouches.length; i += 1) {
      const { identifier, screenX } = changedTouches[i];
      if (identifier === touchIdentifier) {
        if (screenX > x) {
          this.resetThumb();
          this.incrementHighValue();
        }
        if (screenX < x) {
          this.resetThumb();
          this.decrementHighValue();
        }
      }
    }
  }
  handleTouchEnd(event) {
    event.preventDefault();
    const {
      mouseDown,
      touchIdentifier,
    } = this.state;
    if (mouseDown) return;
    const { changedTouches } = event;
    for (let i = 0; i < changedTouches.length; i += 1) {
      const { identifier } = changedTouches[i];
      if (identifier === touchIdentifier) {
        this.resetThumb();
      }
    }
  }
  incrementLowValue() {
    const { high, increment, max, onChange, low } = this.props;
    if (low + increment >= high - increment) return;
    onChange({
      high,
      low: Math.min(low + increment, max),
    });
  }
  incrementHighValue(inc) {
    const { high, increment, low, max, min, onChange } = this.props;
    // onChange({
    //   high: Math.min(high + inc, max),
    //   low,
    // });
    document.getElementById('rootRailThumbRight').style.left = `${(((Math.min(high + inc, max) - min) / (max - min)) * 100)}%`
    // left: `${(((high - min) / (max - min)) * 100)}%`,
  }
  decrementLowValue() {
    const { high, increment, min, onChange, low } = this.props;
    onChange({
      high,
      low: Math.max(low - increment, min),
    });
  }
  decrementHighValue() {
    const { increment, low, min, onChange, high } = this.props;
    if (high - increment <= low + increment) return;
    onChange({
      high: Math.max(high - increment, min),
      low,
    });
  }
  render() {
    //   console.log('styles:', styles);

    const {
      barColor,
      barHeight,
      high,
      low,
      max,
      min,
      railColor,
      railHeight,
      rangeColor,
      thumbColor,
      thumbRadius,
      thumbWidth,
    } = this.props;
    const {
      decrementLowValue,
      handleMouseDown,
      handleHighMouseMove,
      handleHighTouchMove,
      handleLowMouseMove,
      handleMouseUp,
      handleTouchEnd,
      handleLowTouchMove,
      handleTouchStart,
      incrementHighValue,
    } = this;
    return (
      <div
        id="root" //{styles.root}
        style={{
          paddingLeft: `${thumbWidth / 2}px`,
          paddingRight: `${thumbWidth / 2}px`,
        }}
      >
        <div
          id="rootRail" // {styles.rootRail}
          style={{
            height: `${railHeight}px`,
            backgroundColor: railColor,
          }}
        >
          <div
            id="rootRailBar"  // {styles.rootRailBar}
            style={{
              height: `${barHeight}px`,
              backgroundColor: barColor,
            }}
          />
          <div
            id="rootRailRange"  // {styles.rootRailRange}
            style={{
              left: `${(((low - min) / (max - min)) * 100)}%`,
              right: `${(((max - high) / (max - min)) * 100)}%`,
              height: '10px',
              backgroundColor: rangeColor,
            }}
          />
          <div
            role="button"
            tabIndex={0}
            id="rootRailThumbLeft" // {styles.rootRailThumb}
            style={{
              left: `${(((low - min) / (max - min)) * 100)}%`,
              borderRadius: `${thumbRadius}%`,
              width: `${thumbWidth}px`,
              height: `${railHeight}px`,
              backgroundColor: thumbColor,
            }}
          />
          <div
            role="button"
            tabIndex={0}
            id="rootRailThumbRight"  // {styles.rootRailThumb}
            style={{
              left: `${(((high - min) / (max - min)) * 100)}%`,
              borderRadius: `${thumbRadius}%`,
              width: `${thumbWidth}px`,
              height: `${railHeight}px`,
              backgroundColor: thumbColor,
            }}
          />
        </div>
        <div>
            <input value={this.state.low}/>
            <input value={this.state.high}/>
        </div>
      </div>
    );
  }
}
YetAnotherSlider.propTypes = {
  barHeight: PropTypes.number,
  barColor: PropTypes.string,
  increment: PropTypes.number,
  high: PropTypes.number,
  leftColor: PropTypes.string,
  low: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func,
  railHeight: PropTypes.number,
  railColor: PropTypes.string,
  rangeColor: PropTypes.string,
  rightColor: PropTypes.string,
  thumbColor: PropTypes.string,
  thumbRadius: PropTypes.number,
  thumbWidth: PropTypes.number,
};
YetAnotherSlider.defaultProps = {
  barHeight: 10,
  barColor: 'blue',
  increment: 1,
  high: 7,
  leftColor: 'rgba(0,0,0,0.3)',
  low: 3,
  max: 10,
  min: 0,
  onChange: () => {},
  railHeight: 40,
  railColor: 'red',
  rangeColor: 'rgba(0,255,0,0.5)',
  rightColor: 'rgba(0,0,0,0.7)',
  thumbColor: 'rgba(0,255,0,0.5)',
  thumbRadius: 30,
  thumbWidth: 30,
};
export default YetAnotherSlider;


// Thankyou very much for the wish, truly made me elated. Wishing you and your family too a very happy and prosperous Diwali!!! May Happiness and Contentment fill your life!