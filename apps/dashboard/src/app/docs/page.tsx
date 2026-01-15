'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Copy, CheckCircle2, FileText, Search, X } from 'lucide-react';

interface Section {
    id: string;
    title: string;
    subsections?: { id: string; title: string }[];
}

const sections: Section[] = [
    { id: 'installation', title: 'Installation' },
    { id: 'configuration', title: 'Configuration' },
    {
        id: 'identity-registry',
        title: 'Identity Registry',
        subsections: [
            { id: 'identity-read', title: 'Read Identity' },
            { id: 'identity-write', title: 'Register Identity' }
        ]
    },
    {
        id: 'compliance-registry',
        title: 'Compliance Registry',
        subsections: [
            { id: 'compliance-check', title: 'Check Compliance' },
            { id: 'compliance-create', title: 'Create Rule' }
        ]
    },
    {
        id: 'asset-factory',
        title: 'Asset Factory',
        subsections: [
            { id: 'deploy-asset', title: 'Deploy Asset' }
        ]
    },
    {
        id: 'rwa-token',
        title: 'RWA Token',
        subsections: [
            { id: 'token-read', title: 'Read Token Info' },
            { id: 'token-operations', title: 'Token Operations' },
            { id: 'token-docs', title: 'Document Management' }
        ]
    },
    { id: 'first-deployment', title: 'First Deployment' },
    { id: 'contract-architecture', title: 'Contract Architecture' },
    { id: 'deployment', title: 'Deployment' },
    { id: 'security', title: 'Security' }
];

export default function DocumentationPage() {
    const [activeSection, setActiveSection] = useState<string>('installation');
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['installation']));
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;
            
            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.id);
                        setExpandedSections(prev => new Set([...prev, section.id]));
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sectionId)) {
                newSet.delete(sectionId);
            } else {
                newSet.add(sectionId);
            }
            return newSet;
        });
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setActiveSection(sectionId);
        }
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const CodeBlock = ({ code, language = 'typescript', id }: { code: string; language?: string; id?: string }) => (
        <div className="relative group">
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-white font-mono whitespace-pre-wrap break-words">
                    <code>{code}</code>
                </pre>
            </div>
            {id && (
                <button
                    onClick={() => copyToClipboard(code, id)}
                    className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Copy code"
                >
                    {copiedCode === id ? (
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                    ) : (
                        <Copy className="h-4 w-4" />
                    )}
                </button>
            )}
        </div>
    );

    const filteredSections = searchQuery
        ? sections.filter(s => 
            s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.subsections?.some(sub => sub.title.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        : sections;

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-xl font-semibold text-gray-900">
                            Mantle RWA SDK
                        </Link>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setShowSearch(!showSearch)}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                                title="Search documentation"
                            >
                                <Search className="h-5 w-5" />
                            </button>
                            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
                                Dashboard
                            </Link>
                            <Link href="/docs" className="text-sm font-medium text-gray-900">
                                Documentation
                            </Link>
                        </div>
                    </div>
                    {showSearch && (
                        <div className="mt-4 relative">
                            <input
                                type="text"
                                placeholder="Search documentation..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </header>

            <div className="flex">
                {/* Sidebar Navigation */}
                <aside className="hidden lg:block w-64 border-r border-gray-200 bg-gray-50 h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto">
                    <nav className="p-4 space-y-1">
                        {filteredSections.map((section) => (
                            <div key={section.id}>
                                <button
                                    onClick={() => {
                                        scrollToSection(section.id);
                                        if (section.subsections) {
                                            toggleSection(section.id);
                                        }
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                        activeSection === section.id
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <span>{section.title}</span>
                                    {section.subsections && (
                                        expandedSections.has(section.id) ? (
                                            <ChevronDown className="h-4 w-4" />
                                        ) : (
                                            <ChevronRight className="h-4 w-4" />
                                        )
                                    )}
                                </button>
                                {section.subsections && expandedSections.has(section.id) && (
                                    <div className="ml-4 mt-1 space-y-1">
                                        {section.subsections.map((subsection) => (
                                            <button
                                                key={subsection.id}
                                                onClick={() => scrollToSection(subsection.id)}
                                                className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${
                                                    activeSection === subsection.id
                                                        ? 'bg-gray-800 text-white'
                                                        : 'text-gray-600 hover:bg-gray-200'
                                                }`}
                                            >
                                                {subsection.title}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Hero */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-semibold text-gray-900 mb-4">
                            Documentation
                        </h1>
                        <p className="text-xl text-gray-600">
                            Complete guide to building compliant real-world asset applications on Mantle
                        </p>
                    </div>

                    {/* Installation */}
                    <section id="installation" className="mb-16 scroll-mt-20">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Installation</h2>
                        <p className="text-gray-600 mb-4">
                            Install the Mantle RWA SDK and its dependencies using npm, yarn, or pnpm.
                        </p>
                        <CodeBlock
                            code={`npm install @mantle-rwa/sdk viem
# or
yarn add @mantle-rwa/sdk viem
# or
pnpm add @mantle-rwa/sdk viem`}
                            id="install-code"
                        />
                    </section>

                    {/* Configuration */}
                    <section id="configuration" className="mb-16 scroll-mt-20">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Configuration</h2>
                        <p className="text-gray-600 mb-4">
                            Initialize the SDK with your RPC URL and deployed contract addresses.
                        </p>
                        <CodeBlock
                            code={`import { MantleRWASDK } from '@mantle-rwa/sdk';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mantleSepoliaTestnet } from 'viem/chains';

// Setup wallet client (optional, required for write operations)
const account = privateKeyToAccount('0x...');
const walletClient = createWalletClient({
  account,
  chain: mantleSepoliaTestnet,
  transport: http()
});

// Initialize SDK
const sdk = new MantleRWASDK({
  chain: mantleSepoliaTestnet,
  rpcUrl: 'https://rpc.sepolia.mantle.xyz',
  walletClient, // Optional, required for transactions
  contractAddresses: {
    identityRegistry: '0x...',
    complianceRegistry: '0x...',
    assetFactory: '0x...'
  }
});`}
                            id="config-code"
                        />
                    </section>

                    {/* Identity Registry */}
                    <section id="identity-registry" className="mb-16 scroll-mt-20">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Identity Registry</h2>
                        <p className="text-gray-600 mb-4">
                            The Identity Registry manages KYC/AML status and country codes for addresses. It uses a bitmap system for claims where:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2 ml-4">
                            <li>Bit 0: KYC Level 1 (value: 1)</li>
                            <li>Bit 1: KYC Level 2 (value: 2)</li>
                            <li>Bit 2: Accredited Investor (value: 4)</li>
                            <li>Bit 3+: Custom claims (value: 8, 16, 32, etc.)</li>
                        </ul>

                        <h3 id="identity-read" className="text-xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-20">Read Identity</h3>
                        <CodeBlock
                            code={`// Get country code
const country = await sdk.identityRegistry.read.investorCountry(['0xUserAddress']);

// Get claims bitmap
const claims = await sdk.identityRegistry.read.identityClaims(['0xUserAddress']);

// Check specific claim
const hasKYC = await sdk.identityRegistry.read.hasClaim(['0xUserAddress', 0]);
const isAccredited = await sdk.identityRegistry.read.hasClaim(['0xUserAddress', 2]);

// Check country
const isFromUS = await sdk.identityRegistry.read.isFromCountry(['0xUserAddress', 840]);`}
                            id="identity-read-code"
                        />

                        <h3 id="identity-write" className="text-xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-20">Register Identity</h3>
                        <p className="text-gray-600 mb-4">
                            Requires REGISTRAR_ROLE. Calculate claims bitmap: KYC (1) + Accredited (4) = 5
                        </p>
                        <CodeBlock
                            code={`// Register identity with KYC and Accredited status
const txHash = await sdk.registerIdentity(
  '0xUserAddress',
  840,  // Country code: 840 = USA (ISO 3166-1 numeric)
  5n    // Claims: KYC (1) + Accredited (4) = 5
);

// Wait for transaction
await sdk.publicClient.waitForTransactionReceipt({ hash: txHash });`}
                            id="identity-write-code"
                        />
                    </section>

                    {/* Compliance Registry */}
                    <section id="compliance-registry" className="mb-16 scroll-mt-20">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Compliance Registry</h2>
                        <p className="text-gray-600 mb-4">
                            The Compliance Registry defines and enforces rules for asset transfers. Rules can require KYC, accredited status, and restrict specific countries.
                        </p>

                        <h3 id="compliance-check" className="text-xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-20">Check Compliance</h3>
                        <CodeBlock
                            code={`import { keccak256, toBytes } from 'viem';

// Create rule ID
const ruleId = keccak256(toBytes('US_ACCREDITED'));

// Check if user complies with rule
const isCompliant = await sdk.complianceRegistry.read.checkCompliance([
  '0xUserAddress',
  ruleId
]);`}
                            id="compliance-check-code"
                        />

                        <h3 id="compliance-create" className="text-xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-20">Create Compliance Rule</h3>
                        <p className="text-gray-600 mb-4">
                            Requires COMPLIANCE_ADMIN_ROLE. Rules can be created via the dashboard or directly.
                        </p>
                        <CodeBlock
                            code={`import ComplianceRegistryABI from '@mantle-rwa/sdk/abis/ComplianceRegistry.json';

// Create US Accredited rule
const ruleId = keccak256(toBytes('US_ACCREDITED'));
const restrictedCountries: number[] = []; // Empty = no country restrictions

const { request } = await sdk.publicClient.simulateContract({
  address: sdk.config.contractAddresses.complianceRegistry,
  abi: ComplianceRegistryABI,
  functionName: 'setRule',
  args: [ruleId, true, true, restrictedCountries], // requiresAccredited, requiresKYC, restrictedCountries
  account: await walletClient.getAddresses()[0]
});

const txHash = await walletClient.writeContract(request);`}
                            id="compliance-create-code"
                        />
                    </section>

                    {/* Asset Factory */}
                    <section id="asset-factory" className="mb-16 scroll-mt-20">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Asset Factory</h2>
                        <p className="text-gray-600 mb-4">
                            The Asset Factory deploys new RWA tokens using the minimal proxy pattern (Clones) for gas efficiency.
                        </p>

                        <h3 id="deploy-asset" className="text-xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-20">Deploy Asset</h3>
                        <CodeBlock
                            code={`import { keccak256, toBytes } from 'viem';

// Create compliance rule ID
const ruleId = keccak256(toBytes('US_ACCREDITED'));

// Deploy new RWA token
const txHash = await sdk.deployAsset(
  'Mantle Gold',      // Token name
  'mGLD',             // Token symbol
  ruleId,             // Compliance rule ID
  0n                   // Initial supply (0 = no initial mint)
);

// Wait for deployment
const receipt = await sdk.publicClient.waitForTransactionReceipt({ hash: txHash });

// Extract deployed address from events
// The AssetDeployed event contains the new token address`}
                            id="deploy-asset-code"
                        />
                    </section>

                    {/* RWA Token */}
                    <section id="rwa-token" className="mb-16 scroll-mt-20">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">RWA Token</h2>
                        <p className="text-gray-600 mb-4">
                            RWA Token is an ERC-20 compatible token with built-in compliance checks, pausability, and document management.
                        </p>

                        <h3 id="token-read" className="text-xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-20">Get Token Instance</h3>
                        <CodeBlock
                            code={`// Get token instance
const token = sdk.getRWAToken('0xTokenAddress');

// Read token info
const name = await token.read.name();
const symbol = await token.read.symbol();
const totalSupply = await token.read.totalSupply();
const decimals = await token.read.decimals();`}
                            id="token-read-code"
                        />

                        <h3 id="token-operations" className="text-xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-20">Token Operations</h3>
                        <CodeBlock
                            code={`// Check balance
const balance = await token.read.balanceOf(['0xUserAddress']);

// Transfer tokens (compliance checked automatically)
const txHash = await token.write.transfer([
  '0xRecipient',
  1000000000000000000n // 1 token (18 decimals)
]);

// Mint tokens (requires MINTER_ROLE)
const mintTx = await token.write.mint([
  '0xRecipient',
  1000000000000000000n
]);

// Pause token (requires PAUSER_ROLE)
await token.write.pause();

// Unpause token
await token.write.unpause();`}
                            id="token-operations-code"
                        />

                        <h3 id="token-docs" className="text-xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-20">Document Management</h3>
                        <CodeBlock
                            code={`// Set document (requires DEFAULT_ADMIN_ROLE)
import { keccak256, toBytes } from 'viem';

const docName = keccak256(toBytes('Prospectus'));
const docHash = keccak256(toBytes('document content'));

await token.write.setDocument([
  docName,
  'ipfs://QmHash...', // Document URI
  docHash            // Document hash for verification
]);

// Read document
const document = await token.read.documents([docName]);
console.log('Document URI:', document.uri);
console.log('Document Hash:', document.docHash);`}
                            id="token-docs-code"
                        />
                    </section>

                    {/* First Deployment */}
                    <section id="first-deployment" className="mb-16 scroll-mt-20">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">First Deployment</h2>
                        <p className="text-gray-600 mb-4">
                            Complete example of deploying your first RWA token.
                        </p>
                        <CodeBlock
                            code={`import { MantleRWASDK } from '@mantle-rwa/sdk';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mantleSepoliaTestnet } from 'viem/chains';
import { keccak256, toBytes } from 'viem';

// 1. Setup wallet
const account = privateKeyToAccount('0xYourPrivateKey');
const walletClient = createWalletClient({
  account,
  chain: mantleSepoliaTestnet,
  transport: http('https://rpc.sepolia.mantle.xyz')
});

// 2. Initialize SDK
const sdk = new MantleRWASDK({
  chain: mantleSepoliaTestnet,
  rpcUrl: 'https://rpc.sepolia.mantle.xyz',
  walletClient,
  contractAddresses: {
    identityRegistry: '0x2B091b4E4D65123200723eC129f93b42b3e1cba9',
    complianceRegistry: '0xC638309139e4985e6483730aAd417edd87402aeE',
    assetFactory: '0xA2ad6661C9d9010C6b9Ec8C01047b70C824142C1'
  }
});

// 3. Create compliance rule (if not exists)
const ruleId = keccak256(toBytes('US_ACCREDITED'));
// ... create rule via dashboard or script

// 4. Deploy asset
const txHash = await sdk.deployAsset(
  'My Real Estate Fund',
  'REF',
  ruleId,
  0n
);

console.log('Deployment transaction:', txHash);

// 5. Get deployed address from transaction receipt
const receipt = await sdk.publicClient.waitForTransactionReceipt({ hash: txHash });
// Parse AssetDeployed event to get token address`}
                            id="first-deploy-code"
                        />
                    </section>

                    {/* Contract Architecture */}
                    <section id="contract-architecture" className="mb-16 scroll-mt-20">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Contract Architecture</h2>
                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">System Overview</h3>
                            <p className="text-gray-600 mb-4">
                                The Mantle RWA SDK consists of four core contracts:
                            </p>
                            <ul className="space-y-3 text-gray-600">
                                <li>
                                    <strong className="text-gray-900">IdentityRegistry</strong>: Manages KYC/AML status, country codes, and identity claims using a bitmap system.
                                </li>
                                <li>
                                    <strong className="text-gray-900">ComplianceRegistry</strong>: Defines compliance rules that check identity requirements (KYC, accredited status, country restrictions).
                                </li>
                                <li>
                                    <strong className="text-gray-900">AssetFactory</strong>: Factory contract using minimal proxy pattern (Clones) to deploy RWA tokens gas-efficiently.
                                </li>
                                <li>
                                    <strong className="text-gray-900">RWAToken</strong>: ERC-20 compatible token with compliance checks, pausability, document management, and legal recovery features.
                                </li>
                            </ul>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Access Control</h3>
                        <div className="bg-gray-50 rounded-lg p-6">
                            <ul className="space-y-2 text-gray-600">
                                <li><strong className="text-gray-900">REGISTRAR_ROLE</strong>: Can register/update identities in IdentityRegistry</li>
                                <li><strong className="text-gray-900">COMPLIANCE_ADMIN_ROLE</strong>: Can create/update compliance rules</li>
                                <li><strong className="text-gray-900">MINTER_ROLE</strong>: Can mint RWA tokens</li>
                                <li><strong className="text-gray-900">PAUSER_ROLE</strong>: Can pause/unpause RWA tokens</li>
                                <li><strong className="text-gray-900">RECOVERY_ROLE</strong>: Can force transfer tokens (legal recovery)</li>
                            </ul>
                        </div>
                    </section>

                    {/* Deployment */}
                    <section id="deployment" className="mb-16 scroll-mt-20">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Deployment</h2>
                        <p className="text-gray-600 mb-4">
                            Deploy contracts to Mantle Sepolia testnet or Mantle mainnet.
                        </p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <p className="text-sm text-blue-800">
                                <strong>Note:</strong> See the deployment guide in the project root for detailed deployment instructions.
                            </p>
                        </div>
                        <CodeBlock
                            code={`# Deploy to Mantle Sepolia
cd packages/contracts

# Set environment variables
export PRIVATE_KEY=your_private_key
export MANTLE_SEPOLIA_RPC_URL=https://rpc.sepolia.mantle.xyz

# Deploy contracts
forge script script/DeployMantleSepolia.s.sol:DeployMantleSepolia \\
  --rpc-url $MANTLE_SEPOLIA_RPC_URL \\
  --private-key $PRIVATE_KEY \\
  --broadcast \\
  -vvvv`}
                            id="deploy-code"
                        />
                    </section>

                    {/* Security */}
                    <section id="security" className="mb-16 scroll-mt-20">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Security Considerations</h2>
                        <div className="space-y-4 text-gray-600">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Audited Libraries</h3>
                                <p>All contracts are built on OpenZeppelin contracts, which are extensively audited and battle-tested.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Control</h3>
                                <p>Role-based access control (RBAC) is used throughout. Only authorized addresses can perform sensitive operations.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upgradeability</h3>
                                <p>RWAToken uses the upgradeable pattern, allowing for future improvements while maintaining state.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Gas Optimization</h3>
                                <p>The AssetFactory uses minimal proxy pattern (Clones) to reduce deployment costs by up to 99%.</p>
                            </div>
                        </div>
                    </section>

                    {/* Quick Links */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Additional Resources</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Link href="/dashboard" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <h3 className="font-semibold text-gray-900 mb-2">Dashboard</h3>
                                <p className="text-sm text-gray-600">Access the web dashboard for managing assets and identities</p>
                            </Link>
                            <a href="https://explorer.sepolia.mantle.xyz" target="_blank" rel="noopener noreferrer" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <h3 className="font-semibold text-gray-900 mb-2">Mantle Explorer</h3>
                                <p className="text-sm text-gray-600">View deployed contracts on Mantle Sepolia</p>
                            </a>
                        </div>
                    </section>
                </main>
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white py-12 mt-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-sm text-gray-600">
                        <p>© 2024 Mantle RWA SDK. Built for the decentralized future.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
