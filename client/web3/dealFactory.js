import { ethers } from "ethers";
import provider from "./provider";

const address = "0x7956329905cE786AA256E2f3F79bb4B51f80C681";

const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "issuer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "dealAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "_participants",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_gistId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_gistHash",
        type: "string",
      },
    ],
    name: "DealCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_participants",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_gistId",
        type: "string",
      },
      {
        internalType: "string",
        name: "_gistHash",
        type: "string",
      },
    ],
    name: "issue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "issuedDeals",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const dealFactory = new ethers.Contract(address, abi, provider); //TODO: написать подключенное состояние dealFactory используя address, abi, provider

export default dealFactory;
