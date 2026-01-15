'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import RWATokenABI from '@/lib/abis/RWAToken.json';
import { formatEther, parseEther } from 'viem';
import { ArrowLeft, Coins, PauseCircle, PlayCircle, FileText, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AssetDetailPage() {
    const params = useParams();
    const assetAddress = params.address as `0x${string}`;

    const [mintTo, setMintTo] = useState('');
    const [mintAmount, setMintAmount] = useState('');

    // Read Data
    const { data: name } = useReadContract({
        address: assetAddress,
        abi: RWATokenABI.abi,
        functionName: 'name',
    });

    const { data: symbol } = useReadContract({
        address: assetAddress,
        abi: RWATokenABI.abi,
        functionName: 'symbol',
    });

    const { data: totalSupply } = useReadContract({
        address: assetAddress,
        abi: RWATokenABI.abi,
        functionName: 'totalSupply',
    });

    const { data: paused, refetch: refetchPaused } = useReadContract({
        address: assetAddress,
        abi: RWATokenABI.abi,
        functionName: 'paused',
    });

    // Write Actions
    const { writeContract, data: hash, isPending } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const handleMint = (e: React.FormEvent) => {
        e.preventDefault();
        writeContract({
            address: assetAddress,
            abi: RWATokenABI.abi,
            functionName: 'mint',
            args: [mintTo as `0x${string}`, parseEther(mintAmount)],
        });
    };

    const togglePause = () => {
        writeContract({
            address: assetAddress,
            abi: RWATokenABI.abi,
            functionName: paused ? 'unpause' : 'pause',
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <Link href="/dashboard/assets" className="text-sm text-gray-500 hover:text-gray-900 flex items-center mb-4">
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to Assets
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
                            {name as string} <span className="text-gray-400 text-lg font-normal">({symbol as string})</span>
                        </h2>
                        <p className="text-gray-500 font-mono text-sm mt-1">{assetAddress}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={togglePause}
                            disabled={isPending}
                            className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border ${paused
                                    ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                                    : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                                }`}
                        >
                            {paused ? <PlayCircle className="mr-2 h-4 w-4" /> : <PauseCircle className="mr-2 h-4 w-4" />}
                            {paused ? 'Unpause Asset' : 'Pause Asset'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats */}
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Total Supply</div>
                        <div className="text-2xl font-semibold text-gray-900">
                            {totalSupply ? formatEther(totalSupply as bigint) : '0.00'}
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Holders</div>
                        <div className="text-2xl font-semibold text-gray-900">-</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Status</div>
                        <div className={`text-2xl font-semibold ${paused ? 'text-amber-600' : 'text-green-600'}`}>
                            {paused ? 'Paused' : 'Active'}
                        </div>
                    </div>
                </div>

                {/* Mint Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
                            <Coins className="h-5 w-5 text-gray-500" />
                            Mint Tokens
                        </h3>
                        <form onSubmit={handleMint} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Address</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="0x..."
                                    value={mintTo}
                                    onChange={(e) => setMintTo(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm p-2 border"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                                <input
                                    type="number"
                                    required
                                    placeholder="0.00"
                                    value={mintAmount}
                                    onChange={(e) => setMintAmount(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm p-2 border"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isPending || isConfirming}
                                className="flex items-center justify-center w-full rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending || isConfirming ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    'Mint Tokens'
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Documents (Placeholder) */}
                <div>
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-full">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-gray-500" />
                            Documents
                        </h3>
                        <div className="text-center py-8 text-gray-500 text-sm">
                            No documents uploaded yet.
                        </div>
                        <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Upload Document
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
