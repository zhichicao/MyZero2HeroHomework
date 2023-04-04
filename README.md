# Zero2Hero训练营作业
## 第四周
使用Hardhat在BNB Testnet部署一套可升级的代理合约，至少包含常量，状态变量和读写状态变量的函数


代理合约
0x08a3C1aB768A6252f0Ba3150d85573CA74d599e8

初始实现合约
0x30dB511c5093C1133AcA0b2090323f9F1f944130

修改后的实现合约
0xD01A6Bf574461D4e16Ea881367e62A3666f69f99



## 流程

hardhat编译合约
```
npx hardhat compile


Compiled 2 Solidity files successfully
```

部署实现合约
```
% npx hardhat run scripts/deploy.js

Deploying ChangeNum...
ChangeNum deployed to: 0x30dB511c5093C1133AcA0b2090323f9F1f944130
```


合约验证
安装hardhat-etherscan插件
```
% npm install --save-dev @nomiclabs/hardhat-etherscan
% npx hardhat verify --network bscTest 0x30dB511c5093C1133AcA0b2090323f9F1f944130

Nothing to compile
Successfully submitted source code for contract
contracts/ChangeNum.sol:ChangeNum at 0x30dB511c5093C1133AcA0b2090323f9F1f944130
for verification on the block explorer. Waiting for verification result...

Successfully verified contract ChangeNum on Etherscan.
https://testnet.bscscan.com/address/0x30dB511c5093C1133AcA0b2090323f9F1f944130#code
```

设置代理合约，初始化时会把value设置为42
```
% npx hardhat run scripts/deploy_upgradeable.js   

Deploying Box...
ChangeNum deployed to: 0x08a3C1aB768A6252f0Ba3150d85573CA74d599e8
```
用命令行调用函数来查看参数，先查看合约的变量和常量，变量值为42，常量100，然后修改变量为45，查看常量值为45，验证成功。
```
% npx hardhat console
Welcome to Node.js v18.8.0.
Type ".help" for more information.
> const ChangeNum = await ethers.getContractFactory('ChangeNum');
undefined
> const changeNum = await ChangeNum.attach('0x08a3C1aB768A6252f0Ba3150d85573CA74d599e8')
undefined
> (await changeNum.retrieve()).toString();
'42'
> (await changeNum.getConstNum()).toString();
'100'
> await changeNum.setValue(45);
{
  hash: '0xe91070a9194980917e3a149ccbee2899623c4ad0ef11dd010764907eee1c71c2',
  type: 0,
  accessList: null,
  blockHash: null,
  blockNumber: null,
  transactionIndex: null,
  confirmations: 0,
  from: '0x5416CBB58e734FDfAEEeD3a576645ed934F640FC',
  gasPrice: BigNumber { value: "10000000000" },
  gasLimit: BigNumber { value: "30407" },
  to: '0x08a3C1aB768A6252f0Ba3150d85573CA74d599e8',
  value: BigNumber { value: "0" },
  nonce: 6,
  data: '0x55241077000000000000000000000000000000000000000000000000000000000000002d',
  r: '0x85e603bad8c7ade5e6680ed0b0885831ff440b624b16c8b46d4013c158ad9cf4',
  s: '0x70e95b557db508c2fbd19d25cbfa3676d902a87e7791db44a064ec1d68f7fce4',
  v: 229,
  creates: null,
  chainId: 97,
  wait: [Function (anonymous)]
}
> (await changeNum.retrieve()).toString();
'45'
```

合约升级,升级后尝试调用新增的increment,此时值从45变为46，查询发现数据正常，完成。
```
% npx hardhat run scripts/upgrade.js
Upgrading ChangeNum...
ChangeNum upgraded

% npx hardhat console
Welcome to Node.js v18.8.0.
Type ".help" for more information.
> const ChangeNumV2 = await ethers.getContractFactory('ChangeNumV2');
Uncaught SyntaxError: Identifier 'ChangeNumV2' has already been declared
> const ChangeNumNew = await ethers.getContractFactory('ChangeNumV2');
undefined
> const changeNumNew = ChangeNumNew.attach('0x08a3C1aB768A6252f0Ba3150d85573CA74d599e8')
undefined
> await changeNumNew.increment();
{
  hash: '0x491d6a143b0036dba078b0ec306835fb05f8c9a55aa7d54e1d331fbdf7ef9ddf',
  type: 0,
  accessList: null,
  blockHash: null,
  blockNumber: null,
  transactionIndex: null,
  confirmations: 0,
  from: '0x5416CBB58e734FDfAEEeD3a576645ed934F640FC',
  gasPrice: BigNumber { value: "10000000000" },
  gasLimit: BigNumber { value: "31154" },
  to: '0x08a3C1aB768A6252f0Ba3150d85573CA74d599e8',
  value: BigNumber { value: "0" },
  nonce: 9,
  data: '0xd09de08a',
  r: '0x81122d0d82de087ad4b5ce16eb816461e85758ddacbbf64df9ef2e8535b29c8e',
  s: '0x670d6928733d300edce838dcb8f29bd5862c5de02dd4c6d70ef63df7361f3fae',
  v: 230,
  creates: null,
  chainId: 97,
  wait: [Function (anonymous)]
}
> (await changeNew.retrieve()).toString();
Uncaught ReferenceError: changeNew is not defined
    at REPL40:1:40
> (await changeNumNew.retrieve()).toString();
'46'
```

## 第二周
### 1.部署ERC-20合约
代币名称：MyZero2HeroToken

代币缩写：HERO

总量：100000000

无税

合约：0xfab6daee2f1f9dd9511219fabb139092ffcf5978

部署链接
https://testnet.bscscan.com/tx/0x1e1e3dd9b49f10a9f043b5b0eb9d11b81b6c17054ac5e64d01df06beab0c0d9b

合约源码
https://testnet.bscscan.com/token/0xfab6daee2f1f9dd9511219fabb139092ffcf5978#code

在测试网的pancakeswap添加BNB-HERO池子并测试买卖
https://testnet.bscscan.com/tx/0xcafd56be3fc454eb0bc155795eb4e17a43fb6d02507a3f1c7d7b1b8d2935de64
https://testnet.bscscan.com/tx/0xdde59a0240deb79ea6cd8525c908b2311fd04fa3a6575967fe833eaa3477150d
https://testnet.bscscan.com/tx/0xe1571db1dad608c8f04de720355f24e56300a3171c2314a64913a0e533319ede

### 2.完成流动性挖矿合约的部署
fork了SushiToken和MasterChef合约

MasterChef

合约：0x4cc4d687ff6ca92e09d4abcce4e9dea0597c97cc

部署链接：
https://testnet.bscscan.com/tx/0x79b97f411b5e34d71c0995ee36cef0a43767e6ff2ae17864a06e9d67cf0eb607

MasterChef合约源码：
https://testnet.bscscan.com/address/0x4cc4d687ff6ca92e09d4abcce4e9dea0597c97cc#code

SushiToken

合约：0xefe545ab061943a5e49d993b6e450ec1b882947f

SushiToken部署链接：
https://testnet.bscscan.com/tx/0x0945dcb6aff0feb51c183d97784737a99dc2c70490c4ce2cecda6e250c779292

SushiToken合约源码：
https://testnet.bscscan.com/address/0xefe545ab061943a5e49d993b6e450ec1b882947f#code