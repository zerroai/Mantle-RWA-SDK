'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Scene3D } from './Scene3D';

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-white pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-screen flex items-center">
            {/* 3D Background Scene */}
            <div className="absolute inset-0 w-full h-full opacity-30">
                <Scene3D />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 mb-8">
                            <span className="flex h-2 w-2 rounded-full bg-gray-500 mr-2 animate-pulse"></span>
                            Mantle RWA SDK v1.0
                        </span>
                        <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl mb-8">
                            The infrastructure for <br />
                            <span className="text-gray-500">real-world assets.</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                            Deploy compliant, tokenized assets with enterprise-grade precision.
                            Built on Mantle, secured by identity, and designed for scale.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="/dashboard"
                                className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-all duration-200 flex items-center gap-2"
                            >
                                Launch Dashboard <ArrowRight className="w-4 h-4" />
                            </a>
                            <a 
                                href="/docs" 
                                className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-2 hover:text-gray-600 transition-colors"
                            >
                                View Documentation
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Subtle Background Grid */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        </section>
    );
}
