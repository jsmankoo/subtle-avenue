import React, {createClass} from 'react';

import styles from './Stylus/app.styl';

import Nav from './Components/Nav';
import MapWrapper from './Components/MapWrapper';
import Overlay from './Components/Overlay';

const App = createClass({
  getInitialState(){
    return {
      windowHeight: $(window).height(),
      dayOfWeek: 1,
      hourOfDay: 0,
      TrafficData: [],
      uberData:[]
    };
  },
  componentDidMount(){
    $(window).resize(()=>this.setState({...this.state,
      windowHeight: $(window).height()
    }));
    var socket = io('http://localhost:3000/');
    socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
  },
  render(){
    const {windowHeight} = this.state;
    return (
      <div className='App'>
        <Nav />
        <MapWrapper height={windowHeight - 61} />
        <Overlay />
      </div>
    );
  }
});

module.exports = App;
