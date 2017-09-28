import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import Event from './Event';
import logo from '../logo.png';


class Calendar extends Component {

  render() {

    const calendarQuery = this.props.calendarQuery;
    const calendar = calendarQuery.calendar;

    if (calendarQuery && calendarQuery.loading) {
      return (
        <div>Fetching calendar...</div>
      );
    } else if (calendarQuery && calendarQuery.error) {
      return (
        <div>Error</div>
      );
    }

    const events = calendar.upcomingEvents.edges;

    return (
      <div className='App-header'>
        <div className="calendar-header" >
          <div className="App-logo">
            <img src={logo}  alt="logo" />
          </div>
          <div id='calendar-name'>{calendar.name}</div>
          <div id='calendar-subscriber-count'>{calendar.subscriberCount} Subscribers</div>
        </div>
        <div className='event-list'>
          {events.map((event, index) => {
            return <Event key={index} event={event} />;
          })}
        </div>
      </div>
    );

  }
}

const CALENDAR_QUERY = gql`
  {
    calendar(shortname: "nfl-49ers") {
      name
      subscriberCount

      upcomingEvents: events(first: 10, filterBy: {past: false}) {
        edges {
          node {
            name

            dates {
              start
              end
              allDay
            }

            images {
              medium
            }
          }
        }
      }
    }

  }
`;

export default graphql(CALENDAR_QUERY, { name: 'calendarQuery' })(Calendar);
