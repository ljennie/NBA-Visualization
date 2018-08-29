import React, { Component } from 'react';

import { TopNavBar} from "./TopNavBar";
import {Main} from "./Main";
import {SearchBar} from "./SearchBar";

/*
var promise = new promise(function(receive, reject)) {
    // dome some stuff
    resolve(// data)
}
promise.then( success_callback, failure_callback )
promise.then( success_callback )
promise.catch( error_callback)

promise.then( success_callback1, failure_callback1 )
promise.then( success_callback2, failure_callback2 )

promise = nba.stats.playerInfo({PlayerID: 201939}).
then(function(data) {return 'success';}.then(function(resp) {console.log(resp);});
 */
class App extends Component {
  render() {
    return (
      <div className="App">
          <TopNavBar/>
          <Main/>
      </div>
    );
  }
}

export default App;

/*
App
 - TopNavBar
 - Main
    - Profile
    - DataViewContainer
      - ShortChart
      - CounterSlider
 */
