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
      pickupData: true,
      dropoffData: true,
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
  handleDayOfWeek(event){
    this.setState({...this.state,
      dayOfWeek: event.target.value
    });
  },
  handleHourOfDay(event){
    this.setState({...this.state,
      hourOfDay: event.target.value
    });
  },
  toggleDropoffData(){
    this.setState({...this.state,
      dropoffData: !this.state.dropoffData
    });
  },
  togglePickupData(){
    this.setState({...this.state,
      pickupData: !this.state.pickupData
    });
  },
  render(){
    const {windowHeight, dayOfWeek, hourOfDay, pickupData, dropoffData} = this.state;
    return (
      <div className='App'>
        <Nav />
        <MapWrapper height={windowHeight - 61} />
        <Overlay
          dayOfWeek={dayOfWeek}
          dayOfWeekHandler={this.handleDayOfWeek}
          hourOfDay={hourOfDay}
          hourOfDayHandler={this.handleHourOfDay}
          pickupData={pickupData}
          togglePickupData={this.togglePickupData}
          dropoffData={dropoffData}
          toggleDropoffData={this.toggleDropoffData} />
      </div>
    );
  }
});

module.exports = App;
