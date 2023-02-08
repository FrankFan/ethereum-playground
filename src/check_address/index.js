const { ethers } = require('ethers');

async function isContract(address) {
  const provider = new ethers.providers.InfuraProvider('goerli');
  const code = await provider.getCode(address);
  return code !== '0x';
}

(async () => {
  console.log(await isContract('0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'));
  console.log(await isContract('0xfe5849df2ce69a48b80f54d4c0011f78ff9aa39a'));
})();
