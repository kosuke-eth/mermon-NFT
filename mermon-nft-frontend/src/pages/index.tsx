import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from '../styles/page.module.css';
import { readContract, writeContract, waitForTransactionReceipt } from '@wagmi/core';
import { abi } from '../abi/mermon';
import { config } from '../wagmi';

const CONTRACT_ADDRESS = "0xC92c9BE2D75b5489316748Ab555802A2e51d728b";

export default function Home() {
  const [isSendingTx, setIsSendingTx] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    "https://raw.githubusercontent.com/kosuke-eth/mermon-NFT/develop/images/egg.PNG"
  );
  const [tokenId, setTokenId] = useState(3);
  const [mercari, setMercari] = useState(0);
  const [merharo, setMerharo] = useState(0);
  const [merpay, setMerpay] = useState(0);
  const [mercoin, setMercoin] = useState(0);

  // トークンURIを取得する関数
  const fetchTokenImage = async () => {
    try {
      const tokenUri = await readContract(config, {
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'tokenURI',
        args: [tokenId], // tokenId = 1
      });

      console.log('tokenURI:', tokenUri);

      // JSONをデコードして画像URLを取得
      const tokenData = JSON.parse(tokenUri);
      setImageUrl(tokenData.image);
    } catch (error) {
      console.error('トークンURIの取得エラー:', error);
    }
  };

  // コンポーネント初期化時に実行
  useEffect(() => {
    fetchTokenImage();
  }, [tokenId]); // tokenIdが変更されるたびに実行

  const handleGrow = async () => {
    setIsSendingTx(true);
    try {
      // コントラクト呼び出し
      const tx = await writeContract(config, {
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'feed',
        args: [tokenId, mercari, merharo, merpay, mercoin],
      });

      console.log('トランザクション送信中:', tx);

      // トランザクションの完了待機
      const receipt = await waitForTransactionReceipt(config, { hash: tx.hash });

      console.log('トランザクションが完了しました:', receipt);
      alert('成長が完了しました！');
    } catch (error) {
      console.error('エラーが発生しました:', error);
      alert('エラーが発生しました。コンソールを確認してください。');
    } finally {
      setIsSendingTx(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>メルモン</h2>
      <div className={styles.avatarContainer}>
        <img
          src={imageUrl} // 動的に取得したURLを設定
          alt="メルモン"
          className={styles.avatar}
        />
        <div className={styles.info}>
          <p className={styles.growthValue}>
            12,000<br />成長値
          </p>
          <p className={styles.coupon}>
            50%<br />クーポン
          </p>
        </div>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progress}></div>
        <div className={styles.stageIndicator}>
          <span>V2</span>
          <span>V3</span>
          <span>V4</span>
        </div>
      </div>
      <div className={styles.card}>
        <h3 className={styles.currbentStage}>V3</h3>
        <p>現在成長値: 12,000</p>
        <p>V4まで: 18,000</p>
        <a
          href="https://testnets.opensea.io/ja/collection/mermonnft-1"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          OpenSeaで確認
        </a>
        <div>
          <label className={styles.label}>
            Token ID:
            <input
              className={styles.inputField}
              type="number"
              value={tokenId}
              onChange={(e) => setTokenId(Number(e.target.value))}
            />
          </label>
          <label className={styles.label}>
            Mercari:
            <input
              className={styles.inputField}
              type="number"
              value={mercari}
              onChange={(e) => setMercari(Number(e.target.value))}
            />
          </label>
          <label className={styles.label}>
            Merharo:
            <input
              className={styles.inputField}
              type="number"
              value={merharo}
              onChange={(e) => setMerharo(Number(e.target.value))}
            />
          </label>
          <label className={styles.label}>
            Merpay:
            <input
              className={styles.inputField}
              type="number"
              value={merpay}
              onChange={(e) => setMerpay(Number(e.target.value))}
            />
          </label>
          <label className={styles.label}>
            Mercoin:
            <input
              className={styles.inputField}
              type="number"
              value={mercoin}
              onChange={(e) => setMercoin(Number(e.target.value))}
            />
          </label>
        </div>
        <button
          className={styles.growButton}
          onClick={handleGrow}
          disabled={isSendingTx}
        >
          {isSendingTx ? '実行中...' : '成長させる'}
        </button>
      </div>
      <div className={styles.options}>
        <button className={styles.optionButton}>現在の特典</button>
        <button className={styles.optionButton}>獲得したクーポン</button>
        <button className={styles.optionButton}>メルモン一覧</button>
      </div>
      <div className={styles.score}>
        <p>メルモンスコア</p>
        <h3>P3,600</h3>
      </div>
      <button className={styles.shopButton}>メルモンショップ</button>

      {/* MetaMask接続ボタン */}
      <div className={styles.connectButton}>
        <ConnectButton />
      </div>
    </div>
  );
}
