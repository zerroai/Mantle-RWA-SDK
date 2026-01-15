'use client';

import Link from 'next/link';
import { Plus, Coins, ArrowRight } from 'lucide-react';
import { CONTRACT_ADDRESSES } from '@/lib/constants';

const assets = [
    {
        name: 'Mantle Gold',
        symbol: 'mGLD',
        address: CONTRACT_ADDRESSES.MantleGold,
        type: 'Commodity',
        status: 'Active',
    },
    // Add more mock assets or fetch from local storage if we implement that
];

export default function AssetsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Assets</h2>
                    <p className="text-gray-500">Manage your tokenized real-world assets.</p>
                </div>
                <Link
                    href="/dashboard/assets/deploy"
                    className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors"
                >
                    <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    Deploy Asset
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {assets.map((asset) => (
                    <div
                        key={asset.address}
                        className="relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50">
                                    <Coins className="h-6 w-6 text-yellow-600" />
                                </div>
                                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    {asset.status}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{asset.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{asset.symbol}</p>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Type</span>
                                    <span className="font-medium text-gray-900">{asset.type}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Address</span>
                                    <span className="font-mono text-gray-900 truncate max-w-[120px]">
                                        {asset.address.slice(0, 6)}...{asset.address.slice(-4)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-auto border-t border-gray-100 bg-gray-50 px-6 py-3">
                            <Link
                                href={`/dashboard/assets/${asset.address}`}
                                className="flex items-center justify-center text-sm font-medium text-gray-900 hover:text-gray-700"
                            >
                                Manage Asset <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
