const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // How do we prove to the server we're on the nice list?
  // By giving a merkle proof of our name in the nice list 

  const name = "Ms. Nina Gulgowski";
  const merkleTree = new MerkleTree(niceList);
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  const { data: message } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name
  });

  console.log({ message });
}

main();