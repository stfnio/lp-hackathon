import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchStations,
  fetchTeams,
  onTeamCompleteStation
} from '../actions/index';
import _ from 'lodash';
import Button from '../components/Button';
import '../styles/Station.css';

class Station extends Component {
  componentDidMount() {
    this.props.fetchStations();
    this.props.fetchTeams();
  }

  onTeamPassStation = (teamId, stationId) => {
    this.props.onTeamCompleteStation(teamId, stationId);
  };

  renderTeams(station) {
    return (
      <ul className="station-team-list">
        {_.map(this.props.teams, team => {
          return (
            <li key={team._id} className="station-team">
              <div className="station-team-name">{team.name}</div>
              <div
                className="station-team-button"
                onClick={() => {
                  this.onTeamPassStation(team._id, station._id);
                }}
              >
                Пройдено
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const { stations, user, teams } = this.props;
    const station = _.find(stations, { user: user._id });

    return (
      <div className="stations-page">
        <div className="station-name">Станция {station && station.name}</div>
        {this.renderTeams(station)}
      </div>
    );
  }
}

function mapStateToProps({ stations, user, teams }) {
  return {
    stations,
    user,
    teams
  };
}

export default connect(mapStateToProps, {
  fetchStations,
  fetchTeams,
  onTeamCompleteStation
})(Station);
