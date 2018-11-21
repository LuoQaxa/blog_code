import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HOC from "./hoc";


class App extends Component {
  render() {
    return (
    <Router>
      <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/hoc">HOC</Link>
              </li>
              <li>
                <Link to="/renderProps">renderProps</Link>
              </li>
              <li>
                <Link to="/hooks">hooks</Link>
              </li>
            </ul>
          </nav>

          <Route path="/hoc" exact component={HOC} />
          {/* <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} /> */}
      </div>
    </Router>
    );
  }
}

export default App;
