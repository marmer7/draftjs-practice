import React, { Component } from "react";
import "./App.css";
import MyEditor from "./MyEditor";
import TweetEditorExample from "./TweetEditorExample";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyEditor />
        <TweetEditorExample />
      </div>
    );
  }
}

export default App;
