import type { JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber, Contract, ethers } from "ethers";
import { get, writable } from "svelte/store";
import walletStore from "./wallet";

const DETRIS_ABI = [
  "function balanceOf(address owner) external view returns (uint256 balance)",
  "function safeMint(address to) public",
  "function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)",
  "function tokenURI(uint256 id) public view virtual returns (string memory)",
  "function setApprovalForAll(address operator, bool approved) public",
  "function isApprovedForAll(address owner, address operator) external view returns (bool)",
];

const L1_ABI = ["function deposit(uint256 _tokenId) public override"];

const L2_ABI = [
  "function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)",
  "function withdraw(uint256 _tokenId) external override onlyInitialized",
];

const ENDGAME_ABI = ["function safeMint(string memory uri) public"];

const DETRIS_ADDRESS = import.meta.env.VITE_DETRIS_ADDRESS as string;
const L1_ADDRESS = import.meta.env.VITE_L1_ADDRESS as string;
const L2_ADDRESS = import.meta.env.VITE_L2_ADDRESS as string;
const ENDGAME_ADDRESS = import.meta.env.VITE_ENDGAME_ADDRESS as string;

function buildContractsStore() {
  const contractStore = writable({
    detrisContract: null as Contract,
    l1Contract: null as Contract,
    l2Contract: null as Contract,
    endGameContract: null as Contract,
    signer: null as JsonRpcSigner,
    signerAddress: null as string,
    message: "",
  });

  const { update, subscribe } = contractStore;

  async function buildContract(signer: JsonRpcSigner) {
    const detrisContract = new Contract(DETRIS_ADDRESS, DETRIS_ABI, signer);
    const l1Contract = new Contract(L1_ADDRESS, L1_ABI, signer);
    const l2Contract = new Contract(L2_ADDRESS, L2_ABI, signer);
    const endGameContract = new Contract(ENDGAME_ADDRESS, ENDGAME_ABI, signer);

    let signerAddress = await signer.getAddress();

    update(() => ({
      detrisContract,
      l1Contract,
      endGameContract,
      l2Contract,
      signer,
      signerAddress,
      message: "",
    }));
  }

  async function balanceOf() {
    const { l2Contract, signerAddress } = get(contractStore);

    let res = await l2Contract.tokenOfOwnerByIndex(signerAddress, 0);

    return Number(ethers.utils.formatEther(res));
  }

  async function safeMint() {
    const { detrisContract, signerAddress } = get(contractStore);

    walletStore.setLoading(true);

    let tx = (await detrisContract.safeMint(
      signerAddress
    )) as ethers.providers.TransactionResponse;

    await tx.wait();

    await walletStore.updateBalance();

    bridgeToken();

    walletStore.setLoading(false);
  }

  async function bridgeToken() {
    const { l1Contract, detrisContract, signerAddress } = get(contractStore);

    let tokenId = await tokenOfOwnerByIndex();

    const isApproved = await detrisContract.isApprovedForAll(
      signerAddress,
      L1_ADDRESS
    );

    if (!isApproved) {
      await detrisContract.setApprovalForAll(L1_ADDRESS, false);
    }

    await l1Contract.deposit(tokenId);

    update((store) => ({
      ...store,
      message: "Please change to Optimistic Kovan",
    }));
  }

  async function tokenOfOwnerByIndex() {
    const { detrisContract, signerAddress } = get(contractStore);

    let tx = await detrisContract.tokenOfOwnerByIndex(signerAddress, 0);

    let number = BigNumber.from(await tx);

    console.log(number);

    return number.toNumber();
  }

  async function tokenURI(id: number) {
    const { l1Contract } = get(contractStore);

    let tx = await l1Contract.tokenURI(id);

    return tx;
  }

  async function getTokenFromL2() {
    const { l2Contract, detrisContract, signerAddress } = get(contractStore);

    let id = await l2Contract.tokenOfOwnerByIndex(signerAddress, 0);
    const tx = await l2Contract.withdraw(id);

    await tx.wait();

    let tokenTx = await detrisContract.tokenURI(id);

    return tokenTx;
  }

  async function mintGameState() {
    const { endGameContract } = get(contractStore);

    /* let tx = await endGameContract.safeMint(id); */
  }

  return {
    buildContract,
    balanceOf,
    safeMint,
    tokenOfOwnerByIndex,
    tokenURI,
    bridgeToken,
    subscribe,
    getTokenFromL2,
  };
}

const contractStore = buildContractsStore();

export default contractStore;
