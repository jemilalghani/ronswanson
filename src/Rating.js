import React, { Component } from "react";
import fullstar from "./star.svg";
import emptystar from "./star (1).svg";
import axios from "axios";

export default class Rating extends Component {
  constructor() {
    super();
    this.state = {
      stars: [
        <img
          className="stars"
          src={emptystar}
          onClick={() => this.showStars(1)}
        />,
        <img
          className="stars"
          src={emptystar}
          onClick={() => this.showStars(2)}
        />,
        <img
          className="stars"
          src={emptystar}
          onClick={() => this.showStars(3)}
        />,
        <img
          className="stars"
          src={emptystar}
          onClick={() => this.showStars(4)}
        />,
        <img
          className="stars"
          src={emptystar}
          onClick={() => this.showStars(5)}
        />
      ]
    };
  }
  componentDidMount() {
    axios.get(`/api/rating/${this.props.quote}`).then(response => {
      console.log(response);
    });
  }
  showStars = stars => {
    let starsmapped = [];
    for (let i = 0; i < 5; i++) {
      if (i < stars) {
        starsmapped.push(
          <img
            className="stars"
            src={fullstar}
            onClick={() => this.showStars(i + 1)}
          />
        );
      } else {
        starsmapped.push(
          <img
            className="stars"
            src={emptystar}
            onClick={() => this.showStars(i + 1)}
          />
        );
      }
    }
    this.setState({ stars: starsmapped });
  };
  render() {
    return <div>{this.state.stars}</div>;
  }
}
