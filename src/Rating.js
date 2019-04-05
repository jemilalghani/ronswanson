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
      ],
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      ratingInfo: "",
      rating: 0,
      data: [],
      gettingInfo: false
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.quote !== this.props.quote) {
      this.clear();
      this.showStars(0);
      this.getInfo();
      this.checkDatabase();
    }
  }
  getInfo() {
    if (this.props.quote[0]) {
      let title = this.props.quote
        .split("'")
        .join("")
        .split("?")
        .join("");
      axios.get(`/api/rating/${title}`).then(response => {
        this.inputValues(response.data);
        this.calculateAvg();
        this.setState({ ratingInfo: response.data, gettingInfo: true });
      });
    }
  }
  calculateAvg() {
    let valueOne = this.state.one;
    let valueTwo = this.state.two;
    let valueThree = this.state.three;
    let valueFour = this.state.four;
    let valueFive = this.state.five;
    let num =
      valueOne + valueTwo * 2 + valueThree * 3 + valueFour * 4 + valueFive * 5;
    let den = valueOne + valueTwo + valueThree + valueFour + valueFive;
    let total = num / den;
    let final = total.toFixed(2);
    this.setState({ value: final });
  }
  checkDatabase() {
    let title = this.props.quote
      .split("'")
      .join("")
      .split("?")
      .join("");
    axios
      .post("/api/check", { quote: title, ip: this.props.ip })
      .then(response => {
        if (response.data.length) {
          document.getElementById("submit").disabled = true;
        } else {
          document.getElementById("submit").disabled = false;
        }
        this.setState({ notAvail: response.data });
      });
  }
  inputValues(array) {
    let valueOne = this.state.one;
    let valueTwo = this.state.two;
    let valueThree = this.state.three;
    let valueFour = this.state.four;
    let valueFive = this.state.five;
    for (let i = 0; i < array.length; i++) {
      if (array[i].rating == 5) {
        this.setState({ five: valueFive + 1 });
        valueFive = this.state.five;
      } else if (array[i].rating == 4) {
        this.setState({ four: valueFour + 1 });
        valueFour = this.state.four;
      } else if (array[i].rating == 3) {
        this.setState({ three: valueThree + 1 });
        valueThree = this.state.three;
      } else if (array[i].rating == 2) {
        this.setState({ two: valueTwo + 1 });
        valueTwo = this.state.two;
      } else if (array[i].rating == 1) {
        this.setState({ one: valueOne + 1 });
        valueOne = this.state.one;
      }
    }
  }
  clear() {
    this.setState({
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      ratingInfo: "",
      gettingInfo: false
    });
  }
  postRating() {
    let quote = this.props.quote
      .split("'")
      .join("")
      .split("?")
      .join("");
    axios
      .post("/api/addrating", {
        quote: quote,
        rating: this.state.rating,
        ip: this.props.ip
      })
      .then(response => {
        this.clear();
        this.getInfo();
        this.checkDatabase();
        this.setState({ ratingInfo: response.data });
      });
  }
  showStars = stars => {
    let starsmapped = [];
    this.setState({ rating: stars });
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
    return (
      <div className="ratingContainer">
        <div>{this.state.stars}</div>
        {this.state.stars && (
          <input
            onClick={() => this.postRating()}
            classname="inputSubmit"
            type="submit"
            id="submit"
          />
        )}
        <div className="info">
          <h2>
            average user rating:{" "}
            {isNaN(this.state.value) ? "" : this.state.value}
          </h2>
          <span>one</span>
          <progress value={`${this.state.one}`} max="10" />
          <span>two</span>
          <progress value={`${this.state.two}`} max="10" />
          <span>three</span>
          <progress value={`${this.state.three}`} max="10" />
          <span>four</span>
          <progress value={`${this.state.four}`} max="10" />
          <span>five</span>
          <progress value={`${this.state.five}`} max="10" />
          {!this.state.ratingInfo.length && <h2>no ratings</h2>}
        </div>
      </div>
    );
  }
}
