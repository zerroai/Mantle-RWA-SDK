"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AssetFactoryABI: () => AssetFactory_default,
  ComplianceRegistryABI: () => ComplianceRegistry_default,
  IdentityRegistryABI: () => IdentityRegistry_default,
  MantleRWASDK: () => MantleRWASDK,
  RWATokenABI: () => RWAToken_default
});
module.exports = __toCommonJS(index_exports);

// src/core/MantleRWASDK.ts
var import_viem = require("viem");
var import_chains = require("viem/chains");

// src/abis/IdentityRegistry.json
var IdentityRegistry_default = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    type: "error",
    name: "AccessControlBadConfirmation"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "neededRole",
        type: "bytes32"
      }
    ],
    type: "error",
    name: "AccessControlUnauthorizedAccount"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
        indexed: true
      }
    ],
    type: "event",
    name: "IdentityRemoved",
    anonymous: false
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
        indexed: true
      },
      {
        internalType: "uint16",
        name: "country",
        type: "uint16",
        indexed: false
      },
      {
        internalType: "uint256",
        name: "claims",
        type: "uint256",
        indexed: false
      }
    ],
    type: "event",
    name: "IdentityUpdated",
    anonymous: false
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
        indexed: true
      },
      {
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
        indexed: true
      },
      {
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
        indexed: true
      }
    ],
    type: "event",
    name: "RoleAdminChanged",
    anonymous: false
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
        indexed: true
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
        indexed: true
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
        indexed: true
      }
    ],
    type: "event",
    name: "RoleGranted",
    anonymous: false
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
        indexed: true
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
        indexed: true
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
        indexed: true
      }
    ],
    type: "event",
    name: "RoleRevoked",
    anonymous: false
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ]
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "REGISTRAR_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ]
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function",
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ]
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "grantRole"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        internalType: "uint8",
        name: "claimBitIndex",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function",
    name: "hasClaim",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ]
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function",
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ]
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function",
    name: "identityClaims",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ]
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function",
    name: "investorCountry",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16"
      }
    ]
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        internalType: "uint16",
        name: "country",
        type: "uint16"
      }
    ],
    stateMutability: "view",
    type: "function",
    name: "isFromCountry",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ]
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "removeIdentity"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "callerConfirmation",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "renounceRole"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "revokeRole"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        internalType: "uint16",
        name: "country",
        type: "uint16"
      },
      {
        internalType: "uint256",
        name: "claims",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "setIdentity"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4"
      }
    ],
    stateMutability: "view",
    type: "function",
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ]
  }
];

// src/abis/ComplianceRegistry.json
var ComplianceRegistry_default = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_identityRegistry",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    type: "error",
    name: "AccessControlBadConfirmation"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "neededRole",
        type: "bytes32"
      }
    ],
    type: "error",
    name: "AccessControlUnauthorizedAccount"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
        indexed: true
      },
      {
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
        indexed: true
      },
      {
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
        indexed: true
      }
    ],
    type: "event",
    name: "RoleAdminChanged",
    anonymous: false
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
        indexed: true
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
        indexed: true
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
        indexed: true
      }
    ],
    type: "event",
    name: "RoleGranted",
    anonymous: false
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
        indexed: true
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
        indexed: true
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
        indexed: true
      }
    ],
    type: "event",
    name: "RoleRevoked",
    anonymous: false
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ruleId",
        type: "bytes32",
        indexed: true
      },
      {
        internalType: "bool",
        name: "requiresAccredited",
        type: "bool",
        indexed: false
      },
      {
        internalType: "bool",
        name: "requiresKYC",
        type: "bool",
        indexed: false
      }
    ],
    type: "event",
    name: "RuleUpdated",
    anonymous: false
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "COMPLIANCE_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ]
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ]
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "ruleId",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function",
    name: "checkCompliance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ]
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function",
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ]
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "grantRole"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function",
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ]
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "identityRegistry",
    outputs: [
      {
        internalType: "contract IdentityRegistry",
        name: "",
        type: "address"
      }
    ]
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "callerConfirmation",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "renounceRole"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "revokeRole"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function",
    name: "rules",
    outputs: [
      {
        internalType: "bool",
        name: "requiresAccredited",
        type: "bool"
      },
      {
        internalType: "bool",
        name: "requiresKYC",
        type: "bool"
      }
    ]
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ruleId",
        type: "bytes32"
      },
      {
        internalType: "bool",
        name: "requiresAccredited",
        type: "bool"
      },
      {
        internalType: "bool",
        name: "requiresKYC",
        type: "bool"
      },
      {
        internalType: "uint16[]",
        name: "restrictedCountries",
        type: "uint16[]"
      }
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "setRule"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4"
      }
    ],
    stateMutability: "view",
    type: "function",
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ]
  }
];

// src/abis/AssetFactory.json
var AssetFactory_default = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_complianceRegistry",
        type: "address"
      },
      {
        internalType: "address",
        name: "_tokenImplementation",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    type: "error",
    name: "AccessControlBadConfirmation"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "neededRole",
        type: "bytes32"
      }
    ],
    type: "error",
    name: "AccessControlUnauthorizedAccount"
  },
  {
    inputs: [],
    type: "error",
    name: "FailedDeployment"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256"
      }
    ],
    type: "error",
    name: "InsufficientBalance"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "assetAddress",
        type: "address",
        indexed: true
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
        indexed: false
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
        indexed: false
      },
      {
        internalType: "address",
        name: "deployer",
        type: "address",
        indexed: true
      }
    ],
    type: "event",
    name: "AssetDeployed",
    anonymous: false
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
        indexed: true
      }
    ],
    type: "event",
    name: "ImplementationUpdated",
    anonymous: false
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
        indexed: true
      },
      {
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
        indexed: true
      },
      {
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
        indexed: true
      }
    ],
    type: "event",
    name: "RoleAdminChanged",
    anonymous: false
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
        indexed: true
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
        indexed: true
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
        indexed: true
      }
    ],
    type: "event",
    name: "RoleGranted",
    anonymous: false
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
        indexed: true
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
        indexed: true
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
        indexed: true
      }
    ],
    type: "event",
    name: "RoleRevoked",
    anonymous: false
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ]
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "complianceRegistry",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ]
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string"
      },
      {
        internalType: "bytes32",
        name: "complianceRuleId",
        type: "bytes32"
      },
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "deployAsset",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ]
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function",
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ]
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "grantRole"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function",
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ]
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "callerConfirmation",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "renounceRole"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "revokeRole"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4"
      }
    ],
    stateMutability: "view",
    type: "function",
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ]
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "tokenImplementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ]
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newImplementation",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "updateImplementation"
  }
];

// src/abis/RWAToken.json
var RWAToken_default = [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "COMPLIANCE_ROLE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "DEFAULT_ADMIN_ROLE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "MINTER_ROLE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "PAUSER_ROLE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "RECOVERY_ROLE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "allowance",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address"
      },
      {
        name: "spender",
        type: "address",
        internalType: "address"
      }
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      {
        name: "spender",
        type: "address",
        internalType: "address"
      },
      {
        name: "value",
        type: "uint256",
        internalType: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool"
      }
    ],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address"
      }
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "complianceRegistry",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract ComplianceRegistry"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "complianceRuleId",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint8",
        internalType: "uint8"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "docNames",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "documents",
    inputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32"
      }
    ],
    outputs: [
      {
        name: "docHash",
        type: "bytes32",
        internalType: "bytes32"
      },
      {
        name: "lastModified",
        type: "uint256",
        internalType: "uint256"
      },
      {
        name: "uri",
        type: "string",
        internalType: "string"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "forceTransfer",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address"
      },
      {
        name: "to",
        type: "address",
        internalType: "address"
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "getRoleAdmin",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "grantRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32"
      },
      {
        name: "account",
        type: "address",
        internalType: "address"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "hasRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32"
      },
      {
        name: "account",
        type: "address",
        internalType: "address"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        name: "name",
        type: "string",
        internalType: "string"
      },
      {
        name: "symbol",
        type: "string",
        internalType: "string"
      },
      {
        name: "_complianceRegistry",
        type: "address",
        internalType: "address"
      },
      {
        name: "_complianceRuleId",
        type: "bytes32",
        internalType: "bytes32"
      },
      {
        name: "admin",
        type: "address",
        internalType: "address"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "mint",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address"
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "pause",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "paused",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "renounceRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32"
      },
      {
        name: "callerConfirmation",
        type: "address",
        internalType: "address"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "revokeRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32"
      },
      {
        name: "account",
        type: "address",
        internalType: "address"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "setComplianceRegistry",
    inputs: [
      {
        name: "_newRegistry",
        type: "address",
        internalType: "address"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "setComplianceRuleId",
    inputs: [
      {
        name: "_newRuleId",
        type: "bytes32",
        internalType: "bytes32"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "setDocument",
    inputs: [
      {
        name: "name",
        type: "bytes32",
        internalType: "bytes32"
      },
      {
        name: "uri",
        type: "string",
        internalType: "string"
      },
      {
        name: "docHash",
        type: "bytes32",
        internalType: "bytes32"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [
      {
        name: "interfaceId",
        type: "bytes4",
        internalType: "bytes4"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address"
      },
      {
        name: "value",
        type: "uint256",
        internalType: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool"
      }
    ],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address"
      },
      {
        name: "to",
        type: "address",
        internalType: "address"
      },
      {
        name: "value",
        type: "uint256",
        internalType: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool"
      }
    ],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "unpause",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "spender",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "ComplianceRegistryUpdated",
    inputs: [
      {
        name: "newRegistry",
        type: "address",
        indexed: true,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "ComplianceRuleUpdated",
    inputs: [
      {
        name: "newRuleId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "DocumentUpdated",
    inputs: [
      {
        name: "name",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32"
      },
      {
        name: "uri",
        type: "string",
        indexed: false,
        internalType: "string"
      },
      {
        name: "docHash",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "ForcedTransfer",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      {
        name: "version",
        type: "uint64",
        indexed: false,
        internalType: "uint64"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "Paused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "RoleAdminChanged",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32"
      },
      {
        name: "previousAdminRole",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32"
      },
      {
        name: "newAdminRole",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "RoleGranted",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32"
      },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "RoleRevoked",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32"
      },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "Unpaused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "error",
    name: "AccessControlBadConfirmation",
    inputs: []
  },
  {
    type: "error",
    name: "AccessControlUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address"
      },
      {
        name: "neededRole",
        type: "bytes32",
        internalType: "bytes32"
      }
    ]
  },
  {
    type: "error",
    name: "ERC20InsufficientAllowance",
    inputs: [
      {
        name: "spender",
        type: "address",
        internalType: "address"
      },
      {
        name: "allowance",
        type: "uint256",
        internalType: "uint256"
      },
      {
        name: "needed",
        type: "uint256",
        internalType: "uint256"
      }
    ]
  },
  {
    type: "error",
    name: "ERC20InsufficientBalance",
    inputs: [
      {
        name: "sender",
        type: "address",
        internalType: "address"
      },
      {
        name: "balance",
        type: "uint256",
        internalType: "uint256"
      },
      {
        name: "needed",
        type: "uint256",
        internalType: "uint256"
      }
    ]
  },
  {
    type: "error",
    name: "ERC20InvalidApprover",
    inputs: [
      {
        name: "approver",
        type: "address",
        internalType: "address"
      }
    ]
  },
  {
    type: "error",
    name: "ERC20InvalidReceiver",
    inputs: [
      {
        name: "receiver",
        type: "address",
        internalType: "address"
      }
    ]
  },
  {
    type: "error",
    name: "ERC20InvalidSender",
    inputs: [
      {
        name: "sender",
        type: "address",
        internalType: "address"
      }
    ]
  },
  {
    type: "error",
    name: "ERC20InvalidSpender",
    inputs: [
      {
        name: "spender",
        type: "address",
        internalType: "address"
      }
    ]
  },
  {
    type: "error",
    name: "EnforcedPause",
    inputs: []
  },
  {
    type: "error",
    name: "ExpectedPause",
    inputs: []
  },
  {
    type: "error",
    name: "InvalidInitialization",
    inputs: []
  },
  {
    type: "error",
    name: "NotInitializing",
    inputs: []
  }
];

// src/core/MantleRWASDK.ts
var MantleRWASDK = class {
  constructor(config) {
    __publicField(this, "publicClient");
    __publicField(this, "walletClient");
    __publicField(this, "config");
    this.config = config;
    const chain = config.chain || import_chains.mantleSepoliaTestnet;
    this.publicClient = (0, import_viem.createPublicClient)({
      chain,
      transport: (0, import_viem.http)(config.rpcUrl)
    });
    if (config.walletClient) {
      this.walletClient = config.walletClient;
    }
  }
  // Helper to get contract instances
  getContract(address, abi) {
    return (0, import_viem.getContract)({
      address,
      abi,
      client: {
        public: this.publicClient,
        wallet: this.walletClient
      }
    });
  }
  get identityRegistry() {
    return this.getContract(this.config.contractAddresses.identityRegistry, IdentityRegistry_default);
  }
  get complianceRegistry() {
    return this.getContract(this.config.contractAddresses.complianceRegistry, ComplianceRegistry_default);
  }
  get assetFactory() {
    return this.getContract(this.config.contractAddresses.assetFactory, AssetFactory_default);
  }
  getRWAToken(address) {
    return this.getContract(address, RWAToken_default);
  }
  // High-level actions
  /**
   * Deploys a new RWA Asset
   * @param name Asset name
   * @param symbol Asset symbol
   * @param complianceRuleId Compliance rule ID
   * @param initialSupply Initial supply
   * @returns Transaction hash
   */
  async deployAsset(name, symbol, complianceRuleId, initialSupply) {
    if (!this.walletClient) throw new Error("Wallet client required for write operations");
    const [account] = await this.walletClient.getAddresses();
    const { request } = await this.publicClient.simulateContract({
      address: this.config.contractAddresses.assetFactory,
      abi: AssetFactory_default,
      functionName: "deployAsset",
      args: [name, symbol, complianceRuleId, initialSupply],
      account
    });
    return this.walletClient.writeContract(request);
  }
  /**
   * Registers or updates an identity
   * @param user User address
   * @param country Country code (ISO 3166-1 numeric)
   * @param claims Claims bitmap
   * @returns Transaction hash
   */
  async registerIdentity(user, country, claims) {
    if (!this.walletClient) throw new Error("Wallet client required for write operations");
    const [account] = await this.walletClient.getAddresses();
    const { request } = await this.publicClient.simulateContract({
      address: this.config.contractAddresses.identityRegistry,
      abi: IdentityRegistry_default,
      functionName: "setIdentity",
      args: [user, country, claims],
      account
    });
    return this.walletClient.writeContract(request);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AssetFactoryABI,
  ComplianceRegistryABI,
  IdentityRegistryABI,
  MantleRWASDK,
  RWATokenABI
});
