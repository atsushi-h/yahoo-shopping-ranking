import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Ranking from './containers/Ranking';
import Nav from './containers/Nav';

class App extends Component {
  render() {
    return (
      <div className={App}>
        <Nav />

        <Route path="/all" component={Ranking} />
        <Route
          path="/category/:id"
          render={
            ({ match }) => <Ranking cateforyId={match.params.id} />
          }
        />
      </div>
    )
  }
}

export default App;
