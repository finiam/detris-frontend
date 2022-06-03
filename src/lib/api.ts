import request, { gql } from "graphql-request";

async function getTokenSupply() {
  try {
    const { detrises } = await request(
      import.meta.env.VITE_THEGRAPH_URL,
      gql`
        query {
          detrises(first: 1) {
            currentSupply
            maxSupply
          }
        }
      `
    );

    const supply =
      Number(detrises[0].maxSupply) - Number(detrises[0].currentSupply);

    return supply;
  } catch (err) {
    console.log(err);

    return 0;
  }
}

async function getTokenByOwner(address: string) {
  try {
    const { assets } = await request(
      import.meta.env.VITE_THEGRAPH_URL,
      gql`
        query tokenByOwner($address: Bytes!) {
          assets(where: { owner: $address }) {
            tokenId
          }
        }
      `,
      {
        address,
      }
    );

    return assets?.[0].tokenId || false;
  } catch (err) {
    console.log(err);

    return 0;
  }
}

export { getTokenSupply, getTokenByOwner };
