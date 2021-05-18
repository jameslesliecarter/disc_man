import React from 'react';
import ManSelector from './components/ManSelector.jsx';
import ModelSelector from './components/ModelSelector.jsx';
import SimilarList from './components/SimilarList.jsx';
import DiscSpotlight from './components/DiscSpotlight.jsx';
import FlightControl from './components/FlightControl.jsx';
import Bag from './components/Bag.jsx';
import ax from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedManufacturer: '',
      modelOptions: [],
      selectedModel: {},
      selectedDisc: {},
      similarDiscs: []
    }
    this.updateMan = this.updateMan.bind(this);
    this.updateModel = this.updateModel.bind(this);
    this.fetchModels = this.fetchModels.bind(this);
  }

  updateMan(man) {
    this.setState({
      selectedManufacturer: man
    });
  }

  updateModel(selected) {
    this.setState({
      selectedModel: selected
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
        console.error(error);
      });
  }

  fetchSimilar(model) {
    ax.post(`/similar`, model)
      .then(data => {
        this.setState({
          similarDiscs: data.data
        });
      })
      .catch(error => {
        console.error(error);
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
          <FlightControl />
        </div>
        <div className="display">
          <SimilarList />
          <DiscSpotlight />
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