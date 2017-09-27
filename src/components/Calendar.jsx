import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';


class Calendar extends Component {

  render() {

    const calendarQuery = this.props.calendarQuery;
    const calendar = calendarQuery.calendar;

    if (calendarQuery && calendarQuery.loading) {
      return (
        <div>Fetching data...</div>
      );
    }
    console.log(calendarQuery);
    return (
      <div>
        <div>{calendar.name}</div>
        <div>{calendar.subscriberCount}</div>
      </div>
    );

  }
}

const CALENDAR_QUERY = gql`
  {
    calendar(shortname: "nfl-49ers") {
      name
      subscriberCount
    }
  }
`;

export default graphql(CALENDAR_QUERY, { name: 'calendarQuery' })(Calendar);
