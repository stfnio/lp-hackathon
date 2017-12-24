import React, { Component } from 'react';
import '../styles/App.css';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import ShowPoints from '../components/ShowPoints';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { withRouter } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false
    };
  }

  toggleMenu = () =>
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });

  redirectHome = () => this.props.history.push('/home');

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
        />

        <Drawer
          docked={false}
          width={200}
          open={this.state.isMenuOpen}
          onRequestChange={isMenuOpen => this.setState({ isMenuOpen })}
        >
          <UserInfo user={this.props.user} />

          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>

        <div className="container">{this.props.children}</div>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default withRouter(connect(mapStateToProps)(App));
