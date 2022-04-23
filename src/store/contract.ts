import type { JsonRpcSigner } from "@ethersproject/providers";
import { Contract } from "ethers";
import { writable } from "svelte/store";

function buildContractsStore() {
  const contractStore = writable({
    contract: null,
  });

  function buildContract(signer: JsonRpcSigner) {
    const ct = new Contract(
      import.meta.env.CONTRACT_ADDRESS as string,
      "",
      signer
    );
  }
} 
