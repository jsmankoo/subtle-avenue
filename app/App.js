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
      uberData:{pickup:[], dropoff:[]}
    };
  },
  componentDidMount(){
    const {dayOfWeek, hourOfDay} = this.state;

    $(window).resize(()=>this.setState({...this.state,
      windowHeight: $(window).height()
    }));

    $.get(`/api/uber/${dayOfWeek}/${hourOfDay}/pickup`).then((data)=>{
      this.setState({...this.state,
        uberData: {...this.state.uberData,
          pickup: data
        }
      });
    });

    $.get(`/api/uber/${dayOfWeek}/${hourOfDay}/dropoff`).then((data)=>{
      this.setState({...this.state,
        uberData: {...this.state.uberData,
          dropoff: data
        }
      });
    });

    var socket = io('http://localhost:3000/');
    socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });

  },
  handleDayOfWeek(event){
    const {dayOfWeek, hourOfDay} = this.state;

    this.setState({...this.state,
      dayOfWeek: event.target.value
    });
    $.get(`/api/uber/${event.target.value}/${hourOfDay}/pickup`).then((data)=>{
      this.setState({...this.state,
        uberData: {...this.state.uberData,
          pickup: data
        }
      });
    });

    $.get(`/api/uber/${event.target.value}/${hourOfDay}/dropoff`).then((data)=>{
      this.setState({...this.state,
        uberData: {...this.state.uberData,
          dropoff: data
        }
      });
    });
  },
  handleHourOfDay(event){
    const {dayOfWeek, hourOfDay} = this.state;

    this.setState({...this.state,
      hourOfDay: event.target.value
    });

    $.get(`/api/uber/${dayOfWeek}/${event.target.value}/pickup`).then((data)=>{
      console.log(`grabbing Hour`);
      this.setState({...this.state,
        uberData: {...this.state.uberData,
          pickup: data
        }
      });
    });

    $.get(`/api/uber/${dayOfWeek}/${event.target.value}/dropoff`).then((data)=>{
      console.log(`grabbing Hour`);
      this.setState({...this.state,
        uberData: {...this.state.uberData,
          dropoff: data
        }
      });
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
    const {windowHeight, dayOfWeek, hourOfDay, pickupData, dropoffData, uberData} = this.state;
    return (
      <div className='App'>
        <Nav />
        <MapWrapper height={windowHeight - 61}
          uberData={uberData}
          pickupData={pickupData}
          dropoffData={dropoffData}/>
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
