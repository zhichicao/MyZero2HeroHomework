// scripts/deploy.js
async function main () {
    // We get the contract to deploy
    const ChangeNum = await ethers.getContractFactory('ChangeNum');
    console.log('Deploying ChangeNum...');
    const changeNum = await ChangeNum.deploy();
    await changeNum.deployed();
    console.log('ChangeNum deployed to:', changeNum.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });