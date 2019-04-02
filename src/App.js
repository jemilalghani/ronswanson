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
    axios.get("/api/session").then(session => {
      this.setState({ ip: session.data.split(":").pop() });
    });
    axios
      .get("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
      .then(quote => {
        this.setState({ quote: quote.data });
      });
  }
  small(selectedquote, check) {
    if (check === 4) {
      this.setState({ quote: selectedquote });
    } else {
      this.getQuote(check);
    }
  }
  medium(selectedquote, check) {
    if (check === 5) {
      this.setState({ quote: selectedquote });
    } else {
      this.getQuote(check);
    }
  }
  large(selectedquote, check) {
    if (check === 13) {
      this.setState({ quote: selectedquote });
    } else {
      this.getQuote(check);
    }
  }
  checkLength(quote, length) {
    let quoteArray = quote.split(" ");
    let quoteLength = quoteArray.length;
    if (quoteLength <= 4) {
      this.small(quote, length);
    } else if (quoteLength >= 5 && quoteLength <= 13) {
      this.medium(quote, length);
    } else if (quoteLength >= 13) {
      this.large(quote, length);
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
    console.log("viewhere", this.state);
    return (
      <div className="App">
        <div className="content">
          <img className="ron" src={image} alt="" />
          <div className="quote">
            <h1>{this.state.quote}</h1>
            <Rating />
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
            </div>
          </div>
        </div>
        <div className="footer" />
      </div>
    );
  }
}

export default App;
