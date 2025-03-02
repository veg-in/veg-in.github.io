import Routers from './Routers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { getFullnodeUrl } from '@mysten/sui/client';
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import '@mysten/dapp-kit/dist/index.css';

const queryClient = new QueryClient();

const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl('localnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  testnet_suiscan: { url: 'https://rpc-testnet.suiscan.xyz:443' },
  mainnet: { url: getFullnodeUrl('mainnet') },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork='testnet_suiscan'>
        <WalletProvider autoConnect>
          <Routers />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export default App;
