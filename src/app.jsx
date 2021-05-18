import React from 'react';
import ManSelector from './components/ManSelector.jsx';
import ModelSelector from './components/ModelSelector.jsx';
import SimilarList from './components/SimilarList.jsx';
import DiscSpotlight from './components/DiscSpotlight.jsx';
import FlightControl from './components/FlightControl.jsx';
import Bag from './components/Bag.jsx';
import ax from 'axios';
import _ from 'underscore';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedManufacturer: '',
      modelOptions: [],
      selectedModel: {},
      selectedDisc: {},
      similarDiscs: [],
      currentSpeed: '',
      currentGlide: '',
      currentTurn: '',
      currentFade: ''
    }
    this.updateMan = this.updateMan.bind(this);
    this.updateModel = this.updateModel.bind(this);
    this.updateSpotlight = this.updateSpotlight.bind(this);
    this.fetchModels = this.fetchModels.bind(this);
    this.fetchSimilar = this.fetchSimilar.bind(this);
  }

  updateMan(man) {
    this.setState({
      selectedManufacturer: man
    });
  }

  updateModel(selected) {
    this.setState({
      selectedModel: selected,
      selectedDisc: selected,
      currentSpeed: selected.SPEED,
      currentGlide: selected.GLIDE,
      currentTurn: selected.TURN,
      currentFade: selected.FADE
    });
  }

  updateSpotlight(disc) {
    ax.get(`/disc?model=${disc}`)
      .then((data) => {
        this.setState({
          selectedDisc: data.data[0]
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fetchModels(man) {
    ax.get(`/models?brand=${man}`)
      .then(data => {
        this.setState({
          modelOptions: data.data
        });
      })
      .catch(error => {
        console.error('brand fetch error: ', error);
      });
  }

  fetchSimilar(model) {
    ax.post(`/similar`, model)
      .then(data => {
        this.setState({
          similarDiscs: data.data,
          currentSpeed: data.data[0].SPEED,
          currentGlide: data.data[0].GLIDE,
          currentTurn: data.data[0].TURN,
          currentFade: data.data[0].FADE
        });
      })
      .catch(error => {
        this.setState({
          similarDiscs: [{
            brand: "No discs match these flight numbers :(",
            model: "n/a",
            SPEED: "n/a",
            GLIDE: "n/a",
            TURN: "n/a",
            FADE: "n/a"
          }]
        })
      });
  }



  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedManufacturer !== this.state.selectedManufacturer) {
      this.fetchModels(this.state.selectedManufacturer);
    }
    if (prevState.selectedModel !== this.state.selectedModel) {
      this.fetchSimilar(this.state.selectedModel);
    }
  }

  render() {
    return (
      <>
      <nav className="nav-bar" >Let's Get Discy With It</nav>
        <main>
        <div className="controls">
          <ManSelector updateMan={this.updateMan}/>
          <ModelSelector models={this.state.modelOptions} updateModel={this.updateModel} />
          <FlightControl speed={this.state.currentSpeed} glide={this.state.currentGlide} turn={this.state.currentTurn} fade={this.state.currentFade} fetchSimilar={this.fetchSimilar}/>
        </div>
        <div className="display">
          <SimilarList discs={this.state.similarDiscs} updateSpotlight={this.updateSpotlight}/>
          <DiscSpotlight disc={this.state.selectedDisc} />
        </div>
      </main>
      <div className="bag-zone">
        <Bag />
      </div>
      </>
    )
  }

}

export default App;