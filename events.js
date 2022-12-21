require('dotenv').config();
const ethers = require('ethers');

Web3 = require("web3");
airnodeAbiJson = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "templateId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "airnode",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "endpointId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "parameters",
        "type": "bytes"
      }
    ],
    "name": "CreatedTemplate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "airnode",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "requestId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "errorMessage",
        "type": "string"
      }
    ],
    "name": "FailedRequest",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "airnode",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "requestId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "FulfilledRequest",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "airnode",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sponsor",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "withdrawalRequestId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sponsorWallet",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "FulfilledWithdrawal",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "airnode",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "requestId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "requesterRequestCount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "requester",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "endpointId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sponsor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sponsorWallet",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "fulfillAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes4",
        "name": "fulfillFunctionId",
        "type": "bytes4"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "parameters",
        "type": "bytes"
      }
    ],
    "name": "MadeFullRequest",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "airnode",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "requestId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "requesterRequestCount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "requester",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "templateId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sponsor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sponsorWallet",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "fulfillAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes4",
        "name": "fulfillFunctionId",
        "type": "bytes4"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "parameters",
        "type": "bytes"
      }
    ],
    "name": "MadeTemplateRequest",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "airnode",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sponsor",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "withdrawalRequestId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sponsorWallet",
        "type": "address"
      }
    ],
    "name": "RequestedWithdrawal",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "sponsor",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "requester",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "sponsorshipStatus",
        "type": "bool"
      }
    ],
    "name": "SetSponsorshipStatus",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "authorizers",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "airnode",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "requestId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "endpointId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "sponsor",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "requester",
        "type": "address"
      }
    ],
    "name": "checkAuthorizationStatus",
    "outputs": [
      {
        "internalType": "bool",
        "name": "status",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "authorizers",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "airnode",
        "type": "address"
      },
      {
        "internalType": "bytes32[]",
        "name": "requestIds",
        "type": "bytes32[]"
      },
      {
        "internalType": "bytes32[]",
        "name": "endpointIds",
        "type": "bytes32[]"
      },
      {
        "internalType": "address[]",
        "name": "sponsors",
        "type": "address[]"
      },
      {
        "internalType": "address[]",
        "name": "requesters",
        "type": "address[]"
      }
    ],
    "name": "checkAuthorizationStatuses",
    "outputs": [
      {
        "internalType": "bool[]",
        "name": "statuses",
        "type": "bool[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "airnode",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "endpointId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "parameters",
        "type": "bytes"
      }
    ],
    "name": "createTemplate",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "templateId",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "requestId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "airnode",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "fulfillAddress",
        "type": "address"
      },
      {
        "internalType": "bytes4",
        "name": "fulfillFunctionId",
        "type": "bytes4"
      },
      {
        "internalType": "string",
        "name": "errorMessage",
        "type": "string"
      }
    ],
    "name": "fail",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "requestId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "airnode",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "fulfillAddress",
        "type": "address"
      },
      {
        "internalType": "bytes4",
        "name": "fulfillFunctionId",
        "type": "bytes4"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "name": "fulfill",
    "outputs": [
      {
        "internalType": "bool",
        "name": "callSuccess",
        "type": "bool"
      },
      {
        "internalType": "bytes",
        "name": "callData",
        "type": "bytes"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "withdrawalRequestId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "airnode",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "sponsor",
        "type": "address"
      }
    ],
    "name": "fulfillWithdrawal",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32[]",
        "name": "templateIds",
        "type": "bytes32[]"
      }
    ],
    "name": "getTemplates",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "airnodes",
        "type": "address[]"
      },
      {
        "internalType": "bytes32[]",
        "name": "endpointIds",
        "type": "bytes32[]"
      },
      {
        "internalType": "bytes[]",
        "name": "parameters",
        "type": "bytes[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "airnode",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "endpointId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "sponsor",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "sponsorWallet",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "fulfillAddress",
        "type": "address"
      },
      {
        "internalType": "bytes4",
        "name": "fulfillFunctionId",
        "type": "bytes4"
      },
      {
        "internalType": "bytes",
        "name": "parameters",
        "type": "bytes"
      }
    ],
    "name": "makeFullRequest",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "requestId",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "templateId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "sponsor",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "sponsorWallet",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "fulfillAddress",
        "type": "address"
      },
      {
        "internalType": "bytes4",
        "name": "fulfillFunctionId",
        "type": "bytes4"
      },
      {
        "internalType": "bytes",
        "name": "parameters",
        "type": "bytes"
      }
    ],
    "name": "makeTemplateRequest",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "requestId",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "requestId",
        "type": "bytes32"
      }
    ],
    "name": "requestIsAwaitingFulfillment",
    "outputs": [
      {
        "internalType": "bool",
        "name": "isAwaitingFulfillment",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "airnode",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "sponsorWallet",
        "type": "address"
      }
    ],
    "name": "requestWithdrawal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "requesterToRequestCountPlusOne",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "requester",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "sponsorshipStatus",
        "type": "bool"
      }
    ],
    "name": "setSponsorshipStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "sponsorToRequesterToSponsorshipStatus",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "sponsorToWithdrawalRequestCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "templates",
    "outputs": [
      {
        "internalType": "address",
        "name": "airnode",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "endpointId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "parameters",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
web3 = new Web3('https://zksync2-testnet.zksync.dev');
var airnodeContract = new web3.eth.Contract(airnodeAbiJson, '0xbD5263fa8c93Deb3417d49E63b444cBd541922FD');


async function main() {


  console.log('chexcking events...');

var i;
var END_BLOCK = 4327700;
        //var END_BLOCK =  await web3.eth.getBlockNumber();
for (i = 0; i < 1; i++) {

   console.log(END_BLOCK);
      events = await airnodeContract.getPastEvents("AllEvents",
                    {

              fromBlock: END_BLOCK -1000,

                   toBlock: END_BLOCK});
        //              console.log(events[0]);
        //
        END_BLOCK = END_BLOCK - 1000;
                                      console.log(events);
}
//  console.log('Request fulfilled');
//      const requestId = '0x7d3d5dc246040d62a917ee5e7cb26e3fcb901fb821f92a09c694171c9cd840ab';
//  console.log(`${coinId} price is ${(await exampleClient.fulfilledData(requestId)) / 1e6} USD`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });