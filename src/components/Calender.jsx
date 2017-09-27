import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';


class Calender extends Component {

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

const CALENDER_QUERY = gql`
  {
    calendar(shortname: "nfl-49ers") {
      name
      subscriberCount
    }
  }
`;

export default graphql(CALENDER_QUERY, { name: 'calenderQuery' }) (Calender);
