import Authentication from "./contracts/Authentication.json";

const Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Authentication.networks[networkId];

    // Check if the contract was deployed to the correct network
    if (!deployedNetwork) {
        alert("Contract is not deployed to the current network.");
        return null; // You can also throw an error here if you prefer
    }

    return new web3.eth.Contract(
        Authentication.abi,
        deployedNetwork.address
    );
};

export default Contract;
