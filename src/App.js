import React, { Component } from "react";
import "./reset.css";
import "./App.css";
import axios from "axios";
import image from "./ronone.jpg";
import Rating from "./Rating";

class App extends Component {
  constructor() {
    super();
    this.state = {
      ip: "",
      quote: []
    };
  }
  componentDidMount() {
    axios.get("https://ip-api.io/api/json").then(session => {
      console.log(session);
      this.setState({ ip: session.data.ip });
    });
    axios
      .get("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
      .then(quote => {
        this.setState({ quote: quote.data[0] });
      });
  }
  size(selectedquote, check, value) {
    if (check === value) {
      this.setState({ quote: selectedquote });
    } else {
      this.setState({ quote: "loading..." });
      this.getQuote(check);
    }
  }
  checkLength(quote, length) {
    let quoteArray = quote.split(" ");
    let quoteLength = quoteArray.length;
    if (quoteLength <= 4) {
      this.size(quote, length, 4);
    } else if (quoteLength >= 5 && quoteLength <= 13) {
      this.size(quote, length, 5);
    } else if (quoteLength >= 13) {
      this.size(quote, length, 13);
    }
  }
  getQuote(size) {
    axios
      .get("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
      .then(quote => {
        this.checkLength(quote.data[0], size);
      });
  }
  render() {
    return (
      <div className="App">
        <div className="content">
          <img className="ron" src={image} alt="" />
          <div className="quote">
            <div>
              <button id="small" onClick={() => this.getQuote(4)}>
                Small
              </button>
              <button id="medium" onClick={() => this.getQuote(5)}>
                Medium
              </button>
              <button id="large" onClick={() => this.getQuote(13)}>
                Large
              </button>
              <h1>{this.state.quote}</h1>
              {this.state.quote && (
                <Rating quote={this.state.quote} ip={this.state.ip} />
              )}
            </div>
          </div>
        </div>
        <div className="footer" />
      </div>
    );
  }
}

export default App;
