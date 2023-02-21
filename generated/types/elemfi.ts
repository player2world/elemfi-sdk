export type Elemfi = {
  "version": "0.2.0",
  "name": "elemfi",
  "instructions": [
    {
      "name": "createRealm",
      "accounts": [
        {
          "name": "realm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "delegator",
          "type": "publicKey"
        },
        {
          "name": "approver",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "createVault",
      "accounts": [
        {
          "name": "realm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collateralToken",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "collateralMaxSupply",
          "type": "u64"
        },
        {
          "name": "collateralMinAmount",
          "type": "u64"
        },
        {
          "name": "collateralMaxAmount",
          "type": "u64"
        },
        {
          "name": "underlyingLiquidity",
          "type": "u64"
        },
        {
          "name": "escrowCollection",
          "type": {
            "option": "publicKey"
          }
        }
      ]
    },
    {
      "name": "createStrategy",
      "accounts": [
        {
          "name": "realm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "approver",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategy",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "authority",
          "type": "publicKey"
        },
        {
          "name": "utilizedAmount",
          "type": "u64"
        },
        {
          "name": "utilizationMaxAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "closeStrategy",
      "accounts": [
        {
          "name": "realm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "approver",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategy",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rentCollector",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "borrow",
      "accounts": [
        {
          "name": "realm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategy",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "repay",
      "accounts": [
        {
          "name": "realm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategy",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "repayer",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "closeObligation",
      "accounts": [
        {
          "name": "realm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "obligation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rentCollector",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createObligation",
      "accounts": [
        {
          "name": "realm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "obligation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collateralOwner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "collateralToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collateralTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "createdTs",
          "type": "i64"
        }
      ]
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "realm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collateralToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "underlyingOwner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "collateralTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createEscrow",
      "accounts": [
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "escrowCreateObligation",
      "accounts": [
        {
          "name": "createObligation",
          "accounts": [
            {
              "name": "realm",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "vault",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "vaultAuthority",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "obligation",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "collateralOwner",
              "isMut": false,
              "isSigner": true
            },
            {
              "name": "collateralToken",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "collateralTokenAccount",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "payer",
              "isMut": true,
              "isSigner": true
            },
            {
              "name": "systemProgram",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "escrow",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftOwner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "nftTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "createdTs",
          "type": "i64"
        }
      ]
    },
    {
      "name": "escrowDeposit",
      "accounts": [
        {
          "name": "deposit",
          "accounts": [
            {
              "name": "realm",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "vault",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "vaultAuthority",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "collateralToken",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "underlyingOwner",
              "isMut": false,
              "isSigner": true
            },
            {
              "name": "collateralTokenAccount",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "escrow",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftOwner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "nftTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "escrow",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "authorityBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "obligation",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "realm",
            "type": "publicKey"
          },
          {
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "rentCollector",
            "type": "publicKey"
          },
          {
            "name": "destination",
            "type": "publicKey"
          },
          {
            "name": "burntAmount",
            "type": "u64"
          },
          {
            "name": "pendingAmount",
            "type": "u64"
          },
          {
            "name": "createdTs",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "realm",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "authority"
            ],
            "type": "publicKey"
          },
          {
            "name": "delegator",
            "docs": [
              "offchain bot"
            ],
            "type": "publicKey"
          },
          {
            "name": "approver",
            "docs": [
              "approver has power to add new router"
            ],
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "strategy",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "realm",
            "type": "publicKey"
          },
          {
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "utilizedAmount",
            "type": "u64"
          },
          {
            "name": "utilizationMaxAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "realm",
            "type": "publicKey"
          },
          {
            "name": "authorityBump",
            "type": "u8"
          },
          {
            "name": "tokenDecimals",
            "type": "u8"
          },
          {
            "name": "collateralToken",
            "type": "publicKey"
          },
          {
            "name": "collateralSupply",
            "type": "u64"
          },
          {
            "name": "collateralMaxSupply",
            "type": "u64"
          },
          {
            "name": "collateralMinAmount",
            "type": "u64"
          },
          {
            "name": "collateralMaxAmount",
            "type": "u64"
          },
          {
            "name": "underlyingToken",
            "type": "publicKey"
          },
          {
            "name": "underlyingLiquidity",
            "type": "u64"
          },
          {
            "name": "pendingObligationAmount",
            "type": "u64"
          },
          {
            "name": "pendingObligations",
            "type": "u32"
          },
          {
            "name": "escrowCollection",
            "docs": [
              "escrow NFT collection"
            ],
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ObligationCreatedData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "realm",
            "type": "publicKey"
          },
          {
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "rentCollector",
            "type": "publicKey"
          },
          {
            "name": "destination",
            "type": "publicKey"
          },
          {
            "name": "burntAmount",
            "type": "u64"
          },
          {
            "name": "pendingAmount",
            "type": "u64"
          },
          {
            "name": "createdTs",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "StrategyUpdatedData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "utilizedAmount",
            "type": "u64"
          },
          {
            "name": "utilizationMaxAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "StrategyCreatedData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "realm",
            "type": "publicKey"
          },
          {
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "utilizedAmount",
            "type": "u64"
          },
          {
            "name": "utilizationMaxAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "VaultUpdatedData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collateralSupply",
            "type": "u64"
          },
          {
            "name": "collateralMaxSupply",
            "type": "u64"
          },
          {
            "name": "underlyingLiquidity",
            "type": "u64"
          },
          {
            "name": "pendingObligationAmount",
            "type": "u64"
          },
          {
            "name": "pendingObligations",
            "type": "u32"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "ObligationCreatedEvent",
      "fields": [
        {
          "name": "pubkey",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "data",
          "type": {
            "defined": "ObligationCreatedData"
          },
          "index": false
        }
      ]
    },
    {
      "name": "ObligationClosedEvent",
      "fields": [
        {
          "name": "pubkey",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "StrategyUpdatedEvent",
      "fields": [
        {
          "name": "pubkey",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "data",
          "type": {
            "defined": "StrategyUpdatedData"
          },
          "index": false
        }
      ]
    },
    {
      "name": "StrategyCreatedEvent",
      "fields": [
        {
          "name": "pubkey",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "data",
          "type": {
            "defined": "StrategyCreatedData"
          },
          "index": false
        }
      ]
    },
    {
      "name": "StrategyClosedEvent",
      "fields": [
        {
          "name": "pubkey",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "VaultUpdatedEvent",
      "fields": [
        {
          "name": "pubkey",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "data",
          "type": {
            "defined": "VaultUpdatedData"
          },
          "index": false
        }
      ]
    }
  ]
};

export const IDL: Elemfi = {
  "version": "0.2.0",
  "name": "elemfi",
  "instructions": [
    {
      "name": "createRealm",
      "accounts": [
        {
          "name": "realm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "delegator",
          "type": "publicKey"
        },
        {
          "name": "approver",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "createVault",
      "accounts": [
        {
          "name": "realm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collateralToken",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "collateralMaxSupply",
          "type": "u64"
        },
        {
          "name": "collateralMinAmount",
          "type": "u64"
        },
        {
          "name": "collateralMaxAmount",
          "type": "u64"
        },
        {
          "name": "underlyingLiquidity",
          "type": "u64"
        },
        {
          "name": "escrowCollection",
          "type": {
            "option": "publicKey"
          }
        }
      ]
    },
    {
      "name": "createStrategy",
      "accounts": [
        {
          "name": "realm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "approver",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategy",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "authority",
          "type": "publicKey"
        },
        {
          "name": "utilizedAmount",
          "type": "u64"
        },
        {
          "name": "utilizationMaxAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "closeStrategy",
      "accounts": [
        {
          "name": "realm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "approver",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategy",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rentCollector",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "borrow",
      "accounts": [
        {
          "name": "realm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategy",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "repay",
      "accounts": [
        {
          "name": "realm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "strategy",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "repayer",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "closeObligation",
      "accounts": [
        {
          "name": "realm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "obligation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rentCollector",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createObligation",
      "accounts": [
        {
          "name": "realm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "obligation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collateralOwner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "collateralToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collateralTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "createdTs",
          "type": "i64"
        }
      ]
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "realm",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collateralToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "underlyingOwner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "collateralTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createEscrow",
      "accounts": [
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "escrowCreateObligation",
      "accounts": [
        {
          "name": "createObligation",
          "accounts": [
            {
              "name": "realm",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "vault",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "vaultAuthority",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "obligation",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "collateralOwner",
              "isMut": false,
              "isSigner": true
            },
            {
              "name": "collateralToken",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "collateralTokenAccount",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "payer",
              "isMut": true,
              "isSigner": true
            },
            {
              "name": "systemProgram",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "escrow",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftOwner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "nftTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "createdTs",
          "type": "i64"
        }
      ]
    },
    {
      "name": "escrowDeposit",
      "accounts": [
        {
          "name": "deposit",
          "accounts": [
            {
              "name": "realm",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "vault",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "vaultAuthority",
              "isMut": false,
              "isSigner": false
            },
            {
              "name": "collateralToken",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "underlyingOwner",
              "isMut": false,
              "isSigner": true
            },
            {
              "name": "collateralTokenAccount",
              "isMut": true,
              "isSigner": false
            },
            {
              "name": "tokenProgram",
              "isMut": false,
              "isSigner": false
            }
          ]
        },
        {
          "name": "escrow",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftOwner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "nftTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "escrow",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "authorityBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "obligation",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "realm",
            "type": "publicKey"
          },
          {
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "rentCollector",
            "type": "publicKey"
          },
          {
            "name": "destination",
            "type": "publicKey"
          },
          {
            "name": "burntAmount",
            "type": "u64"
          },
          {
            "name": "pendingAmount",
            "type": "u64"
          },
          {
            "name": "createdTs",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "realm",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "authority"
            ],
            "type": "publicKey"
          },
          {
            "name": "delegator",
            "docs": [
              "offchain bot"
            ],
            "type": "publicKey"
          },
          {
            "name": "approver",
            "docs": [
              "approver has power to add new router"
            ],
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "strategy",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "realm",
            "type": "publicKey"
          },
          {
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "utilizedAmount",
            "type": "u64"
          },
          {
            "name": "utilizationMaxAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "realm",
            "type": "publicKey"
          },
          {
            "name": "authorityBump",
            "type": "u8"
          },
          {
            "name": "tokenDecimals",
            "type": "u8"
          },
          {
            "name": "collateralToken",
            "type": "publicKey"
          },
          {
            "name": "collateralSupply",
            "type": "u64"
          },
          {
            "name": "collateralMaxSupply",
            "type": "u64"
          },
          {
            "name": "collateralMinAmount",
            "type": "u64"
          },
          {
            "name": "collateralMaxAmount",
            "type": "u64"
          },
          {
            "name": "underlyingToken",
            "type": "publicKey"
          },
          {
            "name": "underlyingLiquidity",
            "type": "u64"
          },
          {
            "name": "pendingObligationAmount",
            "type": "u64"
          },
          {
            "name": "pendingObligations",
            "type": "u32"
          },
          {
            "name": "escrowCollection",
            "docs": [
              "escrow NFT collection"
            ],
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ObligationCreatedData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "realm",
            "type": "publicKey"
          },
          {
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "rentCollector",
            "type": "publicKey"
          },
          {
            "name": "destination",
            "type": "publicKey"
          },
          {
            "name": "burntAmount",
            "type": "u64"
          },
          {
            "name": "pendingAmount",
            "type": "u64"
          },
          {
            "name": "createdTs",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "StrategyUpdatedData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "utilizedAmount",
            "type": "u64"
          },
          {
            "name": "utilizationMaxAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "StrategyCreatedData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "realm",
            "type": "publicKey"
          },
          {
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "utilizedAmount",
            "type": "u64"
          },
          {
            "name": "utilizationMaxAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "VaultUpdatedData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collateralSupply",
            "type": "u64"
          },
          {
            "name": "collateralMaxSupply",
            "type": "u64"
          },
          {
            "name": "underlyingLiquidity",
            "type": "u64"
          },
          {
            "name": "pendingObligationAmount",
            "type": "u64"
          },
          {
            "name": "pendingObligations",
            "type": "u32"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "ObligationCreatedEvent",
      "fields": [
        {
          "name": "pubkey",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "data",
          "type": {
            "defined": "ObligationCreatedData"
          },
          "index": false
        }
      ]
    },
    {
      "name": "ObligationClosedEvent",
      "fields": [
        {
          "name": "pubkey",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "StrategyUpdatedEvent",
      "fields": [
        {
          "name": "pubkey",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "data",
          "type": {
            "defined": "StrategyUpdatedData"
          },
          "index": false
        }
      ]
    },
    {
      "name": "StrategyCreatedEvent",
      "fields": [
        {
          "name": "pubkey",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "data",
          "type": {
            "defined": "StrategyCreatedData"
          },
          "index": false
        }
      ]
    },
    {
      "name": "StrategyClosedEvent",
      "fields": [
        {
          "name": "pubkey",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "VaultUpdatedEvent",
      "fields": [
        {
          "name": "pubkey",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "data",
          "type": {
            "defined": "VaultUpdatedData"
          },
          "index": false
        }
      ]
    }
  ]
};
