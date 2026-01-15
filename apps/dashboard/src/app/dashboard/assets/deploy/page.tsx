'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESSES } from '@/lib/constants';
import AssetFactoryABI from '@/lib/abis/AssetFactory.json';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { keccak256, toBytes } from 'viem';

export default function DeployAssetPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [initialSupply, setInitialSupply] = useState('0');
    const [ruleId, setRuleId] = useState('US_ACCREDITED'); // Default example

    const { writeContract, data: hash, isPending } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const handleDeploy = (e: React.FormEvent) => {
        e.preventDefault();

        // Convert Rule ID string to bytes32
        const ruleIdBytes = keccak256(toBytes(ruleId));

        writeContract({
            address: CONTRACT_ADDRESSES.AssetFactory as `0x${string}`,
            abi: AssetFactoryABI.abi,
            functionName: 'deployAsset',
            args: [name, symbol, ruleIdBytes, BigInt(initialSupply)],
        });
    };

    if (isSuccess) {
        // In a real app, we'd parse the logs to get the new address
        // For now, redirect to assets list
        setTimeout(() => router.push('/dashboard/assets'), 2000);
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <Link href="/dashboard/assets" className="text-sm text-gray-500 hover:text-gray-900 flex items-center mb-4">
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to Assets
                </Link>
                <h2 className="text-2xl font-semibold text-gray-900">Deploy New Asset</h2>
                <p className="text-gray-500">Launch a new compliant RWA token using the factory.</p>
            </div>

            <form onSubmit={handleDeploy} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Token Name</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Real Estate Fund I"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm p-2 border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Token Symbol</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. REFI"
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm p-2 border"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Compliance Rule ID</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. US_ACCREDITED"
                        value={ruleId}
                        onChange={(e) => setRuleId(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm p-2 border"
                    />
                    <p className="mt-1 text-xs text-gray-500">The unique identifier for the compliance rule set in the registry.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Initial Supply</label>
                    <input
                        type="number"
                        min="0"
                        value={initialSupply}
                        onChange={(e) => setInitialSupply(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm p-2 border"
                    />
                    <p className="mt-1 text-xs text-gray-500">Tokens will be minted to your wallet upon deployment.</p>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isPending || isConfirming || isSuccess}
                        className="flex items-center justify-center w-full rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending || isConfirming ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deploying...
                            </>
                        ) : isSuccess ? (
                            'Deployed Successfully!'
                        ) : (
                            'Deploy Asset'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
