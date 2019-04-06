import React, { Component } from "react";
import Layout from "./components/Layout";

// To start the application use "npm run react" in one terminal window and "npm run server" in another
// Take the IP from the npm run react window and replace 3000 with 5000
// Set that as the socketUrl in layout

class App extends Component {
  render() {
    return <Layout title="Chat App" />;
  }
}

export default App;
