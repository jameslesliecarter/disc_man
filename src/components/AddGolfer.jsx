import React from 'react';

class AddGolfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      golferName : ''
    }
    this.updateGolfer = this.updateGolfer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateGolfer(e) {
    this.setState({
      golferName: e.target.value
    });
  }

  handleSubmit(e) {
    //TODO submit golferName
  }

  render() {
    return (
      <input className="add-golfer-input" value={this.state.golferName} onKeyDown={this.handleSubmit} onChange={this.updateGolfer} placeholder="Add a golfer, yo!"></input>
    )
  }
}

export default AddGolfer;