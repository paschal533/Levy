/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  NFTMarketplace,
  NFTMarketplaceInterface,
} from "../NFTMarketplace";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "sold",
        type: "bool",
      },
    ],
    name: "MarketItemCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "createMarketSale",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "createToken",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchItemsListed",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "sold",
            type: "bool",
          },
        ],
        internalType: "struct NFTMarketplace.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchMarketItems",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "sold",
            type: "bool",
          },
        ],
        internalType: "struct NFTMarketplace.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchMyNFTs",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "sold",
            type: "bool",
          },
        ],
        internalType: "struct NFTMarketplace.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getListingPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "resellToken",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_listingPrice",
        type: "uint256",
      },
    ],
    name: "updateListingPrice",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040526658d15e176280006009553480156200001c57600080fd5b50604080518082018252601081526f4d657461766572736520546f6b656e7360801b6020808301918252835180850190945260048452631351551560e21b9084015281519192916200007191600091620000a2565b50805162000087906001906020840190620000a2565b5050600a80546001600160a01b031916331790555062000185565b828054620000b09062000148565b90600052602060002090601f016020900481019282620000d457600085556200011f565b82601f10620000ef57805160ff19168380011785556200011f565b828001600101855582156200011f579182015b828111156200011f57825182559160200191906001019062000102565b506200012d92915062000131565b5090565b5b808211156200012d576000815560010162000132565b600181811c908216806200015d57607f821691505b602082108114156200017f57634e487b7160e01b600052602260045260246000fd5b50919050565b6126b880620001956000396000f3fe60806040526004361061018b5760003560e01c806372b3b620116100d6578063be9af5361161007f578063e219fc7511610059578063e219fc7514610428578063e75722301461043b578063e985e9c51461046b57600080fd5b8063be9af536146103bc578063c41a360a146103cf578063c87b56dd1461040857600080fd5b8063a5c42ef1116100b0578063a5c42ef114610374578063ae677aa314610389578063b88d4fde1461039c57600080fd5b806372b3b6201461032c57806395d89b411461033f578063a22cb4651461035457600080fd5b8063202e37401161013857806345f8fa801161011257806345f8fa80146102d75780636352211e146102ec57806370a082311461030c57600080fd5b8063202e37401461028257806323b872dd1461029757806342842e0e146102b757600080fd5b8063095ea7b311610169578063095ea7b31461021f5780630f08efe01461024157806312e855851461026357600080fd5b806301ffc9a71461019057806306fdde03146101c5578063081812fc146101e7575b600080fd5b34801561019c57600080fd5b506101b06101ab366004612361565b6104b4565b60405190151581526020015b60405180910390f35b3480156101d157600080fd5b506101da610551565b6040516101bc919061253b565b3480156101f357600080fd5b506102076102023660046123ef565b6105e3565b6040516001600160a01b0390911681526020016101bc565b34801561022b57600080fd5b5061023f61023a366004612338565b61067d565b005b34801561024d57600080fd5b506102566107af565b6040516101bc91906124bf565b34801561026f57600080fd5b506009545b6040519081526020016101bc565b34801561028e57600080fd5b50610256610963565b3480156102a357600080fd5b5061023f6102b236600461224a565b610b55565b3480156102c357600080fd5b5061023f6102d236600461224a565b610bdc565b3480156102e357600080fd5b50610256610bf7565b3480156102f857600080fd5b506102076103073660046123ef565b610de9565b34801561031857600080fd5b506102746103273660046121fe565b610e74565b61027461033a366004612399565b610f0e565b34801561034b57600080fd5b506101da610f50565b34801561036057600080fd5b5061023f61036f3660046122fe565b610f5f565b34801561038057600080fd5b50610274610f6e565b61023f6103973660046123ef565b610f7e565b3480156103a857600080fd5b5061023f6103b7366004612285565b611003565b61023f6103ca3660046123ef565b611091565b3480156103db57600080fd5b506102076103ea3660046123ef565b6000908152600b60205260409020600201546001600160a01b031690565b34801561041457600080fd5b506101da6104233660046123ef565b6111f9565b61023f610436366004612407565b61138c565b34801561044757600080fd5b506102746104563660046123ef565b6000908152600b602052604090206003015490565b34801561047757600080fd5b506101b0610486366004612218565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982167f80ac58cd00000000000000000000000000000000000000000000000000000000148061051757506001600160e01b031982167f5b5e139f00000000000000000000000000000000000000000000000000000000145b8061054b57507f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b92915050565b606060008054610560906125bd565b80601f016020809104026020016040519081016040528092919081815260200182805461058c906125bd565b80156105d95780601f106105ae576101008083540402835291602001916105d9565b820191906000526020600020905b8154815290600101906020018083116105bc57829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b03166106615760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b600061068882610de9565b9050806001600160a01b0316836001600160a01b031614156107125760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f72000000000000000000000000000000000000000000000000000000000000006064820152608401610658565b336001600160a01b038216148061072e575061072e8133610486565b6107a05760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610658565b6107aa83836114d3565b505050565b606060006107bc60075490565b905060006107c960085490565b6007546107d6919061257a565b90506000808267ffffffffffffffff81111561080257634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561085b57816020015b6040805160a0810182526000808252602080830182905292820181905260608201819052608082015282526000199092019101816108205790505b50905060005b8481101561095a5730600b600061087984600161254e565b81526020810191909152604001600020600201546001600160a01b031614156109485760006108a982600161254e565b6000818152600b6020908152604091829020825160a0810184528154815260018201546001600160a01b039081169382019390935260028201549092169282019290925260038201546060820152600482015460ff16151560808201528551929350909185908790811061092d57634e487b7160e01b600052603260045260246000fd5b602090810291909101015261094360018661254e565b945050505b80610952816125f8565b915050610861565b50949350505050565b6060600061097060075490565b905060008060005b838110156109d35733600b600061099084600161254e565b81526020810191909152604001600020600201546001600160a01b031614156109c1576109be60018461254e565b92505b806109cb816125f8565b915050610978565b5060008267ffffffffffffffff8111156109fd57634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610a5657816020015b6040805160a081018252600080825260208083018290529282018190526060820181905260808201528252600019909201910181610a1b5790505b50905060005b8481101561095a5733600b6000610a7484600161254e565b81526020810191909152604001600020600201546001600160a01b03161415610b43576000610aa482600161254e565b6000818152600b6020908152604091829020825160a0810184528154815260018201546001600160a01b039081169382019390935260028201549092169282019290925260038201546060820152600482015460ff161515608082015285519293509091859087908110610b2857634e487b7160e01b600052603260045260246000fd5b6020908102919091010152610b3e60018661254e565b945050505b80610b4d816125f8565b915050610a5c565b610b5f3382611541565b610bd15760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f7665640000000000000000000000000000006064820152608401610658565b6107aa838383611634565b6107aa83838360405180602001604052806000815250611003565b60606000610c0460075490565b905060008060005b83811015610c675733600b6000610c2484600161254e565b81526020810191909152604001600020600101546001600160a01b03161415610c5557610c5260018461254e565b92505b80610c5f816125f8565b915050610c0c565b5060008267ffffffffffffffff811115610c9157634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610cea57816020015b6040805160a081018252600080825260208083018290529282018190526060820181905260808201528252600019909201910181610caf5790505b50905060005b8481101561095a5733600b6000610d0884600161254e565b81526020810191909152604001600020600101546001600160a01b03161415610dd7576000610d3882600161254e565b6000818152600b6020908152604091829020825160a0810184528154815260018201546001600160a01b039081169382019390935260028201549092169282019290925260038201546060820152600482015460ff161515608082015285519293509091859087908110610dbc57634e487b7160e01b600052603260045260246000fd5b6020908102919091010152610dd260018661254e565b945050505b80610de1816125f8565b915050610cf0565b6000818152600260205260408120546001600160a01b03168061054b5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201527f656e7420746f6b656e00000000000000000000000000000000000000000000006064820152608401610658565b60006001600160a01b038216610ef25760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a6560448201527f726f2061646472657373000000000000000000000000000000000000000000006064820152608401610658565b506001600160a01b031660009081526003602052604090205490565b6000610f1e600780546001019055565b6000610f2960075490565b9050610f353382611801565b610f3f8185611943565b610f4981846119ec565b9392505050565b606060018054610560906125bd565b610f6a338383611b7e565b5050565b6000610f7960075490565b905090565b600a546001600160a01b03163314610ffe5760405162461bcd60e51b815260206004820152603060248201527f4f6e6c79206d61726b6574706c616365206f776e65722063616e20757064617460448201527f65206c697374696e672070726963652e000000000000000000000000000000006064820152608401610658565b600955565b61100d3383611541565b61107f5760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f7665640000000000000000000000000000006064820152608401610658565b61108b84848484611c4d565b50505050565b6000818152600b602052604090206003015434811461111a576040805162461bcd60e51b81526020600482015260248101919091527f506c65617365207375626d6974207468652061736b696e67207072696365206960448201527f6e206f7264657220746f20636f6d706c657465207468652070757263686173656064820152608401610658565b6000828152600b602052604090206002810180546001600160a01b0319908116331790915560048201805460ff1916600190811790915590910180549091169055611169600880546001019055565b611174303384611634565b600a546009546040516001600160a01b039092169181156108fc0291906000818181858888f193505050501580156111b0573d6000803e3d6000fd5b506000828152600b60205260408082206001015490516001600160a01b03909116913480156108fc02929091818181858888f193505050501580156107aa573d6000803e3d6000fd5b6000818152600260205260409020546060906001600160a01b03166112865760405162461bcd60e51b815260206004820152603160248201527f45524337323155524953746f726167653a2055524920717565727920666f722060448201527f6e6f6e6578697374656e7420746f6b656e0000000000000000000000000000006064820152608401610658565b6000828152600660205260408120805461129f906125bd565b80601f01602080910402602001604051908101604052809291908181526020018280546112cb906125bd565b80156113185780601f106112ed57610100808354040283529160200191611318565b820191906000526020600020905b8154815290600101906020018083116112fb57829003601f168201915b50505050509050600061133660408051602081019091526000815290565b9050805160001415611349575092915050565b81511561137b578082604051602001611363929190612454565b60405160208183030381529060405292505050919050565b61138484611cd6565b949350505050565b6000828152600b60205260409020600201546001600160a01b0316331461141b5760405162461bcd60e51b815260206004820152602a60248201527f4f6e6c79206974656d206f776e65722063616e20706572666f726d207468697360448201527f206f7065726174696f6e000000000000000000000000000000000000000000006064820152608401610658565b60095434146114785760405162461bcd60e51b8152602060048201526024808201527f5072696365206d75737420626520657175616c20746f206c697374696e6720706044820152637269636560e01b6064820152608401610658565b6000828152600b6020526040902060048101805460ff19169055600381018290556001810180546001600160a01b0319908116331790915560029091018054909116301790556114c86008611dcb565b610f6a333084611634565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061150882610de9565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b03166115ba5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610658565b60006115c583610de9565b9050806001600160a01b0316846001600160a01b031614806116005750836001600160a01b03166115f5846105e3565b6001600160a01b0316145b8061138457506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff16611384565b826001600160a01b031661164782610de9565b6001600160a01b0316146116c35760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e65720000000000000000000000000000000000000000000000000000006064820152608401610658565b6001600160a01b03821661173e5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610658565b6117496000826114d3565b6001600160a01b038316600090815260036020526040812080546001929061177290849061257a565b90915550506001600160a01b03821660009081526003602052604081208054600192906117a090849061254e565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6001600160a01b0382166118575760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610658565b6000818152600260205260409020546001600160a01b0316156118bc5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610658565b6001600160a01b03821660009081526003602052604081208054600192906118e590849061254e565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000828152600260205260409020546001600160a01b03166119cd5760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201527f6578697374656e7420746f6b656e0000000000000000000000000000000000006064820152608401610658565b600082815260066020908152604090912082516107aa928401906120d3565b60008111611a3c5760405162461bcd60e51b815260206004820152601c60248201527f5072696365206d757374206265206174206c65617374203120776569000000006044820152606401610658565b6009543414611a995760405162461bcd60e51b8152602060048201526024808201527f5072696365206d75737420626520657175616c20746f206c697374696e6720706044820152637269636560e01b6064820152608401610658565b6040805160a08101825283815233602080830182815230848601818152606086018881526000608088018181528b8252600b909652979097209551865591516001860180546001600160a01b03199081166001600160a01b0393841617909155925160028701805490941691161790915593516003840155516004909201805460ff191692151592909217909155611b319184611634565b604080513381523060208201529081018290526000606082015282907fb640004f1d14576d0c209e240cad0410e0d8c0c33a09375861fbadae2588a98d9060800160405180910390a25050565b816001600160a01b0316836001600160a01b03161415611be05760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610658565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b611c58848484611634565b611c6484848484611e22565b61108b5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610658565b6000818152600260205260409020546060906001600160a01b0316611d635760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006064820152608401610658565b6000611d7a60408051602081019091526000815290565b90506000815111611d9a5760405180602001604052806000815250610f49565b80611da484611f85565b604051602001611db5929190612454565b6040516020818303038152906040529392505050565b805480611e1a5760405162461bcd60e51b815260206004820152601b60248201527f436f756e7465723a2064656372656d656e74206f766572666c6f7700000000006044820152606401610658565b600019019055565b60006001600160a01b0384163b15611f7a57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611e66903390899088908890600401612483565b602060405180830381600087803b158015611e8057600080fd5b505af1925050508015611eb0575060408051601f3d908101601f19168201909252611ead9181019061237d565b60015b611f60573d808015611ede576040519150601f19603f3d011682016040523d82523d6000602084013e611ee3565b606091505b508051611f585760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610658565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050611384565b506001949350505050565b606081611fc557505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b8115611fef5780611fd9816125f8565b9150611fe89050600a83612566565b9150611fc9565b60008167ffffffffffffffff81111561201857634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015612042576020820181803683370190505b5090505b84156113845761205760018361257a565b9150612064600a86612613565b61206f90603061254e565b60f81b81838151811061209257634e487b7160e01b600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506120cc600a86612566565b9450612046565b8280546120df906125bd565b90600052602060002090601f0160209004810192826121015760008555612147565b82601f1061211a57805160ff1916838001178555612147565b82800160010185558215612147579182015b8281111561214757825182559160200191906001019061212c565b50612153929150612157565b5090565b5b808211156121535760008155600101612158565b600067ffffffffffffffff8084111561218757612187612653565b604051601f8501601f19908116603f011681019082821181831017156121af576121af612653565b816040528093508581528686860111156121c857600080fd5b858560208301376000602087830101525050509392505050565b80356001600160a01b03811681146121f957600080fd5b919050565b60006020828403121561220f578081fd5b610f49826121e2565b6000806040838503121561222a578081fd5b612233836121e2565b9150612241602084016121e2565b90509250929050565b60008060006060848603121561225e578081fd5b612267846121e2565b9250612275602085016121e2565b9150604084013590509250925092565b6000806000806080858703121561229a578081fd5b6122a3856121e2565b93506122b1602086016121e2565b925060408501359150606085013567ffffffffffffffff8111156122d3578182fd5b8501601f810187136122e3578182fd5b6122f28782356020840161216c565b91505092959194509250565b60008060408385031215612310578182fd5b612319836121e2565b91506020830135801515811461232d578182fd5b809150509250929050565b6000806040838503121561234a578182fd5b612353836121e2565b946020939093013593505050565b600060208284031215612372578081fd5b8135610f4981612669565b60006020828403121561238e578081fd5b8151610f4981612669565b600080604083850312156123ab578182fd5b823567ffffffffffffffff8111156123c1578283fd5b8301601f810185136123d1578283fd5b6123e08582356020840161216c565b95602094909401359450505050565b600060208284031215612400578081fd5b5035919050565b60008060408385031215612419578182fd5b50508035926020909101359150565b60008151808452612440816020860160208601612591565b601f01601f19169290920160200192915050565b60008351612466818460208801612591565b83519083019061247a818360208801612591565b01949350505050565b60006001600160a01b038087168352808616602084015250836040830152608060608301526124b56080830184612428565b9695505050505050565b602080825282518282018190526000919060409081850190868401855b8281101561252e57815180518552868101516001600160a01b03908116888701528682015116868601526060808201519086015260809081015115159085015260a090930192908501906001016124dc565b5091979650505050505050565b602081526000610f496020830184612428565b6000821982111561256157612561612627565b500190565b6000826125755761257561263d565b500490565b60008282101561258c5761258c612627565b500390565b60005b838110156125ac578181015183820152602001612594565b8381111561108b5750506000910152565b600181811c908216806125d157607f821691505b602082108114156125f257634e487b7160e01b600052602260045260246000fd5b50919050565b600060001982141561260c5761260c612627565b5060010190565b6000826126225761262261263d565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b03198116811461267f57600080fd5b5056fea2646970667358221220ecc8464da98f0240dda8769dbbbc4a04b072837883562b0f307e5cb15cc6690f64736f6c63430008040033";

type NFTMarketplaceConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NFTMarketplaceConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NFTMarketplace__factory extends ContractFactory {
  constructor(...args: NFTMarketplaceConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NFTMarketplace> {
    return super.deploy(overrides || {}) as Promise<NFTMarketplace>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): NFTMarketplace {
    return super.attach(address) as NFTMarketplace;
  }
  override connect(signer: Signer): NFTMarketplace__factory {
    return super.connect(signer) as NFTMarketplace__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFTMarketplaceInterface {
    return new utils.Interface(_abi) as NFTMarketplaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NFTMarketplace {
    return new Contract(address, _abi, signerOrProvider) as NFTMarketplace;
  }
}
