'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useIdentity } from '@/lib/hooks/useIdentity';
import { CONTRACT_ADDRESSES } from '@/lib/constants';
import RWATokenABI from '@/lib/abis/RWAToken.json';
import { ShieldCheck, ShieldAlert, Wallet, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { formatEther } from 'viem';

export default function DashboardPage() {
    const { address, isConnected } = useAccount();
    const { isKYC, isAccredited, countryCode, isLoading: isLoadingIdentity } = useIdentity();

    const { data: balance, isLoading: isLoadingBalance } = useReadContract({
        address: CONTRACT_ADDRESSES.MantleGold as `0x${string}`,
        abi: RWATokenABI.abi,
        functionName: 'balanceOf',
        args: [address],
        query: {
            enabled: !!address,
        }
    });

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Wallet className="h-8 w-8 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Connect your wallet</h2>
                <p className="text-gray-500 max-w-md mb-8">
                    Connect your wallet to view your portfolio, manage your identity, and trade real-world assets.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
                <p className="text-gray-500">Welcome back to your Mantle RWA dashboard.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Identity Status Card */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">Identity Status</h3>
                        {isKYC ? (
                            <ShieldCheck className="h-5 w-5 text-green-500" />
                        ) : (
                            <ShieldAlert className="h-5 w-5 text-amber-500" />
                        )}
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">KYC Verification</span>
                            <span className={`text-sm font-medium ${isKYC ? 'text-green-600' : 'text-amber-600'}`}>
                                {isKYC ? 'Verified' : 'Pending'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Accreditation</span>
                            <span className={`text-sm font-medium ${isAccredited ? 'text-green-600' : 'text-gray-500'}`}>
                                {isAccredited ? 'Verified' : 'None'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Country Code</span>
                            <span className="text-sm font-medium text-gray-900">
                                {countryCode > 0 ? countryCode : '-'}
                            </span>
                        </div>
                    </div>
                    {!isKYC && (
                        <div className="mt-6">
                            <Link
                                href="/dashboard/identity"
                                className="block w-full text-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Verify Identity
                            </Link>
                        </div>
                    )}
                </div>

                {/* Portfolio Value Card */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm md:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-medium text-gray-900">Portfolio Value</h3>
                        <span className="text-sm text-gray-500">Mantle Gold (mGLD)</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-semibold text-gray-900">
                            {balance ? formatEther(balance as bigint) : '0.00'}
                        </span>
                        <span className="text-lg text-gray-500">mGLD</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-8">
                        ≈ ${balance ? formatEther(balance as bigint) : '0.00'} USD
                    </p>
                    <div className="flex gap-3">
                        <Link
                            href="/dashboard/assets"
                            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            View Assets
                        </Link>
                        <button className="inline-flex items-center px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                            Deposit <ArrowUpRight className="ml-2 h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
