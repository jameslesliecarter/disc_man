import React from 'react';
import ax from 'axios';

class InTheBag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bag: []
    };

    this.fetchBag = this.fetchBag.bind(this);
  }

  fetchBag(golfer) {
    ax.get(`/bag?golfer=${golfer}`)
      .then(data => {
        this.setState({
          bag: data.data
        });
      });
  }

  componentDidMount() {
    this.fetchBag(this.props.golfer.name);
  }

  render() {
    return (
      <div>
        {this.state.bag.map((disc, i) => {
          return (
            <div key={i}>{disc.model}</div>
            );
        })}
      </div>
    );
  }
}

export default InTheBag;