'use client';

import { Settings, Bell, Shield } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
                <p className="text-gray-500">Manage your dashboard preferences.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <Bell className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Notifications</h3>
                            <p className="text-sm text-gray-500">Receive alerts for asset updates.</p>
                        </div>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                        <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                    </div>
                </div>

                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <Shield className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Privacy Mode</h3>
                            <p className="text-sm text-gray-500">Hide balance values in dashboard.</p>
                        </div>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                        <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                    </div>
                </div>

                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <Settings className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Developer Mode</h3>
                            <p className="text-sm text-gray-500">Show raw contract data.</p>
                        </div>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                        <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                    </div>
                </div>
            </div>

            <div className="text-center text-sm text-gray-400 pt-8">
                Mantle RWA SDK Dashboard v1.0.0
            </div>
        </div>
    );
}
