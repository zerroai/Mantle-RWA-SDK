'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useWalletClient } from 'wagmi';
import { MantleRWASDK } from '@mantle-rwa/sdk';
import { CONTRACT_ADDRESSES } from './constants';

interface SDKContextType {
    sdk: MantleRWASDK | null;
    isLoading: boolean;
}

const SDKContext = createContext<SDKContextType>({
    sdk: null,
    isLoading: true,
});

export function SDKProvider({ children }: { children: React.ReactNode }) {
    const { data: walletClient } = useWalletClient();
    const [sdk, setSdk] = useState<MantleRWASDK | null>(null);

    useEffect(() => {
        const initSDK = async () => {
            try {
                const rpcUrl =
                    process.env.NEXT_PUBLIC_RPC_URL ?? 'http://127.0.0.1:8545';

                const sdkInstance = new MantleRWASDK({
                    rpcUrl,
                    walletClient: walletClient as any, // Type compatibility between wagmi v3 and SDK
                    contractAddresses: {
                        identityRegistry: CONTRACT_ADDRESSES.IdentityRegistry,
                        complianceRegistry: CONTRACT_ADDRESSES.ComplianceRegistry,
                        assetFactory: CONTRACT_ADDRESSES.AssetFactory,
                    }
                });
                setSdk(sdkInstance);
            } catch (error) {
                console.error("Failed to initialize SDK:", error);
            }
        };

        initSDK();
    }, [walletClient]);

    return (
        <SDKContext.Provider value={{ sdk, isLoading: !sdk }}>
            {children}
        </SDKContext.Provider>
    );
}

export const useSDK = () => useContext(SDKContext);
