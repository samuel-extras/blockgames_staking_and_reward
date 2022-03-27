const main = async () => {
  const StakingAndReward = await hre.ethers.getContractFactory(
    "StakingAndReward"
  );
  const stakingAndReward = await StakingAndReward.deploy();

  await stakingAndReward.deployed();

  console.log("Staking contract deployed to: ", stakingAndReward.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
