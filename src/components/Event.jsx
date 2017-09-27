import React from 'react';

const Event = (props) => {

  const event = props.event.node;
  const eventImage = event.images.medium;

  const eventStartDateArr = event.dates.start.split(' ');
  // const eventEndDateArr = event.dates.end.split(' ');

  const eventStartWeekDay = eventStartDateArr[0];
  const eventStartMonth = eventStartDateArr[1];
  const eventStartDay = eventStartDateArr[2];
  const eventStartTime = convertTime(eventStartDateArr[4]);

  // const eventEndWeekDay = eventEndDateArr[0];
  // const eventEndMonth = eventEndDateArr[1];
  // const eventEndDay = eventEndDateArr[2];


  if (event) {
    return (
      <div className='event-box'>
        <img src={eventImage} alt="event background" />
        <div className='event-date'>{eventStartWeekDay} | {eventStartDay} {eventStartMonth}</div>
        <div className='event-name'>{event.name}</div>
        <div className='event-time'>{eventStartTime}</div>
      </div>
    );
  }

};

// Credits to HBP on StackOverflow
function convertTime (time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.slice(0,3).join('') + ' ' + time[5]; // return adjusted time or original string
}

export default Event;
