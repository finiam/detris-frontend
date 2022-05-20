import type { JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber, Contract, ethers } from "ethers";
import { get, writable } from "svelte/store";

const DETRIS_ABI = [
  "function tokenURI(uint256 tokenId) public view virtual returns (string memory)",
  "function balanceOf(address owner) public view returns (uint256 balance)",
];

const EXTENSION_ABI = [
  "function mint(bytes32[] calldata merkleProof) external payable",
  "function getMintedTokensAmount() external view returns (uint256)",
];

const DETRIS_ADDRESS = import.meta.env.VITE_DETRIS_CONTRACT as string;
const EXTENSION_ADDRESS = import.meta.env.VITE_EXTENSION_CONTRACT as string;

function buildContractsStore() {
  const store = writable({
    baseContract: null as Contract,
    extensionContract: null as Contract,
    signer: null as JsonRpcSigner,
    signerAddress: null as string,
    message: "",
  });

  const { update, subscribe } = store;

  async function buildContracts(signer: JsonRpcSigner) {
    const baseContract = new Contract(DETRIS_ADDRESS, DETRIS_ABI, signer);

    const extensionContract = new Contract(
      EXTENSION_ADDRESS,
      EXTENSION_ABI,
      signer
    );

    let signerAddress = await signer.getAddress();

    update(() => ({
      baseContract,
      extensionContract,
      signer,
      signerAddress,
      message: "",
    }));
  }

  async function getBalance() {
    const { baseContract, signerAddress } = get(store);

    let tx = await baseContract.balanceOf(signerAddress);    

    return BigNumber.from(await tx).toNumber();
  }

  async function getTokenId() {
    // TODO: get token by address

    return null;
  }

  async function getTokenURI(id: number) {
    if (!id) return null;

    const { baseContract } = get(store);

    return baseContract.tokenURI(id);
  }

  async function mint() {
    const { extensionContract } = get(store);

    const merkleProof = ethers.utils.formatBytes32String("");
    const payableAmount = ethers.utils.parseEther("0").toString();

    let tx = (await extensionContract.mint([merkleProof], {
      value: payableAmount,
    })) as ethers.providers.TransactionResponse;

    await tx.wait();
  }

  return {
    subscribe,
    buildContracts,
    getBalance,
    mint,
    getTokenId,
    getTokenURI,
  };
}

const contractStore = buildContractsStore();

export default contractStore;
