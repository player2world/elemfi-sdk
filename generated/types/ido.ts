export type Ido = {
  "version": "0.1.0",
  "name": "ido",
  "instructions": [
    {
      "name": "createPool",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rentPayer",
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
          "name": "startTs",
          "type": "u32"
        },
        {
          "name": "endTs",
          "type": "u32"
        },
        {
          "name": "duration",
          "type": "u32"
        },
        {
          "name": "merkleRoot",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "updatePool",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "merkleRoot",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "createBook",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "book",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rentPayer",
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
          "name": "totalAmount",
          "type": "u64"
        },
        {
          "name": "merkleIndex",
          "type": "u16"
        },
        {
          "name": "merkleProof",
          "type": {
            "vec": {
              "array": [
                "u8",
                32
              ]
            }
          }
        }
      ]
    },
    {
      "name": "claim",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "book",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "pool",
      "docs": [
        "8+32+32+1+1+8+4+4+4+32"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "treasuryMint",
            "type": "publicKey"
          },
          {
            "name": "decimals",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "claimedAmount",
            "type": "u64"
          },
          {
            "name": "startTs",
            "type": "u32"
          },
          {
            "name": "endTs",
            "type": "u32"
          },
          {
            "name": "duration",
            "type": "u32"
          },
          {
            "name": "merkleRoot",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "book",
      "docs": [
        "8+32+32+8+8"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pool",
            "type": "publicKey"
          },
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "claimedAmount",
            "type": "u64"
          }
        ]
      }
    }
  ]
};

export const IDL: Ido = {
  "version": "0.1.0",
  "name": "ido",
  "instructions": [
    {
      "name": "createPool",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rentPayer",
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
          "name": "startTs",
          "type": "u32"
        },
        {
          "name": "endTs",
          "type": "u32"
        },
        {
          "name": "duration",
          "type": "u32"
        },
        {
          "name": "merkleRoot",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "updatePool",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "merkleRoot",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "createBook",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "book",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rentPayer",
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
          "name": "totalAmount",
          "type": "u64"
        },
        {
          "name": "merkleIndex",
          "type": "u16"
        },
        {
          "name": "merkleProof",
          "type": {
            "vec": {
              "array": [
                "u8",
                32
              ]
            }
          }
        }
      ]
    },
    {
      "name": "claim",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "book",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "pool",
      "docs": [
        "8+32+32+1+1+8+4+4+4+32"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "treasuryMint",
            "type": "publicKey"
          },
          {
            "name": "decimals",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "claimedAmount",
            "type": "u64"
          },
          {
            "name": "startTs",
            "type": "u32"
          },
          {
            "name": "endTs",
            "type": "u32"
          },
          {
            "name": "duration",
            "type": "u32"
          },
          {
            "name": "merkleRoot",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "book",
      "docs": [
        "8+32+32+8+8"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pool",
            "type": "publicKey"
          },
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "claimedAmount",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
