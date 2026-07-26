import axios from 'axios';

// Crypto IDs for CoinGecko
export const CRYPTO_IDS: Record<string, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  SOL: 'solana',
  BNB: 'binancecoin',
  USDT: 'tether',
};

// Get crypto prices from CoinGecko
export async function getCryptoPrices(cryptoIds: string[]) {
  try {
    const ids = cryptoIds.join(',');
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error;
  }
}

// Get market chart data from CoinGecko
export async function getMarketChart(cryptoId: string, days: string | number) {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching market chart:', error);
    throw error;
  }
}

// Bitcoin wallet info (Blockstream)
export async function getBitcoinWallet(address: string) {
  try {
    const [addressInfo, transactions] = await Promise.all([
      axios.get(`https://blockstream.info/api/address/${address}`),
      axios.get(`https://blockstream.info/api/address/${address}/txs`),
    ]);
    
    const confirmedBalance = (addressInfo.data.chain_stats.funded_txo_sum - addressInfo.data.chain_stats.spent_txo_sum) / 100000000;
    const unconfirmedBalance = (addressInfo.data.mempool_stats.funded_txo_sum - addressInfo.data.mempool_stats.spent_txo_sum) / 100000000;
    
    return {
      confirmedBalance,
      unconfirmedBalance,
      totalBalance: confirmedBalance + unconfirmedBalance,
      transactions: transactions.data.slice(0, 10).map((tx: any) => {
        const value = tx.vout.reduce((sum: number, output: any) => {
          if (output.scriptpubkey_address === address) {
            return sum + output.value;
          }
          return sum;
        }, 0) - tx.vin.reduce((sum: number, input: any) => {
          if (input.prevout?.scriptpubkey_address === address) {
            return sum + input.prevout.value;
          }
          return sum;
        }, 0);
        
        return {
          date: new Date(tx.status.block_time * 1000).toLocaleString(),
          amount: value / 100000000,
          hash: tx.txid,
        };
      }),
      totalTransactions: addressInfo.data.chain_stats.tx_count,
    };
  } catch (error) {
    console.error('Error fetching Bitcoin wallet:', error);
    throw error;
  }
}

// Ethereum wallet info (Etherscan)
export async function getEthereumWallet(address: string) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY || 'YourApiKeyToken';
    
    const [balanceRes, txListRes] = await Promise.all([
      axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`),
      axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`),
    ]);
    
    const balance = parseInt(balanceRes.data.result) / 1e18;
    const transactions = (txListRes.data.result || []).slice(0, 10).map((tx: any) => {
      const value = parseInt(tx.value) / 1e18;
      const isOutgoing = tx.from.toLowerCase() === address.toLowerCase();
      
      return {
        date: new Date(parseInt(tx.timeStamp) * 1000).toLocaleString(),
        amount: isOutgoing ? -value : value,
        hash: tx.hash,
      };
    });
    
    return {
      confirmedBalance: balance,
      unconfirmedBalance: 0,
      totalBalance: balance,
      transactions,
      totalTransactions: txListRes.data.result?.length || 0,
    };
  } catch (error) {
    console.error('Error fetching Ethereum wallet:', error);
    throw error;
  }
}

// Solana wallet info
export async function getSolanaWallet(address: string) {
  try {
    const response = await axios.post('https://api.mainnet-beta.solana.com', {
      jsonrpc: '2.0',
      id: 1,
      method: 'getBalance',
      params: [address],
    });
    
    const balance = (response.data.result?.value || 0) / 1e9;
    
    // Note: Getting transaction history on Solana requires more complex queries
    // For simplicity, we'll just show the balance
    return {
      confirmedBalance: balance,
      unconfirmedBalance: 0,
      totalBalance: balance,
      transactions: [],
      totalTransactions: 0,
    };
  } catch (error) {
    console.error('Error fetching Solana wallet:', error);
    throw error;
  }
}

// BNB wallet info (BscScan)
export async function getBNBWallet(address: string) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_BSCSCAN_API_KEY || 'YourApiKeyToken';
    
    const [balanceRes, txListRes] = await Promise.all([
      axios.get(`https://api.bscscan.com/api?module=account&action=balance&address=${address}&apikey=${apiKey}`),
      axios.get(`https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`),
    ]);
    
    const balance = parseInt(balanceRes.data.result) / 1e18;
    const transactions = (txListRes.data.result || []).slice(0, 10).map((tx: any) => {
      const value = parseInt(tx.value) / 1e18;
      const isOutgoing = tx.from.toLowerCase() === address.toLowerCase();
      
      return {
        date: new Date(parseInt(tx.timeStamp) * 1000).toLocaleString(),
        amount: isOutgoing ? -value : value,
        hash: tx.hash,
      };
    });
    
    return {
      confirmedBalance: balance,
      unconfirmedBalance: 0,
      totalBalance: balance,
      transactions,
      totalTransactions: txListRes.data.result?.length || 0,
    };
  } catch (error) {
    console.error('Error fetching BNB wallet:', error);
    throw error;
  }
}

// USDT TRC20 wallet info (TronGrid)
export async function getUSDTTRC20Wallet(address: string) {
  try {
    const response = await axios.get(`https://api.trongrid.io/v1/accounts/${address}`);
    
    // TRC20 USDT contract: TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t
    const usdtBalance = response.data.data?.[0]?.trc20?.find(
      (token: any) => token.TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t
    )?.TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t || 0;
    
    const balance = usdtBalance / 1e6;
    
    return {
      confirmedBalance: balance,
      unconfirmedBalance: 0,
      totalBalance: balance,
      transactions: [],
      totalTransactions: 0,
    };
  } catch (error) {
    console.error('Error fetching USDT TRC20 wallet:', error);
    throw error;
  }
}

// Main wallet fetch function
export async function getWalletInfo(crypto: string, address: string) {
  switch (crypto) {
    case 'BTC':
      return getBitcoinWallet(address);
    case 'ETH':
      return getEthereumWallet(address);
    case 'SOL':
      return getSolanaWallet(address);
    case 'BNB':
      return getBNBWallet(address);
    case 'USDT':
      return getUSDTTRC20Wallet(address);
    default:
      throw new Error('Unsupported cryptocurrency');
  }
}
