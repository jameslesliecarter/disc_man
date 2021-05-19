import React from 'react';
import ManSelector from './components/ManSelector.jsx';
import ModelSelector from './components/ModelSelector.jsx';
import SimilarList from './components/SimilarList.jsx';
import DiscSpotlight from './components/DiscSpotlight.jsx';
import FlightControl from './components/FlightControl.jsx';
import InTheBag from './components/InTheBag.jsx';
import AddGolfer from './components/AddGolfer.jsx';
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
      currentGolfer: [],
      currentBag: []
    }
    this.updateMan = this.updateMan.bind(this);
    this.updateModel = this.updateModel.bind(this);
    this.updateSpotlight = this.updateSpotlight.bind(this);
    this.fetchModels = this.fetchModels.bind(this);
    this.fetchSimilar = this.fetchSimilar.bind(this);
    this.fetchGolfers = this.fetchGolfers.bind(this);
    this.fetchBag = this.fetchBag.bind(this);
    this.renderGolfers = this.renderGolfers.bind(this);
    this.toggleGolfers = this.toggleGolfers.bind(this);
    this.updateGolfer = this.updateGolfer.bind(this);
    this.addToBag = this.addToBag.bind(this);
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
    this.setState({
      currentGolfer: [e.target.innerText]
    })
  }

  addToBag(model) {
    ax.post(`/bag?name=${this.state.currentGolfer[0]}&model=${model}`)
      .then(data => {
        this.fetchBag(this.state.currentGolfer[0]);
      })
      .catch(error => {
        console.error('bag add error: ', error);
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

  fetchBag(golfer) {
    ax.get(`/bag?golfer=${golfer}`)
      .then(data => {
        this.setState({
          currentBag: data.data
        });
      });
  }

  renderGolfers() {
    if (this.state.showGolfers) {
      return (
        <ul className="golfers-list">
          {this.state.golfers.map((golfer, i) => {
            return (
              <li className="list-golfer" key={i} onClick={this.updateGolfer}>{golfer.name}</li>
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
    if (prevState.currentGolfer !== this.state.currentGolfer) {
      this.fetchBag(this.state.currentGolfer[0]);
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
        <AddGolfer />
      </nav>
      <main>
      <div className="controls">
        <ManSelector updateMan={this.updateMan}/>
        <ModelSelector models={this.state.modelOptions} updateModel={this.updateModel} />
        <FlightControl speed={this.state.currentSpeed} glide={this.state.currentGlide} turn={this.state.currentTurn} fade={this.state.currentFade} fetchSimilar={this.fetchSimilar}/>
      </div>
      <div className="display">
        <SimilarList addToBag={this.addToBag} golfer={this.state.currentGolfer} speed={this.state.currentSpeed} glide={this.state.currentGlide} turn={this.state.currentTurn} fade={this.state.currentFade} discs={this.state.similarDiscs} updateSpotlight={this.updateSpotlight}/>
        <DiscSpotlight disc={this.state.selectedDisc} />
      </div>
      </main>
      <div className="bag-zone">
        <InTheBag golfer={this.state.currentGolfer} bag={this.state.currentBag}/>
      </div>
      </>
    )
  }

}

export default App;