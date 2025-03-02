import Routers from './Routers';
import { SuiClientProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WalletProvider } from '@mysten/dapp-kit';

const queryClient = new QueryClient();
const networks = {
  devnet: { url: getFullnodeUrl('devnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  testnet_suiscan: { url: 'https://rpc-testnet.suiscan.xyz:443' },
  mainnet: { url: getFullnodeUrl('mainnet') },
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork='testnet_suiscan'>
        <WalletProvider autoConnect>
          <Routers />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export default App;
