import React from 'react';
import YetAnotherSlider from './slider';
import './sliderApp.css';

export default class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          high: 800,
          low: 300,
        }
      }
      handleChange({ high, low }) {
        this.setState({
          high,
          low,
        });
      }
      render() {
        const { high, low } = this.state;
        const { handleChange } = this;
        return (
          <div className="App">
            <header className="App-header">
              <img src={""} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
             
            </p>
            <p>
              <YetAnotherSlider
                barHeight={10}
                barColor="grey"
                increment={100}
                high={high}
                low={low}
                max={1100}
                min={0}
                onChange={handleChange}
                railHeight={30}
                railColor="rgba(0,0,0,0)"
                rangeColor="blue"
                thumbColor="red"
                thumbRadius={50}
                thumbWidth={20}
              />
            </p>
          </div>
        );
      }
}
