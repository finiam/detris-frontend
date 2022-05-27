enum ChainIds {
  "MAINNET" = 1,
  "TESTNET" = 4,
}

export function getCorrectChainId() {
  let env = import.meta.env.VITE_ENV;

  return env === "mainnet" ? ChainIds.MAINNET : ChainIds.TESTNET;
}

export function getChainWarning(currentId: number) {
  if (currentId === null) {
    return false;
  }

  let correctId = getCorrectChainId();

  if (correctId === ChainIds.MAINNET && currentId !== ChainIds.MAINNET) {
    return "You're on the wrong Ethereum chain! Please change to Mainnet";
  } else if (correctId === ChainIds.TESTNET && currentId !== ChainIds.TESTNET) {
    return "You're on the wrong Ethereum chain! Please change to the Rinkeby testnet";
  }
}
