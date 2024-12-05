// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MermonNFT is ERC721URIStorage, Ownable(msg.sender) {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // ステージ
    enum Stages { One, Two, Three, Four }

    // NFTの成長状態を保持するマッピング
    mapping(uint256 => uint256) public tokenGrowth; // 成長値
    mapping(uint256 => Stages) public tokenStages; // 現在のステージ

    event UpdateTokenURI(uint256 indexed tokenId, string newUri);
    event FeedGiven(uint256 indexed tokenId, uint256 growthAdded, uint256 newGrowth, Stages newStage);

    constructor() ERC721("MermonNFT", "MFT") {}

    // NFTをミントする関数
    function mintNFT() public {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();

        // 初期成長値とステージ
        tokenGrowth[tokenId] = 0;
        tokenStages[tokenId] = Stages.One;

        // NFTをミント
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, _generateTokenURI(tokenId));
    }

    // 餌を与える関数
    function feed(uint256 tokenId, uint256 growthAmount) public {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        require(_ownerOf(tokenId) == msg.sender, "You are not this Mermon owner");

        // 成長値を加算
        tokenGrowth[tokenId] += growthAmount;

        // 新しいステージを計算
        uint256 totalGrowth = tokenGrowth[tokenId];
        Stages currentStage = tokenStages[tokenId];
        Stages newStage = _calculateStage(totalGrowth);

        // ステージが進化した場合、更新
        if (newStage != currentStage) {
            tokenStages[tokenId] = newStage;
        }

        // Token URIを更新
        _setTokenURI(tokenId, _generateTokenURI(tokenId));

        emit FeedGiven(tokenId, growthAmount, totalGrowth, newStage);
    }

    // ステージを計算する内部関数
    function _calculateStage(uint256 totalGrowth) internal pure returns (Stages) {
        if (totalGrowth >= 30) {
            return Stages.Four;
        } else if (totalGrowth >= 20) {
            return Stages.Three;
        } else if (totalGrowth >= 10) {
            return Stages.Two;
        } else {
            return Stages.One;
        }
    }

    // Token URIを生成する内部関数
    function _generateTokenURI(uint256 tokenId) internal view returns (string memory) {
        Stages stage = tokenStages[tokenId];
        string memory imageUrl = _getImageURL(stage);

        return string(
            abi.encodePacked(
                '{"name":"Mermon #',
                Strings.toString(tokenId),
                '","description":"A Mermon NFT that evolves with feeding.","attributes":[',
                '{"trait_type":"Growth","value":', Strings.toString(tokenGrowth[tokenId]), '},',
                '{"trait_type":"Stage","value":"', _stageToString(stage), '"}',
                '],"image":"', imageUrl, '"}'
            )
        );
    }

    // ステージに応じた画像URLを返す関数
    function _getImageURL(Stages stage) internal pure returns (string memory) {
        if (stage == Stages.One) {
            return "https://raw.githubusercontent.com/kosuke-eth/mermon-NFT/develop/images/egg.PNG";
        } else if (stage == Stages.Two) {
            return "https://raw.githubusercontent.com/kosuke-eth/mermon-NFT/develop/images/egg_crack.PNG";
        } else if (stage == Stages.Three) {
            return "https://raw.githubusercontent.com/kosuke-eth/mermon-NFT/develop/images/small_turtle.PNG";
        } else if (stage == Stages.Four) {
            return "https://raw.githubusercontent.com/kosuke-eth/mermon-NFT/develop/images/large_turtle.PNG";
        }
        return "";
    }

    // ステージを文字列に変換する関数
    function _stageToString(Stages stage) internal pure returns (string memory) {
        if (stage == Stages.One) return "One";
        if (stage == Stages.Two) return "Two";
        if (stage == Stages.Three) return "Three";
        if (stage == Stages.Four) return "Four";
        return "";
    }

    // 必要に応じてtokenURIのオーバーライド
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return super.tokenURI(tokenId);
    }
}
