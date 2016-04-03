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
    var socket = io('/');
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
  render(){
    const {windowHeight, dayOfWeek, hourOfDay} = this.state;
    return (
      <div className='App'>
        <Nav />
        <MapWrapper height={windowHeight - 61} />
        const  = this.props;
        <Overlay
          dayOfWeek={dayOfWeek}
          dayOfWeekHandler={this.handleDayOfWeek}
          hourOfDay={hourOfDay}
          hourOfDayHandler={this.handleHourOfDay}
          pickupData={true}
          togglePickupData={()=>{}}
          dropoffData={true}
          toggleDropoffData={()=>{}}/>
      </div>
    );
  }
});

module.exports = App;
