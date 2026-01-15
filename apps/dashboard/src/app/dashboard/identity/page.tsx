'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useIdentity } from '@/lib/hooks/useIdentity';
import { useIsRegistrar } from '@/lib/hooks/useAccessControl';
import { CONTRACT_ADDRESSES } from '@/lib/constants';
import IdentityRegistryABI from '@/lib/abis/IdentityRegistry.json';
import { Shield, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function IdentityPage() {
    const { address } = useAccount();
    const { isKYC, isAccredited, countryCode } = useIdentity();
    const { isRegistrar } = useIsRegistrar();

    // Form State
    const [targetAddress, setTargetAddress] = useState('');
    const [targetCountry, setTargetCountry] = useState('840'); // Default US
    const [targetKYC, setTargetKYC] = useState(true);
    const [targetAccredited, setTargetAccredited] = useState(false);

    const { writeContract, data: hash, isPending } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const handleSetIdentity = (e: React.FormEvent) => {
        e.preventDefault();

        // Calculate Claims Bitmap
        // Bit 0: KYC (1)
        // Bit 2: Accredited (4)
        let claims = 0;
        if (targetKYC) claims += 1;
        if (targetAccredited) claims += 4;

        writeContract({
            address: CONTRACT_ADDRESSES.IdentityRegistry as `0x${string}`,
            abi: IdentityRegistryABI.abi,
            functionName: 'setIdentity',
            args: [targetAddress as `0x${string}`, Number(targetCountry), BigInt(claims)],
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-semibold text-gray-900">Identity Management</h2>
                <p className="text-gray-500">Manage on-chain identity and compliance status.</p>
            </div>

            {/* My Identity Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-gray-500" />
                    My Identity Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500 mb-1">Wallet Address</div>
                        <div className="font-mono text-sm text-gray-900 truncate">{address}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500 mb-1">Country Code</div>
                        <div className="font-medium text-gray-900">{countryCode || 'Not Set'}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500 mb-1">Verification Level</div>
                        <div className="flex gap-2 mt-1">
                            {isKYC && (
                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-50 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    KYC Verified
                                </span>
                            )}
                            {isAccredited && (
                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    Accredited
                                </span>
                            )}
                            {!isKYC && !isAccredited && (
                                <span className="text-sm text-gray-500">Unverified</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Registrar Panel */}
            {isRegistrar && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900">Registrar Panel</h3>
                        <p className="text-sm text-gray-500">You have registrar privileges. Update identity records for any user.</p>
                    </div>

                    <form onSubmit={handleSetIdentity} className="space-y-6 max-w-xl">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Target Address</label>
                            <input
                                type="text"
                                required
                                placeholder="0x..."
                                value={targetAddress}
                                onChange={(e) => setTargetAddress(e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm p-2 border"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country Code (ISO Numeric)</label>
                            <input
                                type="number"
                                required
                                placeholder="840 (USA)"
                                value={targetCountry}
                                onChange={(e) => setTargetCountry(e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm p-2 border"
                            />
                            <p className="mt-1 text-xs text-gray-500">840 = USA, 826 = UK, 392 = Japan</p>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700">Claims</label>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={targetKYC}
                                        onChange={(e) => setTargetKYC(e.target.checked)}
                                        className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                    />
                                    <span className="text-sm text-gray-700">KYC Verified (Level 1)</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={targetAccredited}
                                        onChange={(e) => setTargetAccredited(e.target.checked)}
                                        className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                    />
                                    <span className="text-sm text-gray-700">Accredited Investor</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending || isConfirming}
                            className="flex items-center justify-center w-full rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending || isConfirming ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Update Identity'
                            )}
                        </button>

                        {isSuccess && (
                            <div className="rounded-md bg-green-50 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <CheckCircle2 className="h-5 w-5 text-green-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-green-800">Identity updated successfully</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
}
