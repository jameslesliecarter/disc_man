import React from 'react';
import ManSelector from './components/ManSelector.jsx';
import ModelSelector from './components/ModelSelector.jsx';
import SimilarList from './components/SimilarList.jsx';
import DiscSpotlight from './components/DiscSpotlight.jsx';
import FlightControl from './components/FlightControl.jsx';
import InTheBag from './components/InTheBag.jsx';
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
      currentFade: '',
      golfers: [],
      showGolfers: false,
      currentGolfer: []
    }
    this.updateMan = this.updateMan.bind(this);
    this.updateModel = this.updateModel.bind(this);
    this.updateSpotlight = this.updateSpotlight.bind(this);
    this.fetchModels = this.fetchModels.bind(this);
    this.fetchSimilar = this.fetchSimilar.bind(this);
    this.fetchGolfers = this.fetchGolfers.bind(this);
    this.renderGolfers = this.renderGolfers.bind(this);
    this.toggleGolfers = this.toggleGolfers.bind(this);
    this.updateGolfer = this.updateGolfer.bind(this);
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

  updateGolfer(e) {
    e.preventDefault();
    console.log(e.target.innerText);
    this.setState({
      currentGolfer: [e.target.innerText]
    })
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
          }],
          currentSpeed: model.SPEED,
          currentGlide: model.GLIDE,
          currentTurn: model.TURN,
          currentFade: model.FADE
        })
      });
  }

  fetchGolfers() {
    ax.get('/golfers')
      .then(data => {
        this.setState({
          golfers: data.data
        });
      })
      .catch(error => {
        console.error('golfers fetch error: ', error);
      });
  }

  renderGolfers() {
    if (this.state.showGolfers) {
      return (
        <ul className="golfers-list">
          {this.state.golfers.map((golfer, i) => {
            return (
              <li key={i} onClick={this.updateGolfer}>{golfer.name}</li>
            )
          })}
        </ul>
      )
    } else {
      return (
        <>
        </>
      )
    }
  }

  toggleGolfers() {
    this.setState({
      showGolfers: !this.state.showGolfers
    })
  }

  componentDidMount() {
    this.fetchGolfers();
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
      <nav className="nav-bar" >
        <div className='golf-list-container'>
        <div onClick={this.toggleGolfers} className="golfer-select">Golfers</div>
        {this.renderGolfers()}
        </div>
        <div className="title">Let's Get Discy With It</div>
      </nav>
      <main>
      <div className="controls">
        <ManSelector updateMan={this.updateMan}/>
        <ModelSelector models={this.state.modelOptions} updateModel={this.updateModel} />
        <FlightControl speed={this.state.currentSpeed} glide={this.state.currentGlide} turn={this.state.currentTurn} fade={this.state.currentFade} fetchSimilar={this.fetchSimilar}/>
      </div>
      <div className="display">
        <SimilarList speed={this.state.currentSpeed} glide={this.state.currentGlide} turn={this.state.currentTurn} fade={this.state.currentFade} discs={this.state.similarDiscs} updateSpotlight={this.updateSpotlight}/>
        <DiscSpotlight disc={this.state.selectedDisc} />
      </div>
      </main>
      <div className="bag-zone">
        <InTheBag golfer={this.state.currentGolfer}/>
      </div>
      </>
    )
  }

}

export default App;