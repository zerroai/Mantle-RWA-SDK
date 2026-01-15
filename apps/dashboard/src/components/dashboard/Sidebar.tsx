'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShieldCheck, Coins, FileText, Settings, LogOut } from 'lucide-react';
import { clsx } from 'clsx';

const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Assets', href: '/dashboard/assets', icon: Coins },
    { name: 'Identity', href: '/dashboard/identity', icon: ShieldCheck },
    { name: 'Compliance', href: '/dashboard/compliance', icon: FileText },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const externalLinks = [
    { name: 'Documentation', href: '/docs', icon: FileText },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
            <div className="flex h-16 items-center px-6 border-b border-gray-100">
                <div className="h-6 w-6 bg-gray-900 rounded-full mr-3"></div>
                <span className="text-lg font-semibold text-gray-900">Mantle RWA</span>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                isActive
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors'
                            )}
                        >
                            <item.icon
                                className={clsx(
                                    isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-500',
                                    'mr-3 h-5 w-5 flex-shrink-0'
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t border-gray-200 p-4 space-y-2">
                {externalLinks.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                        <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                        {item.name}
                    </Link>
                ))}
                <button className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                    <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    Disconnect
                </button>
            </div>
        </div>
    );
}
