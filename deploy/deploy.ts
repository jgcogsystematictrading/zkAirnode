import { utils, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the Airnode RRP`);

  // Initialize the wallet.
  const wallet = new Wallet("<WALLET-PRIVATE-KEY>");

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("AirnodeRrpV0");

  // Deposit some funds to L2 in order to be able to perform L2 transactions.
  const depositAmount = ethers.utils.parseEther("0.001");
  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: utils.ETH_ADDRESS,
    amount: depositAmount,
  });
  // Wait until the deposit is processed on zkSync
  await depositHandle.wait();

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  const rrpContract = await deployer.deploy(artifact, []);

  // Show the contract info.
  const contractAddress = rrpContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);

  // deploy a requester contract and point it at the rrp contract
  const requesterArtifact = await deployer.loadArtifact("Requester");
  const requesterContract = await deployer.deploy(requesterArtifact, [contractAddress]);
  const requesterAddress = requesterContract.address;
  console.log(`${requesterArtifact.contractName} was deployed to ${requesterAddress}`);

}
