import type { JsonRpcSigner } from "@ethersproject/providers";
import { Contract, ethers } from "ethers";
import { get, writable } from "svelte/store";

/* "function mint(address to, uint256 amount, uint256 _tokenType) public virtual", */

const ABI = [
  "function balanceOf(address owner) external view returns (uint256 balance)",
  /* "function mint(address to, uint256 amount) public virtual", */
];

function buildContractsStore() {
  const contractStore = writable({
    contract: null as Contract,
    signer: null as JsonRpcSigner,
  });

  const { update } = contractStore;

  function buildContract(signer: JsonRpcSigner) {
    const contract = new Contract(
      import.meta.env.VITE_CONTRACT_ADDRESS as string,
      ABI,
      signer
    );

    update(() => ({
      contract,
      signer,
    }));
  }

  async function balanceOf() {
    const { contract, signer } = get(contractStore);

    let res = await contract.balanceOf(await signer.getAddress());

    return Number(ethers.utils.formatEther(res));
  }

  /* async function mint() {
    const { contract, signer } = get(contractStore);

    let res = await contract.balanceOf(await signer.getAddress());

    
  } */

  return {
    buildContract,
    balanceOf,
  };
}

const contractStore = buildContractsStore();

export default contractStore;
