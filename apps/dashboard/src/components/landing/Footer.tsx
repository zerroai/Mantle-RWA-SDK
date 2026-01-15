export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <div className="h-6 w-6 bg-gray-900 rounded-full"></div>
                    <span className="font-semibold text-gray-900">Mantle RWA SDK</span>
                </div>
                <div className="flex gap-8 text-sm text-gray-500">
                    <a href="#" className="hover:text-gray-900 transition-colors">Documentation</a>
                    <a href="#" className="hover:text-gray-900 transition-colors">GitHub</a>
                    <a href="#" className="hover:text-gray-900 transition-colors">Legal</a>
                </div>
                <div className="mt-4 md:mt-0 text-sm text-gray-400">
                    © 2025 Mantle RWA. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
