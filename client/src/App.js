import React, { Component } from "react";
import Web3 from "web3"; // Use Web3 directly for Ganache
import Contract from './Contract';
import Formate from './utils/Formate';
import 'semantic-ui-css/semantic.min.css';
import { Menu, Divider } from "semantic-ui-react";
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import Home from './components/Home';
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import UserAccount from './components/UserAccount';
import "./App.css";

class App extends Component {
  state = {
    web3: null,
    account: null,
    contract: null,
    balance: null,
    activeItem: 'home',
    signedUp: false,
    loggedIn: false,
    username: ''
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name, color: 'teal' });

  componentDidMount = async () => {
    try {
      // Modern dapp browsers (MetaMask)
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        const contract = await Contract(web3);
        this.setState({ web3, account: accounts[0], contract }, this.start);
      }
      // Legacy dapp browsers
      else if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider);
        const accounts = await web3.eth.getAccounts();
        const contract = await Contract(web3);
        this.setState({ web3, account: accounts[0], contract }, this.start);
      }
      // Fallback to Ganache local node
      else {
        try {
          const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
          const accounts = await web3.eth.getAccounts();
          const contract = await Contract(web3);
          this.setState({ web3, account: accounts[0], contract }, this.start);
        } catch (error) {
          console.error("Ganache connection failed", error);
        }
      }
    } catch (error) {
      alert('Failed to load Web3');
      console.error(error);
    }
  };

  start = async () => {
    await this.getAccount();
    const { web3, contract, account } = this.state;
    console.log("web3 =", web3);
    console.log("Contract =", contract);
    console.log("Account =", account);
  };

  getAccount = async () => {
    const { web3 } = this.state;

    if (web3) {
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      this.setState({
        account: accounts[0],
        balance: Formate(web3.utils.fromWei(balance, 'ether'))
      });
    }
  };

  accountCreated = async (signedUp) => {
    this.setState({ signedUp });
  };

  userSignedIn = async (loggedIn, username) => {
    this.setState({ loggedIn, username });
  };

  loggedOut = async (loggedIn) => {
    this.setState({ loggedIn });
  };

  render() {
    const { activeItem, color, web3, loggedIn } = this.state;

    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="App">
        <div className="main-page">
          <BrowserRouter>
            <div className="home-nav">
              <Menu stackable inverted secondary size='large'>
                <Menu.Item
                  name='home'
                  color={color}
                  active={activeItem === 'home'}
                  onClick={this.handleItemClick}
                  as={Link}
                  to='/'
                />
                <Menu.Item
                  name='help'
                  color={color}
                  active={activeItem === 'help'}
                  onClick={this.handleItemClick}
                  as={Link}
                  to='/help'
                />
                {loggedIn ? (
                  <Menu.Item
                    position='right'
                    name='user account'
                    color={color}
                    active={activeItem === 'user account'}
                    onClick={this.handleItemClick}
                    as={Link}
                    to='/user-account'
                  />
                ) : null}
                {!loggedIn ? (
                  <Menu.Item
                    position='right'
                    name='sign in'
                    color={color}
                    active={activeItem === 'sign in'}
                    onClick={this.handleItemClick}
                    as={Link}
                    to='/sign-in'
                  />
                ) : null}
                {loggedIn ? (
                  <Menu.Item
                    name='sign out'
                    color='red'
                    active={activeItem === 'sign out'}
                    onClick={this.handleItemClick}
                    as={Link}
                    to='/sign-out'
                  />
                ) : (
                  <Menu.Item
                    name='sign up'
                    color={color}
                    active={activeItem === 'sign up'}
                    onClick={this.handleItemClick}
                    as={Link}
                    to='/sign-up'
                  />
                )}
              </Menu>
            </div>
            <Divider inverted />

            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/help'>
                Help page
              </Route>

              {loggedIn ? (
                <Route path='/user-account'>
                  <UserAccount
                    account={this.state.account}
                    username={this.state.username}
                  />
                </Route>
              ) : (
                <Route path='/user-account'>
                  You have been logged out
                </Route>
              )}

              <Route path='/sign-in'>
                {loggedIn ? (
                  <Redirect to='/user-account' />
                ) : (
                  <SignIn
                    web3={web3}
                    contract={this.state.contract}
                    account={this.state.account}
                    signedUp={this.state.signedUp}
                    userSignedIn={this.userSignedIn}
                  />
                )}
              </Route>

              {loggedIn ? (
                <Route path='/sign-out'>
                  <SignOut loggedOut={this.loggedOut} />
                  You've been logged out
                  <br /> Thank you
                </Route>
              ) : (
                <Route path='/sign-up'>
                  <SignUp
                    web3={web3}
                    contract={this.state.contract}
                    account={this.state.account}
                    accountCreated={this.accountCreated}
                  />
                </Route>
              )}
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
