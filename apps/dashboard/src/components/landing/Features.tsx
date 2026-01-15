'use client';

import { motion } from 'framer-motion';
import { Shield, Users, FileText, Lock } from 'lucide-react';

const features = [
    {
        name: 'Identity & Compliance',
        description: 'Built-in KYC/AML checks with on-chain identity registries. Whitelist investors by country or accreditation status.',
        icon: Users,
    },
    {
        name: 'Asset Factory',
        description: 'Deploy standardized, upgradeable RWA tokens using EIP-1167 Clones for gas efficiency and scale.',
        icon: Shield,
    },
    {
        name: 'Legal Recovery',
        description: 'Enforce court orders with protocol-level seizure mechanisms, ensuring full regulatory compliance.',
        icon: Lock,
    },
    {
        name: 'Document Management',
        description: 'Link legal prospectuses and terms directly to the asset on-chain via IPFS hashes.',
        icon: FileText,
    },
];

export function Features() {
    return (
        <section id="features" className="py-24 sm:py-32 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Capabilities</h2>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                        Everything you need to tokenize assets.
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        A complete SDK for issuing, managing, and trading real-world assets on the Mantle Network.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex flex-col"
                            >
                                <dt className="text-base font-semibold leading-7 text-gray-900 flex items-center gap-3">
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm border border-gray-200">
                                        <feature.icon className="h-5 w-5 text-gray-900" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </motion.div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
