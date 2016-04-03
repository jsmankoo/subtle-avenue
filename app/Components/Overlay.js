import React, {createClass} from 'react';

const Overlay = createClass({
  render() {
    const {dayOfWeek, dayOfWeekHandler, hourOfDay, hourOfDayHandler, pickupData, togglePickupData, dropoffData, toggleDropoffData} = this.props;
    return (
      <div className="Overlay">
        <div className="Content">
          <div className="dayOfWeek">
            <div className="Text">
              Day of Week:
            </div>
            <input type='number' value={dayOfWeek} onChange={dayOfWeekHandler} />
          </div>
          <div className="hourOfDay">
            <div className="Text">
              Hour of Day:
            </div>
            <input type='number' value={hourOfDay} onChange={hourOfDayHandler} />
          </div>
          <div className={`PickOff ${pickupData}`} onClick={togglePickupData} >
            Pick Off
          </div>
          <div className={`DropOff ${dropoffData}`} onClick={toggleDropoffData} >
            Drop Off
          </div>
        </div>
      </div>
    );
  }
});

export default Overlay;
