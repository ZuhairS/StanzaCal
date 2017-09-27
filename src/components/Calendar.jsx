import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import Event from './Event';


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
      <div className="calender-header" >
        <div id='calender-name'>{calendar.name}</div>
        <div id='calender-subscriber-count'>{calendar.subscriberCount}</div>
        <div>
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
