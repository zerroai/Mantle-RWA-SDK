import { useReadContract, useAccount } from 'wagmi';
import { CONTRACT_ADDRESSES } from '@/lib/constants';
import IdentityRegistryABI from '@/lib/abis/IdentityRegistry.json';
import { keccak256, toBytes } from 'viem';

export const REGISTRAR_ROLE = keccak256(toBytes("REGISTRAR_ROLE"));

export function useIsRegistrar() {
    const { address } = useAccount();

    const { data: hasRole, isLoading } = useReadContract({
        address: CONTRACT_ADDRESSES.IdentityRegistry as `0x${string}`,
        abi: IdentityRegistryABI.abi,
        functionName: 'hasRole',
        args: [REGISTRAR_ROLE, address],
        query: {
            enabled: !!address,
        }
    });

    return {
        isRegistrar: !!hasRole,
        isLoading,
    };
}
