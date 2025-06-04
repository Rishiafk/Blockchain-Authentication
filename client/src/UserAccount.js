import React, { Component } from 'react';

class UserAccount extends Component {
  state = {
    balance: 0
  };

  getBalance = async () => {
    const { contract, account } = this.props;
    const balance = await contract.methods.getBalance().call({ from: account });
    this.setState({ balance });
  }

  sendTransaction = async () => {
    const { contract, account } = this.props;
    await contract.methods.setBalance(100).send({ from: account });
    // After sending transaction, maybe refresh balance
    await this.getBalance();
  }

  render() {
    return (
      <div>
        <h2>User Account</h2>
        <p>Balance: {this.state.balance}</p>
        <button onClick={this.getBalance}>Get Balance</button>
        <button onClick={this.sendTransaction}>Set Balance to 100</button>
      </div>
    );
  }
}

export default UserAccount;
