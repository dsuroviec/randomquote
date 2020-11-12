import React, { useEffect, useState } from "react";

const App = () => {
  //initialize state containing data from API, initialze it because it says cant read 0 of undefined without initial text
  const [quote, setQuote] = useState([]);

  //tells react it needs to rerender after it fetches the data?
  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setQuote(data);
      });
  }, []);

  //produce a random number to use in the index from fetched api
  const randomNum = () => Math.floor(Math.random() * quote.length);
  //initialize state to store random number
  const [quoteIndex, setQuoteIndex] = useState(randomNum);

  //event handler updates index state every time it is clicked
  const handleClick = (e) => {
    setQuoteIndex(randomNum());
  };

  if (!quote.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container" id="quote-box">
      <div className="quote-box">
        <h1 className="quote" id="text">
          {quote[quoteIndex].text}
        </h1>
        <a id="tweet-quote" href="twitter.com/intent/tweet" target="_blank">
          Tweet It!
        </a>
      </div>
      <div className="btnDiv">
        <button id="new-quote" onClick={handleClick}>
          Generate a Quote
        </button>
        <p id="author">~{quote[quoteIndex].author || "Anon"}</p>
      </div>
    </div>
  );
};

export default App;
