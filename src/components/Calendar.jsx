import React, { Component } from 'react';
import { graphql, gql, withApollo } from 'react-apollo';
import Event from './Event';
import logo from '../logo.png';


class Calendar extends Component {

  // constructor() {
  //   super();
  //   this.state = {
  //     calendar: {},
  //     searchText: ''
  //   };
  // }

  // async handleSearch() {
  //   const { searchText } = this.state
  //   const result = await this.props.client.query({
  //     query: CALENDAR_QUERY,
  //     variables: { searchText }
  //   })
  //   const { calendar } = result.data;
  //   this.setState({ calendar });
  // }

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
          <div id='search-bar'>
            <div>
              Search
              <input
                type='text'
                onChange={(e) => this.setState({ searchText: e.target.value })}
              />
            <button onClick={() => this.handleSearch()}>
                OK
              </button>
            </div>
          </div>
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

      upcomingEvents: events(first: 15) {
        edges {
          node {
            name

            dates {
              start
              end
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

export default withApollo(
  graphql(
    CALENDAR_QUERY,
    { name: 'calendarQuery' }
  )(Calendar));
