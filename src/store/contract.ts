import type { JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber, Contract, ethers } from "ethers";
import { get, writable } from "svelte/store";

const ABI = [
  "function balanceOf(address owner) external view returns (uint256 balance)",
  "function safeMint(address to) public",
  "function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)",
  "function tokenURI(uint256 id) public view virtual returns (string memory)",
];

function buildContractsStore() {
  const contractStore = writable({
    contract: null as Contract,
    signer: null as JsonRpcSigner,
    signerAddress: null as string,
  });

  const { update } = contractStore;

  async function buildContract(signer: JsonRpcSigner) {
    const contract = new Contract(
      import.meta.env.VITE_CONTRACT_ADDRESS as string,
      ABI,
      signer
    );

    let signerAddress = await signer.getAddress();

    update(() => ({
      contract,
      signer,
      signerAddress,
    }));
  }

  async function balanceOf() {
    const { contract, signerAddress } = get(contractStore);

    let res = await contract.balanceOf(signerAddress);

    return Number(ethers.utils.formatEther(res));
  }

  async function safeMint() {
    const { contract, signerAddress } = get(contractStore);

    let tx = await contract.safeMint(signerAddress);
  }

  async function tokenOfOwnerByIndex() {
    const { contract, signerAddress } = get(contractStore);

    let tx = await contract.tokenOfOwnerByIndex(signerAddress, 0);

    let number = BigNumber.from(await tx);

    return number.toNumber();
  }

  async function tokenURI(id: number) {
    const { contract, signerAddress } = get(contractStore);

    let tx = await contract.tokenURI(id);

    console.log(tx);

    return tx;
  }

  return {
    buildContract,
    balanceOf,
    safeMint,
    tokenOfOwnerByIndex,
    tokenURI,
  };
}

const contractStore = buildContractsStore();

export default contractStore;
