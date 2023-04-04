const { ethers, upgrades } = require('hardhat');

async function main () {
  const ChangeNumV2 = await ethers.getContractFactory('ChangeNumV2');
  console.log('Upgrading ChangeNum...');
  await upgrades.upgradeProxy('0x08a3C1aB768A6252f0Ba3150d85573CA74d599e8', ChangeNumV2);
  console.log('ChangeNum upgraded');
}

main();