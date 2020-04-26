import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppState } from './store/root'
import { connect } from 'react-redux'
import { updateSignInStatus, setSignInListener } from './store/user';
import SignedIn from './components/SignedIn';
import SignedOut from './components/SignedOut';

type appProps = {
  isSignedIn: boolean,
  updateSignInStatus: Function,
  setSignInListener: Function,
}

const mapStateToProps = (state: AppState) => ({ isSignedIn: state.user.isSignedIn });
const mapDispatchToProps = { updateSignInStatus, setSignInListener }


class App extends React.Component<appProps, {}> {

  componentDidMount() {
    this.props.setSignInListener(this.props.updateSignInStatus)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            {this.props.isSignedIn ? <SignedIn /> : <SignedOut />}
          </div>
        </header>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
