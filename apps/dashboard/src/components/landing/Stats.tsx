'use client';

import { motion } from 'framer-motion';

const data = [
    { label: 'Q1', value: 30 },
    { label: 'Q2', value: 45 },
    { label: 'Q3', value: 60 },
    { label: 'Q4', value: 90 },
];

export function Stats() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl mb-6">
                            Scale with confidence.
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Our infrastructure is designed to handle high-frequency tokenized asset transfers with minimal latency and maximum security.
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <div className="text-4xl font-semibold text-gray-900 mb-2">$0.001</div>
                                <div className="text-sm text-gray-500 font-medium">Avg. Transaction Cost</div>
                            </div>
                            <div>
                                <div className="text-4xl font-semibold text-gray-900 mb-2">&lt; 1s</div>
                                <div className="text-sm text-gray-500 font-medium">Finality Time</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 lg:mt-0 relative">
                        <div className="absolute inset-0 bg-gray-100 rounded-2xl transform rotate-3"></div>
                        <div className="relative bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
                            <h3 className="text-sm font-medium text-gray-500 mb-6">Asset Liquidity Growth</h3>
                            <div className="h-64 flex items-end justify-between gap-4">
                                {data.map((item, index) => (
                                    <div key={item.label} className="w-full flex flex-col items-center gap-2">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${item.value}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                                            className="w-full bg-gray-900 rounded-t-sm opacity-90"
                                        ></motion.div>
                                        <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
