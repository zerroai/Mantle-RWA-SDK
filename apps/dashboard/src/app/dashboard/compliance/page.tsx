'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESSES } from '@/lib/constants';
import ComplianceRegistryABI from '@/lib/abis/ComplianceRegistry.json';
import { Loader2, CheckCircle2, FileText } from 'lucide-react';
import { keccak256, toBytes } from 'viem';

export default function CompliancePage() {
    const [ruleId, setRuleId] = useState('');
    const [reqKYC, setReqKYC] = useState(true);
    const [reqAccredited, setReqAccredited] = useState(false);
    const [restrictedCountries, setRestrictedCountries] = useState('');

    const { writeContract, data: hash, isPending } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const handleSetRule = (e: React.FormEvent) => {
        e.preventDefault();

        const ruleIdBytes = keccak256(toBytes(ruleId));
        const countries = restrictedCountries
            .split(',')
            .map(c => parseInt(c.trim()))
            .filter(n => !isNaN(n));

        writeContract({
            address: CONTRACT_ADDRESSES.ComplianceRegistry as `0x${string}`,
            abi: ComplianceRegistryABI.abi,
            functionName: 'setRule',
            args: [ruleIdBytes, reqAccredited, reqKYC, countries],
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-semibold text-gray-900">Compliance Rules</h2>
                <p className="text-gray-500">Define global compliance policies for your assets.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Create Rule Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-medium text-gray-900 mb-6">Create / Update Rule</h3>

                        <form onSubmit={handleSetRule} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rule ID</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. EU_RETAIL"
                                    value={ruleId}
                                    onChange={(e) => setRuleId(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm p-2 border"
                                />
                                <p className="mt-1 text-xs text-gray-500">A unique string identifier for this rule set.</p>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700">Requirements</label>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={reqKYC}
                                            onChange={(e) => setReqKYC(e.target.checked)}
                                            className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                        />
                                        <span className="text-sm text-gray-700">Require KYC</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={reqAccredited}
                                            onChange={(e) => setReqAccredited(e.target.checked)}
                                            className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                        />
                                        <span className="text-sm text-gray-700">Require Accreditation</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Restricted Countries</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 408, 364 (Comma separated ISO codes)"
                                    value={restrictedCountries}
                                    onChange={(e) => setRestrictedCountries(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm p-2 border"
                                />
                                <p className="mt-1 text-xs text-gray-500">Users from these countries will be blocked.</p>
                            </div>

                            <button
                                type="submit"
                                disabled={isPending || isConfirming}
                                className="flex items-center justify-center w-full rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending || isConfirming ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving Rule...
                                    </>
                                ) : (
                                    'Save Rule'
                                )}
                            </button>

                            {isSuccess && (
                                <div className="rounded-md bg-green-50 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <CheckCircle2 className="h-5 w-5 text-green-400" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-green-800">Rule saved successfully</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                {/* Info Panel */}
                <div>
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Common Rules
                        </h3>
                        <ul className="space-y-4 text-sm text-gray-600">
                            <li className="pb-4 border-b border-gray-200 last:border-0">
                                <span className="font-medium text-gray-900 block mb-1">US_ACCREDITED</span>
                                Requires KYC + Accreditation. No country restrictions.
                            </li>
                            <li className="pb-4 border-b border-gray-200 last:border-0">
                                <span className="font-medium text-gray-900 block mb-1">GLOBAL_RETAIL</span>
                                Requires KYC only. Restricts US (840) and Sanctioned lists.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
