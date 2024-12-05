import { BrowserProvider, Contract } from "ethers";
import React, { useEffect, useState } from "react";

// コントラクトのアドレスとABIを設定
const contractAddress = "0x5e90264685E4FC5B8f25855Fd41f9526e86274cB"; // スマートコントラクトのアドレスを設定
const abi = [
  [
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
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "ERC721IncorrectOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ERC721InsufficientApproval",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "approver",
          type: "address",
        },
      ],
      name: "ERC721InvalidApprover",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "ERC721InvalidOperator",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "ERC721InvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
      ],
      name: "ERC721InvalidReceiver",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "ERC721InvalidSender",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ERC721NonexistentToken",
      type: "error",
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
          name: "growthAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "payAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "coinAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "bitcoinAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "haloAmount",
          type: "uint256",
        },
      ],
      name: "feed",
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
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error",
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
          indexed: false,
          internalType: "uint256",
          name: "_fromTokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_toTokenId",
          type: "uint256",
        },
      ],
      name: "BatchMetadataUpdate",
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
          internalType: "uint256",
          name: "growthAdded",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "totalGrowth",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "enum MermonNFT.Stages",
          name: "newStage",
          type: "uint8",
        },
      ],
      name: "FeedGiven",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256",
        },
      ],
      name: "MetadataUpdate",
      type: "event",
    },
    {
      inputs: [],
      name: "mintNFT",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [],
      name: "renounceOwnership",
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
          name: "data",
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
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
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
          internalType: "string",
          name: "newUri",
          type: "string",
        },
      ],
      name: "UpdateTokenURI",
      type: "event",
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
          name: "",
          type: "uint256",
        },
      ],
      name: "bitCoin",
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
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "merCoin",
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
          name: "",
          type: "uint256",
        },
      ],
      name: "merHalo",
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
          name: "",
          type: "uint256",
        },
      ],
      name: "merPay",
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
      inputs: [],
      name: "owner",
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
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "tokenGrowth",
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
          name: "",
          type: "uint256",
        },
      ],
      name: "tokenStages",
      outputs: [
        {
          internalType: "enum MermonNFT.Stages",
          name: "",
          type: "uint8",
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
  ],
];

function MermonNFT() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [totalGrowth, setTotalGrowth] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      if (window.ethereum) {
        try {
          const newProvider = new BrowserProvider(window.ethereum);
          const signer = await newProvider.getSigner();
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          setAccount(accounts[0]);
          setProvider(newProvider);

          const nftContract = new Contract(contractAddress, abi, signer);
          setContract(nftContract);
        } catch (err) {
          console.error("Initialization error:", err);
        }
      } else {
        alert("MetaMaskをインストールしてください！");
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        if (contract && account) {
          const balance = await contract.balanceOf(account);
          if (balance > 0n) {
            const id = await contract.tokenOfOwnerByIndex(account, 0);
            setTokenId(id.toString());
            await updateTokenInfo(id.toString());
          } else {
            const tx = await contract.mintNFT();
            await tx.wait();
            const id = await contract.tokenOfOwnerByIndex(account, 0);
            setTokenId(id.toString());
            await updateTokenInfo(id.toString());
          }
        }
      } catch (err) {
        console.error("Error fetching token data:", err);
      }
    };

    fetchTokenData();
  }, [contract, account]);

  const updateTokenInfo = async (id) => {
    try {
      // スマートコントラクトから必要なデータを取得
      const growth = await contract.tokenGrowth(id);
      const merPay = await contract.merPay(id);
      const merCoin = await contract.merCoin(id);
      const bitCoin = await contract.bitCoin(id);
      const merHalo = await contract.merHalo(id);
      const stage = await contract.tokenStages(id);

      // 数値型に変換
      const growthValue = Number(growth);
      const merPayValue = Number(merPay);
      const merCoinValue = Number(merCoin);
      const bitCoinValue = Number(bitCoin);
      const merHaloValue = Number(merHalo);
      const stageValue = Number(stage);

      // 総合成長値を計算
      const totalGrowthValue =
        growthValue + merPayValue + merCoinValue + bitCoinValue + merHaloValue;
      setTotalGrowth(totalGrowthValue);

      // ステージに応じた画像URLを取得
      const image = getImageURL(stageValue);
      setImageUrl(image);
    } catch (err) {
      console.error("Error updating token info:", err);
    }
  };

  // ステージに応じた画像URLを返す関数
  const getImageURL = (stage) => {
    if (stage === 0) {
      return "https://raw.githubusercontent.com/kosuke-eth/mermon-NFT/develop/images/egg.PNG";
    } else if (stage === 1) {
      return "https://raw.githubusercontent.com/kosuke-eth/mermon-NFT/develop/images/egg_crack.PNG";
    } else if (stage === 2) {
      return "https://raw.githubusercontent.com/kosuke-eth/mermon-NFT/develop/images/small_turtle.PNG";
    } else if (stage === 3) {
      return "https://raw.githubusercontent.com/kosuke-eth/mermon-NFT/develop/images/large_turtle.PNG";
    }
    return "";
  };

  const handleIncrement = async () => {
    try {
      if (!tokenId) {
        alert("NFTが選択されていません。");
        return;
      }

      const tx = await contract.feed(tokenId, 1, 0, 0, 0, 0);
      await tx.wait();
      await updateTokenInfo(tokenId);
    } catch (err) {
      console.error("Error incrementing growth:", err);
    }
  };

  return (
    <div>
      <h1>Mermon NFT</h1>
      {imageUrl && <img src={imageUrl} alt="Mermon NFT" />}
      <p>Total Growth: {totalGrowth}</p>
      <button onClick={handleIncrement}>＋</button>
    </div>
  );
}

export default MermonNFT;
