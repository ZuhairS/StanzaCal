import React, { Component } from 'react';


export default class Calender extends Component {

  render() {
    const calender = this.props.calender;

    return (
      <div>
        <div>{calender.name}</div>
        <div>{calender.subscriberCount}</div>
      </div>
    );
    
  }
}
