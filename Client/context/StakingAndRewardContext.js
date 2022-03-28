import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const StakingAndRewardContext = React.createContext();

let metamask;

if (typeof window !== "undefined") {
  metamask = window.ethereum;
}

export const StakingAndRewardProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState({
    addressTo: "",
    amount: "",
  });
  const [contract, setContract] = useState();
  const [amountTransfered, setAmountTransfered] = useState("");
  const [staked, setStaked] = useState();
  const [amountStake, setAmountStake] = useState("");
  const [amountClaimed, setAmountClaimed] = useState("");
  const [claimedModal, setClaimedModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [balanceBeforeReward, setBalanceBeforeReward] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [reload, setReload] = useState(false);
  const [showBalances, setShowBalances] = useState(false);
  const [transferedModal, setTransferedModal] = useState(false);
  const [stakedModal, setStakedModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleStake = (e) => {
    setAmountStake(e.target.value);
  };

  useEffect(() => {
    createTokenContract();
    if (!currentAccount) return;
    if (currentAccount) {
      getTotalBalance();
      getStakedCoin();
      getBalance();
    }
  }, [currentAccount, reload]);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const createTokenContract = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const stakingAndRewardContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    setContract(stakingAndRewardContract);
    return stakingAndRewardContract;
  };

  const addTokenToMetamask = async () => {
    const tokenAddress = contractAddress;
    const tokenSymbol = "STK";
    const tokenDecimals = 18;
    const tokenImage =
      "https://images.pexels.com/photos/1431158/pexels-photo-1431158.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&dpr=1";
    try {
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });

      if (wasAdded) {
        console.log("Thanks for your interest!");
      } else {
        console.log("Your loss!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return;
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const disonnected = () => {
    if (window.ethereum.isConnected()) {
      return;
    } else {
      window.location.reload();
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return;
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0]);
        console.log(addressArray[0]);
        let storedAccount =
          JSON.parse(window.localStorage.getItem("accounts")) || [];
        console.log(storedAccount);
        let accounts = storedAccount;
        if (accounts.includes(addressArray[0])) {
          return;
        } else {
          console.log(addressArray[0]);
          accounts.push(addressArray[0]);
          console.log(accounts);
          window.localStorage.setItem("accounts", JSON.stringify(accounts));
          addTokenToMetamask();
        }

        //...
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalBalance = async () => {
    if (!window.ethereum) return;

    try {
      if (window.ethereum) {
        const _balance = await contract.balanceOf(currentAccount);
        const numBalance = ethers.BigNumber.from(_balance._hex);
        setTotalBalance(parseInt(numBalance));
      } else {
      }
    } catch (error) {
      console.log(error);

      // throw new Error(error.message);
    }
  };

  const getBalance = async () => {
    if (!window.ethereum) return;

    try {
      if (window.ethereum) {
        const _balance = await contract.spendable();
        const numBalance = ethers.BigNumber.from(_balance._hex);

        setBalance(parseInt(numBalance));
      } else {
      }
    } catch (error) {
      console.log(error);

      // throw new Error(error.message);
    }
  };
  const getStakedCoin = async () => {
    if (!window.ethereum) return;

    try {
      if (window.ethereum) {
        const stakedCoin = await contract.lockedCoin();
        const numStaked = ethers.BigNumber.from(stakedCoin);

        setStaked(parseInt(numStaked));
      } else {
      }
    } catch (error) {
      console.log(error);

      // throw new Error(error.message);
    }
  };
  const claimReward = async () => {
    if (!window.ethereum) return;

    try {
      if (window.ethereum) {
        const rewardClaimed = await contract.claimReward();
        setIsLoading(true);
        setBalanceBeforeReward(balance);
        let txConfirm = await rewardClaimed.wait();
        console.log(`Success: reward claimed`);
        alert("Reward Claimed successfully");
        getBalance();
        setIsLoading(false);
        getTotalBalance();
        setAmountClaimed(Number(balance) - Number(balanceBeforeReward));
        setClaimedModal(true);
        setReload(!reload);
      } else {
      }
    } catch (error) {
      setAlertMessage(error?.error?.message || "something went wrong");
      setAlert(true);
      console.log(error);
    }
  };
  const transferToken = async () => {
    if (!window.ethereum) return;

    try {
      if (window.ethereum) {
        const { addressTo, amount } = formData;
        const parsedAmount = ethers.utils.parseEther(amount);

        setIsLoading(true);
        setAmountTransfered(amount);

        const transfer = await contract.transfer(addressTo, parsedAmount);
        let txConfirm = await transfer.wait();

        console.log(`Success`);
        alert("Transfer Successful");
        setIsLoading(false);
        setformData({
          addressTo: "",
          amount: "",
        });
        setTransferedModal(true);
        setReload(!reload);

        console.log(transfer);
      } else {
      }
    } catch (error) {
      console.log(error);
      setAlertMessage(error?.error?.message || "something went wrong");
      setAlert(true);

      // throw new Error(error.message);
    }
  };
  const stakeToken = async () => {
    if (!window.ethereum) return;

    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const amount = amountStake;
        const parsedAmount = ethers.utils.parseEther(amount);

        setIsLoading(true);

        const stake = await contract.stake(parsedAmount);

        let txConfirm = await stake.wait();
        console.log(stake);
        console.log(`Success`);
        alert("stake successful");
        setIsLoading(false);
        setAmountStake(0);
        setStakedModal(true);
        setReload(!reload);

        console.log(transfer);
      } else {
      }
    } catch (error) {
      console.log(error);
      setAlertMessage(error?.error?.message || "something went wrong");
      setAlert(true);

      // throw new Error(error.message);
    }
  };

  return (
    <StakingAndRewardContext.Provider
      value={{
        connectWallet,
        currentAccount,
        isLoading,
        handleChange,
        formData,
        getTotalBalance,
        getStakedCoin,
        claimReward,
        transferToken,
        handleChange,
        balance,
        staked,
        handleStake,
        amountStake,
        stakeToken,
        setShowBalances,
        showBalances,
        amountTransfered,
        transferedModal,
        setTransferedModal,
        setAmountTransfered,
        stakedModal,
        totalBalance,
        amountClaimed,
        claimedModal,
        alert,
        setAlert,
        alertMessage,
      }}
    >
      {children}
    </StakingAndRewardContext.Provider>
  );
};
