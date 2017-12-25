import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGame, setUserReadiness } from '../actions/index';
import Avatar from 'material-ui/Avatar';
import '../styles/Team.css';
import Button from '../components/Button';

class Team extends Component {
  componentDidMount() {
    const { socket, fetchGame } = this.props;
    fetchGame();

    socket.on('gameStarted', () => {
      fetchGame();
    });
  }

  renderTeam() {
    return (
      <ul className="team-member-list">
        {this.props.team.members.map(member => {
          return (
            <li key={member.name} className="team-member">
              <Avatar
                className="team-member-picture"
                src={member.picture}
                size={60}
              />
              <div className="team-member-name">{member.name}</div>
            </li>
          );
        })}
      </ul>
    );
  }

  handleButtonClick = () => {
    this.props.setUserReadiness(true);
  };

  render() {
    const { team, user, game } = this.props;

    return (
      <div>
        <h2 style={{ color: '#fff' }}>Команда</h2>
        {!user.isReady ? (
          <Button title="Я готов!" onClick={() => this.handleButtonClick()} />
        ) : !game.isStarted ? (
          <div className="game-waiting">Ожидайте начала игры...</div>
        ) : (
          <div>
            <div className="team-title">{team.name}</div>
            {team.members && this.renderTeam()}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ game, user, team }) {
  return {
    game,
    team,
    user
  };
}

export default connect(mapStateToProps, {
  fetchGame,
  setUserReadiness
})(Team);
