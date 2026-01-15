import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { useSDK } from '@/lib/sdk-context';

export function useIdentity() {
    const { address } = useAccount();
    const { sdk } = useSDK();

    const { data, isLoading } = useQuery({
        queryKey: ['identity', address],
        queryFn: async () => {
            if (!sdk || !address) return null;

            const [countryCode, claims] = await Promise.all([
                sdk.identityRegistry.read.investorCountry([address]),
                sdk.identityRegistry.read.identityClaims([address])
            ]);

            return {
                countryCode: Number(countryCode),
                claims: Number(claims)
            };
        },
        enabled: !!sdk && !!address
    });

    const claims = data?.claims || 0;
    const isKYC = (claims & 1) === 1;
    const isAccredited = (claims & 4) === 4;

    return {
        countryCode: data?.countryCode || 0,
        isKYC,
        isAccredited,
        isLoading,
    };
}
