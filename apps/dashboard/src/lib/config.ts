import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { foundry, mantleSepoliaTestnet, mantle } from 'wagmi/chains';

// Get WalletConnect Project ID from environment variables
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!walletConnectProjectId || walletConnectProjectId === 'your_walletconnect_project_id_here') {
    console.warn(
        '⚠️  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. WalletConnect will not work properly. ' +
        'Get your Project ID from https://cloud.walletconnect.com'
    );
}

// Determine which chain to use based on environment
const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '31337', 10);
const chains = 
    chainId === 31337 ? [foundry] :
    chainId === 5003 ? [mantleSepoliaTestnet] :
    chainId === 5000 ? [mantle] :
    [foundry]; // Default to foundry for local development

export const config = getDefaultConfig({
    appName: 'Mantle RWA Dashboard',
    projectId: walletConnectProjectId || '0000000000000000000000000000000000000000', // Fallback for build
    chains,
    ssr: true,
});
