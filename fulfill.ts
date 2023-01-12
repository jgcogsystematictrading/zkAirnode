import * as ethers from "ethers";
import { deriveSponsorWalletAddress, deriveAirnodeXpub } from '@api3/airnode-admin';
import { HardhatRuntimeEnvironment } from "hardhat/types";
const HDWallet = require('ethereum-hdwallet')
console.log('hello')
// An example that will call the Requester Contract and will make a full request
const provider = new ethers.providers.JsonRpcProvider('https://zksync2-testnet.zksync.dev');
const airnodeAbiJson = [
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
// DERIVING THE PATH OF THE SPONSOR WALLET
// ADD IN THE ADDRESS OF THE REQUESTER CONTRACT
const requesterAddressTest = "0xC6002691DDc5317213C9788668AbE02212424C22";
const deriveWalletPathFromSponsorAddress = (sponsorAddress: string, protocolId) => {
    const sponsorAddressBN = ethers.BigNumber.from(ethers.utils.getAddress(sponsorAddress));
    const paths : string[] = [];
    for (let i = 0; i < 6; i++) {
      const shiftedSponsorAddressBN = sponsorAddressBN.shr(31 * i);
      paths.push(shiftedSponsorAddressBN.mask(31).toString());
    }
    return `${protocolId}/${paths.join('/')}`;
  };

// Getting the private key of the sponsor Wallet from the Airnode Mnemonic
const hdwallet = HDWallet.fromMnemonic("sea little door spare swim filter lawn match hurry stove garbage oven")
console.log(`0x${hdwallet.derive(`m/44'/60'/0'/${deriveWalletPathFromSponsorAddress(requesterAddressTest, 1)}`).getAddress().toString('hex')}`)
const PKEYsponsorWallet = (hdwallet.derive(`m/44'/60'/0'/${deriveWalletPathFromSponsorAddress(requesterAddressTest, 1)}`).getPrivateKey().toString('hex'))
const airnodeWalletKey = (hdwallet.derive(`m/44'/60'/0'/${deriveWalletPathFromSponsorAddress("0x6A7F359d025aE2ebdC36E594F633b39a02Bfe88C", 1)}`).getPrivateKey().toString('hex'))
console.log('airnode pkey')
console.log(airnodeWalletKey)
// An example of a deploy script that will deploy and call a simple contract.
//export default async function (hre: HardhatRuntimeEnvironment) {
  async function main(){
console.log(`Running deploy script for the Requester contract`);

// Initialize the wallets.

    const sponsorWallet = new ethers.Wallet(PKEYsponsorWallet)
    const airnodeWallet = new ethers.Wallet("08a8f96e6626e261bffdeeecd61e500e4bbdd79bf131334320f2646780da5777")
    const signer = provider.getSigner(sponsorWallet.address)
    const wallet = new ethers.Wallet(PKEYsponsorWallet);
    const signer2 = provider.getSigner(wallet.address)

    const rrpAddress = "0xbD5263fa8c93Deb3417d49E63b444cBd541922FD";
    //const _rrpContract = hre.artifacts.readArtifactSync("AirnodeRrpV0")
    const rrpContract = new ethers.Contract(rrpAddress, airnodeAbiJson, signer2);

    const airnode = "0x6A7F359d025aE2ebdC36E594F633b39a02Bfe88C"
    const sponsor = "0xC6002691DDc5317213C9788668AbE02212424C22";
    const endpointId = "0xfd19ee2c054da313208b4a6106c336286fc6a9f72dd5d0bc8619c018c384c74a";
    const airnodeXpub = "xpub6DUz9nJVxJpVieSaBesGdwRgdznuPe875cczeg6HE1RoN7Hzm9Dsty8i8T5h4ZQzm4ShkwCkT2VXwnJETQH4XjGHY6bbKdqypLin7wrxoHY";
    const sponsorWalletAddress = deriveSponsorWalletAddress(airnodeXpub, airnode, sponsor);
    const encodedParams = "0x315353535353000000000000000000000000000000000000000000000000000071756572790000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000160737562677261706800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002006170695f6b65790000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002605f7061746800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a05f7479706500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002e000000000000000000000000000000000000000000000000000000000000000627b6d61726b6574706c616365732866697273743a203529207b6964206e616d6520736c7567206e6574776f726b7d20636f6c6c656374696f6e732866697273743a203529207b6964206e616d652073796d626f6c20746f74616c537570706c797d7d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002c41776f78455a6269574c7676366533516476644d5a773457445552644762765066486d5a5263384470667a39000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000203837626165376336663163323665373932303966383635326337343566666162000000000000000000000000000000000000000000000000000000000000001e646174612e636f6c6c656374696f6e732e322e746f74616c537570706c7900000000000000000000000000000000000000000000000000000000000000000006696e743235360000000000000000000000000000000000000000000000000000";
    console.log(`Sponsor Wallet Address: ${sponsorWalletAddress}`);


    const sample_data = 123;
    // ADD IN YOUR REQUEST ID
    const requestId = '0x711fac7eca2266c0ce24806df2a1e38545aab4935647ccaf1eff9ade205c1d5c';
    const data = ethers.utils.defaultAbiCoder.encode(['int256'], [sample_data]);
    console.log(`Sample Data Encoded: ${data}`);
    async function getSignature(){
        const signature = await airnodeWallet.signMessage(
            ethers.utils.arrayify(
            ethers.utils.keccak256(
                ethers.utils.solidityPack(['bytes32', 'uint256'], [requestId, data])
            )
            ),
        );
      return signature;
        }
    const signature = await getSignature();
    console.log(`Signature: ${signature}`)
    const fulfillFunctionId = "0x7c1de7e1";

    const fulfill = await rrpContract.fulfill(
        requestId,
        airnode,
        requesterAddressTest,
        fulfillFunctionId,
        data,
        signature
        , {gasLimit:2000000}
    );
    await sponsorWallet.sendTransaction(fulfill);

    // console.log(provider.getTransactionReceipt(fulfill.hash))

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });