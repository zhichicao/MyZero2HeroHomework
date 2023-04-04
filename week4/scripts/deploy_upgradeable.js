// scripts/deploy_upgradeable_box.js
const { ethers, upgrades } = require('hardhat');

async function main () {
  const ChangeNum = await ethers.getContractFactory('ChangeNum');
  console.log('Deploying Box...');
  const changeNum = await upgrades.deployProxy(ChangeNum, [42], { initializer: 'init' });
  await changeNum.deployed();
  console.log('ChangeNum deployed to:', changeNum.address);
}

main();