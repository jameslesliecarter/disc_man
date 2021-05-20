import React from 'react';
import ax from 'axios';

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
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('entered');
      ax.post(`/golfers?name=${this.state.golferName}`)
        .then(data => {
          this.props.fetchGolfers();
          this.setState({
            golferName: ''
          });
        })
        .catch(error => {
          console.error('Golfer POST error: ', error);
        });
    }
  }

  render() {
    return (
      <input className="add-golfer-input" value={this.state.golferName} onKeyDown={this.handleSubmit} onChange={this.updateGolfer} placeholder="Add a golfer, yo!"></input>
    )
  }
}

export default AddGolfer;