import { Fragment, useContext } from "react";
import { Popover, Transition, Menu } from "@headlessui/react";
import { StakingAndRewardContext } from "../context/StakingAndRewardContext";
import {
  FaWallet,
  FaBars,
  FaCalculator,
  FaHandHoldingUsd,
  FaTimesCircle,
} from "react-icons/fa";

import Modal from "./Modal";
import Alert from "./Alert";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const {
    currentAccount,
    connectWallet,
    handleChange,
    formData,
    isLoading,
    getBalance,
    getStakedCoin,
    claimReward,
    transferToken,
    balance,
    staked,
    handleStake,
    amountStake,
    stakeToken,
    showBalances,
    setShowBalances,
    amountTransfered,
    transferedModal,
    setTransferedModal,
    stakedModal,
    setStakedModal,
    totalBalance,
    claimedModal,
    setClaimedModal,
    amountClaimed,
    alertMessage,
    setAlert,
    alert,
  } = useContext(StakingAndRewardContext);

  const handleSubmit = (e) => {
    const { addressTo, amount } = formData;

    e.preventDefault();

    if (!addressTo || !amount) return;

    transferToken();
  };
  const handleSaked = (e) => {
    e.preventDefault();

    if (!amountStake) return;

    stakeToken();
  };

  const showAllBalance = () => {
    setShowBalances(true);
  };

  return (
    <>
      <div className="relative bg-white overflow-hidden z-5">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <Popover>
              <div className="pt-6 px-4 sm:px-6 lg:px-8 ">
                <nav
                  className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                  aria-label="Global"
                >
                  <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                    <div className="flex items-center justify-between w-full md:w-auto">
                      <a href="#">
                        <span className="sr-only">Blockgames</span>
                        <h1 className="h-8 w-auto sm:h-10 text-indigo-600 text-3xl font-extrabold">
                          Blockgames
                        </h1>
                      </a>
                      <div className="-mr-2 flex items-center md:hidden">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Open main menu</span>

                          <FaBars className="block h-6 w-6" />
                        </Popover.Button>
                      </div>
                    </div>
                  </div>
                  <div className="hidden self-center md:block md:ml-10 md:pr-4 md:space-x-8">
                    {currentAccount && (
                      <button className="font-medium text-gray-500 hover:text-gray-900 flex">
                        <FaWallet className="fa-solid fa-wallet h-6 w-6 mr-2" />
                        {`${currentAccount.slice(
                          0,
                          4
                        )}... ${currentAccount.slice(-4)}`}
                      </button>
                    )}
                    {!currentAccount && (
                      <button
                        onClick={() => connectWallet()}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Connect Wallet
                      </button>
                    )}
                  </div>
                </nav>
              </div>

              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute z-50 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                >
                  <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="px-5 pt-4 flex items-center justify-between">
                      <div>
                        <h1 className="h-8 w-auto text-xl font-extrabold text-indigo-600">
                          Blockgames
                        </h1>
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close main menu</span>

                          <FaTimesCircle className="block h-6 w-6" />
                        </Popover.Button>
                      </div>
                    </div>
                    {currentAccount && (
                      <div className="px-2  pb-3 space-y-1">
                        <FaWallet className="fa-solid fa-wallet h-6 w-6 mr-2" />

                        <button className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                          {`${currentAccount.slice(
                            0,
                            4
                          )}... ${currentAccount.slice(-4)}`}
                        </button>
                      </div>
                    )}
                    {!currentAccount && (
                      <button
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => connectWallet()}
                      >
                        Connect Wallet
                      </button>
                    )}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
            {!currentAccount && (
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">STK Blockgames</span>{" "}
                    <span className="block text-indigo-600 xl:inline">
                      What is Blockgames?
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    A highly competitive game competition focusing on blockchain
                    technology and how to leverage it for solving real life
                    problems.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                        Get started
                      </button>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <button
                        onClick={() => connectWallet()}
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                      >
                        Connect Wallet
                      </button>
                    </div>
                  </div>
                </div>
              </main>
            )}
          </div>
        </div>
        {!currentAccount && (
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
              src="https://images.unsplash.com/photo-1624996379671-b4d0837e45cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dG9rZW58ZW58MHx8MHx8&auto=format&fit=crop&w=2850&q=80"
              alt=""
            />
          </div>
        )}
      </div>
      {currentAccount && (
        <>
          {alert && (
            <Alert message={alertMessage} onClose={() => setAlert(false)} />
          )}
          <div className="-mx-2 md:flex">
            <div className="w-full md:w-1/3 px-2">
              <div className="rounded-lg shadow-sm mb-4">
                <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                  <div className="px-3 pt-8 pb-10 text-center relative z-10">
                    <h4 className="text-sm uppercase text-gray-500 leading-tight">
                      Staked Token
                    </h4>
                    <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">
                      {Number(staked) / 1000000000000000000} STK
                    </h3>
                    <p className="text-xs text-red-500  leading-tight">
                      Not Spendable
                    </p>
                  </div>
                  <div className="absolute bottom-0 inset-x-0">
                    <canvas id="chart1" height="70"></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-2">
              <div className="rounded-lg shadow-sm mb-4">
                <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                  <div className="px-3 pt-8 pb-10 text-center relative z-10">
                    <h4 className="text-sm uppercase text-gray-500 leading-tight">
                      Token Balance
                    </h4>
                    <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">
                      {Number(balance) / 1000000000000000000} STK
                    </h3>
                    <p className="text-xs text-green-500 leading-tight">
                      Spendable
                    </p>
                  </div>
                  <div className="absolute bottom-0 inset-x-0">
                    <canvas id="chart2" height="70"></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-2">
              <div className="rounded-lg shadow-sm mb-4">
                <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                  <div className="px-3 pt-8 pb-10 text-center relative z-10">
                    <h4 className="text-sm uppercase text-gray-500 leading-tight">
                      Reward
                    </h4>
                    <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">
                      Weekly
                    </h3>
                    <p className="text-xs text-green-500 leading-tight">
                      ▲ 1.00% of Staked
                    </p>
                  </div>
                  <div className="absolute bottom-0 inset-x-0">
                    <canvas id="chart3" height="70"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex lg:ml-4 ">
            <span className="sm:ml-3 mr-1">
              <button
                type="button"
                onClick={() => showAllBalance()}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaCalculator className="-ml-1 mr-2 h-3 w-3  " />
                Show Balance
              </button>
            </span>
            <span className="sm:ml-3 mr-1">
              <button
                type="button"
                onClick={() => claimReward()}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaHandHoldingUsd className="-ml-1 mr-2 h-3 w-3  " />
                Claim Reward
              </button>
            </span>
          </div>
          <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Transfer coin to another wallet address
                </h2>
                <div className="mt-2 text-center text-sm text-gray-600">
                  <div className="font-medium text-indigo-600 hover:text-indigo-500">
                    confirm wallet address before proceed
                  </div>
                </div>
              </div>
              <form className="mt-4 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm ">
                  <div className="my-4">
                    <label htmlFor="email-address" className="sr-only">
                      Address To
                    </label>
                    <input
                      id="address-to"
                      name="addressTo"
                      type="text"
                      value={formData.addressTo}
                      required
                      className="appearance-none relative block w-full px-2 py-3 border rounded border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Recipient Address"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Amount
                    </label>
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      step="0.0001"
                      value={formData.amount}
                      required
                      className="appearance-none relative block w-full px-2 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Amount"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>

                {isLoading ? (
                  <div></div>
                ) : (
                  <div>
                    <button
                      type="submit"
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Send
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Stake Token
                </h2>
                <div className="mt-2 text-center text-sm text-gray-600">
                  <div className="font-medium text-indigo-600 hover:text-indigo-500">
                    Note: staked token(s) are not spendable
                  </div>
                </div>
              </div>
              <form className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="amount" className="sr-only">
                      Amount
                    </label>
                    <input
                      id="amount"
                      name="coin-amount"
                      type="number"
                      value={amountStake}
                      required
                      onChange={(e) => handleStake(e)}
                      className="appearance-none relative block w-full px-2 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Amount"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    onClick={(e) => {
                      handleSaked(e);
                    }}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Stake
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Modal
            header="Token Balances"
            icon="fa-fa-cash"
            message1={`You have ${staked / 1000000000000000000} tokens staked `}
            message2={`You have ${
              balance / 1000000000000000000
            } spendable tokens`}
            message3={`You have ${
              totalBalance / 1000000000000000000
            } tokens in total`}
            handleOpenClose={showBalances}
            handlClose={() => setShowBalances(false)}
          />
          <Modal
            header="Transfer Successful"
            message1={`${amountTransfered} has been transfered successfully`}
            icon="fa-fa-cash"
            handleOpenClose={transferedModal}
            handlClose={() => setTransferedModal(false)}
          />
          <Modal
            header="Skake Successful"
            message1={`${amountStake} has been staked successfully, claim 1% reward of staked amount everyweek `}
            icon="fa-fa-cash"
            handleOpenClose={stakedModal}
            handlClose={() => setStakedModal(false)}
          />
          <Modal
            header="Reward Claimed"
            message1={`${amountClaimed} SKT reward has been claimed successfully , spendable balance is now ${balance} `}
            icon="fa-fa-cash"
            handleOpenClose={claimedModal}
            handlClose={() => setClaimedModal(false)}
          />
        </>
      )}
    </>
  );
};
export default Header;
