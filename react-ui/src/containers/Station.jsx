import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchStations,
  fetchTeams,
  teamCompleteStation
} from '../actions/index';
import _ from 'lodash';
import '../styles/Station.css';

class Station extends Component {
  componentDidMount() {
    this.props.fetchStations();
    this.props.fetchTeams();
  }

  onTeamCompleteStation = (team, stationId, rewardPoints) => {
    if (
      window.confirm(
        `Вы уверены, что хотите начислить ${
          team.name
        } - ${rewardPoints} баллов?`
      )
    ) {
      this.props.teamCompleteStation(team._id, stationId, rewardPoints);
    }
  };

  renderTeams(station) {
    const renderButtons = (team, station) => (
      <div className="station-team-buttons">
        <div
          className="station-team-button red"
          onClick={() => {
            this.onTeamCompleteStation(team, station._id, 50);
          }}
        >
          50
        </div>
        <div
          className="station-team-button yellow"
          onClick={() => {
            this.onTeamCompleteStation(team, station._id, 75);
          }}
        >
          75
        </div>
        <div
          className="station-team-button green"
          onClick={() => {
            this.onTeamCompleteStation(team, station._id, 100);
          }}
        >
          100
        </div>
      </div>
    );

    return (
      <ul className="station-team-list">
        {_.map(this.props.teams, team => {
          return (
            <li key={team._id} className="station-team">
              <div className="station-team-name">{team.name}</div>

              {station && _.includes(team.completedStations, station._id) ? (
                <div className="station-team-success">На 110%!</div>
              ) : (
                renderButtons(team, station)
              )}

              <hr />
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const { stations, user } = this.props;
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
  teamCompleteStation
})(Station);
