# Blockchain-Based Authentication System

A decentralized authentication system built on the Ethereum blockchain. This project allows users to register and verify their identity securely using smart contracts — eliminating the need for centralized databases and login systems.

Developed by **Rishi Kumar** using Solidity, Truffle, Ethers.js, and React.js, with MetaMask integration for secure, trustless authentication.

---

## 🚀 Key Features

- 🔐 **Decentralized Authentication** — Users register and verify identity via smart contracts.
- 🦊 **MetaMask Integration** — Secure login and account management through MetaMask.
- ⚙️ **Smart Contract-Based** — Entire logic resides on Ethereum, ensuring trust and transparency.
- 💡 **React.js Frontend** — Modern and responsive UI for seamless interaction.
- 📡 **Ethers.js Integration** — Lightweight, secure connection between frontend and blockchain.
- 🧪 **Ganache Support** — Simulate local Ethereum blockchain for testing.

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React.js                            |
| Blockchain | Solidity ^0.8.6, Ethereum           |
| Tooling    | Truffle Framework, Ganache          |
| Web3 Comm  | Ethers.js                           |
| Wallet     | MetaMask                            |

---

## 📁 Project Structure

```
blockchain-based-authentication/
│
├── contracts/              # Solidity smart contracts
│   └── Auth.sol
│
├── migrations/             # Truffle deployment scripts
│
├── client/                 # React.js frontend
│   ├── src/
│   │   ├── components/
│   │   └── App.js
│   └── package.json
│
├── test/                   # Smart contract test cases
├── truffle-config.js       # Truffle configuration
└── README.md
```

---

## 🧪 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Rishiafk/Blockchain-Authentication.git
cd Blockchain-Authentication
```

### 2. Install Backend & Frontend Dependencies

```bash
npm install         # Install Truffle-related dependencies
cd client
npm install         # Install React.js frontend dependencies
```

### 3. Start Local Ethereum Blockchain

- Launch **Ganache**.
- Create a new workspace or use Quickstart.
- Ensure your Ganache network settings match those in `truffle-config.js`.

### 4. Compile & Deploy Smart Contracts

```bash
cd ..
truffle compile
truffle migrate
```

> 🔔 Make sure MetaMask is connected to your Ganache network (e.g., http://127.0.0.1:7545).

### 5. Start the React Frontend

```bash
cd client
npm start
```

---

## 🔒 Smart Contract Example

```solidity
// Auth.sol
pragma solidity ^0.8.0;

contract Auth {
    mapping(address => bool) public registeredUsers;

    function register() public {
        require(!registeredUsers[msg.sender], "Already registered");
        registeredUsers[msg.sender] = true;
    }

    function isRegistered(address user) public view returns (bool) {
        return registeredUsers[user];
    }
}
```


## 🤝 Contributing

Contributions are welcome! Feel free to fork the project, open issues, and submit pull requests.

---

## 💡 Future Improvements

- ✅ Add role-based access for admin/user
- 🔐 Integration with IPFS for identity proof storage
- 🌐 Deploy to a public Ethereum testnet (Goerli or Sepolia)
- 📲 Add mobile wallet support

---

## 📌 Notes

- Ensure MetaMask is installed and unlocked.
- Avoid using Web3.js — this project uses **Ethers.js** for cleaner, safer integration.
