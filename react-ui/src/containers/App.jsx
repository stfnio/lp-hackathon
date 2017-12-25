import React, { Component } from 'react';
import '../styles/App.css';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import ShowPoints from '../components/ShowPoints';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { withRouter } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import Divider from 'material-ui/Divider';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import {
  BottomNavigation,
  BottomNavigationItem
} from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';
import { logOutUser, setUserReadiness } from '../actions/index';

const rewards = <FontIcon className="material-icons">card_giftcard</FontIcon>;
const team = <FontIcon className="material-icons">group</FontIcon>;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false,
      selectedAppSectionIndex: null
    };
  }

  componentDidMount() {
    if (this.props.location.pathname === '/rewards') {
      this.setState({ selectedAppSectionIndex: 0 });
    } else if (this.props.location.pathname === '/team') {
      this.setState({ selectedAppSectionIndex: 1 });
    }
  }

  toggleMenu = () =>
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });

  redirectHome = () => {
    this.setState({ selectedAppSectionIndex: null });

    this.props.history.push('/home');
  };

  redirectToRewards = () => {
    this.setState({ selectedAppSectionIndex: 0 });

    this.props.history.push('/rewards');
  };

  redirectToTeam = () => {
    this.setState({ selectedAppSectionIndex: 1 });

    this.props.history.push('/team');
  };

  onClickQuit = () => {
    this.props.logOutUser(() => {
      this.props.history.push('/login');
    });

    this.props.setUserReadiness(false);
  };

  render() {
    return (
      <div className="App">
        <AppBar
          title="Loyalty game"
          iconElementRight={
            <div className="user-balance">
              <ShowPoints points={this.props.user.balance} size={25} />
            </div>
          }
          onLeftIconButtonClick={this.toggleMenu}
          onTitleClick={this.redirectHome}
          style={{ position: 'absolute' }}
        />

        <Drawer
          docked={false}
          width={200}
          open={this.state.isMenuOpen}
          onRequestChange={isMenuOpen => this.setState({ isMenuOpen })}
        >
          <UserInfo user={this.props.user} />
          <Divider />
          <MenuItem
            primaryText="Выйти"
            leftIcon={<Exit />}
            onClick={this.onClickQuit}
          />
        </Drawer>

        <div className="container">{this.props.children}</div>

        <BottomNavigation
          style={{ position: 'fixed', bottom: 0 }}
          selectedIndex={this.state.selectedAppSectionIndex}
        >
          <BottomNavigationItem
            label="Награды"
            icon={rewards}
            onClick={() => this.redirectToRewards()}
          />
          <BottomNavigationItem
            label="Команда"
            icon={team}
            onClick={() => this.redirectToTeam()}
          />
        </BottomNavigation>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default withRouter(
  connect(mapStateToProps, { logOutUser, setUserReadiness })(App)
);
