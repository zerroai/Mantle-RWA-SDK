# Mantle RWA SDK - Presentation & User Guide

## Overview

This guide provides step-by-step instructions for using the Mantle RWA SDK Dashboard and presenting it to stakeholders, investors, or potential users.

---

## Part 1: Dashboard User Guide

### Getting Started

#### Step 1: Access the Dashboard

1. Navigate to the dashboard URL (local: `http://localhost:3000` or deployed URL)
2. You'll see the landing page with:
   - Hero section with 3D animation
   - Feature highlights
   - Call-to-action buttons

#### Step 2: Connect Your Wallet

1. Click "Launch Dashboard" or navigate to `/dashboard`
2. Click "Connect Wallet" in the top right
3. Select your wallet provider (MetaMask, WalletConnect, etc.)
4. Approve the connection request
5. Ensure you're connected to Mantle Sepolia testnet

**Note**: Make sure you have testnet ETH in your wallet for transactions.

---

### Dashboard Features Walkthrough

#### 1. Overview Page (`/dashboard`)

**What you'll see:**
- Identity Status Card: Shows your KYC verification, accreditation status, and country code
- Portfolio Value Card: Displays your RWA token holdings (e.g., Mantle Gold)

**Key Actions:**
- View your current identity status
- Check your token balances
- Navigate to other sections

**Presentation Tips:**
- Highlight the real-time identity verification
- Show how compliance status is displayed clearly
- Demonstrate the portfolio tracking

#### 2. Assets Page (`/dashboard/assets`)

**What you'll see:**
- List of all deployed RWA tokens
- Each asset card shows:
  - Name and symbol
  - Type and status
  - Contract address
  - Quick access to asset details

**Key Actions:**
- View all your assets
- Deploy new assets (click "Deploy Asset")
- Access individual asset management

**Presentation Tips:**
- Show the clean, organized asset list
- Highlight the "Deploy Asset" button
- Demonstrate how easy it is to view asset details

#### 3. Deploy Asset (`/dashboard/assets/deploy`)

**Step-by-Step Deployment:**

1. **Fill in Asset Details:**
   - Token Name: e.g., "Real Estate Fund I"
   - Token Symbol: e.g., "REFI"
   - Compliance Rule ID: e.g., "US_ACCREDITED"
   - Initial Supply: e.g., 0 (or desired amount)

2. **Deploy:**
   - Click "Deploy Asset"
   - Approve the transaction in your wallet
   - Wait for confirmation

3. **Result:**
   - Asset is deployed and appears in your assets list
   - You become the admin/minter of the token

**Presentation Tips:**
- Show how simple the deployment form is
- Highlight that it takes just minutes
- Demonstrate the gas efficiency (show transaction cost)
- Show the instant appearance in assets list

#### 4. Asset Detail Page (`/dashboard/assets/[address]`)

**What you'll see:**
- Asset name, symbol, and address
- Total supply, holders count, status
- Mint tokens form
- Pause/Unpause controls
- Document management section

**Key Actions:**

**Mint Tokens:**
1. Enter recipient address
2. Enter amount
3. Click "Mint Tokens"
4. Approve transaction

**Pause/Unpause:**
- Click the pause/unpause button
- Useful for emergency situations or compliance issues

**Presentation Tips:**
- Show the comprehensive asset management
- Demonstrate minting process
- Highlight pause functionality for compliance
- Show document management (future feature)

#### 5. Identity Management (`/dashboard/identity`)

**For Regular Users:**
- View your identity status
- See your country code
- Check verification levels (KYC, Accredited)

**For Registrars (Admin Role):**

**Register/Update Identity:**
1. Enter target address
2. Select country code (ISO numeric, e.g., 840 for USA)
3. Check appropriate claims:
   - KYC Verified (Level 1)
   - Accredited Investor
4. Click "Update Identity"
5. Approve transaction

**Presentation Tips:**
- Show the registrar panel (if you have the role)
- Demonstrate identity registration process
- Explain the claims bitmap system
- Show how compliance is enforced

#### 6. Compliance Rules (`/dashboard/compliance`)

**Create Compliance Rule:**
1. Enter Rule ID: e.g., "US_ACCREDITED"
2. Set requirements:
   - Require KYC: Check if KYC is mandatory
   - Require Accreditation: Check if accredited status is needed
3. Add restricted countries (comma-separated ISO codes)
4. Click "Save Rule"

**Common Rule Examples:**
- **US_ACCREDITED**: Requires KYC + Accreditation, no country restrictions
- **GLOBAL_RETAIL**: Requires KYC only, restricts sanctioned countries
- **EU_ONLY**: Requires KYC, restricts non-EU countries

**Presentation Tips:**
- Show rule creation interface
- Demonstrate different rule configurations
- Explain how rules enforce compliance automatically
- Show the flexibility of the system

#### 7. Settings (`/dashboard/settings`)

**Available Settings:**
- Notifications toggle
- Privacy mode
- Developer mode

**Presentation Tips:**
- Show the settings interface
- Highlight user preferences
- Mention future settings that can be added

---

## Part 2: Presentation Guide

### Pre-Presentation Setup

#### 1. Environment Preparation

```bash
# Ensure contracts are deployed
cd packages/contracts
forge script script/DeployMantleSepolia.s.sol:DeployMantleSepolia \
  --rpc-url $MANTLE_SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast

# Update .env.local with deployed addresses
cd ../../apps/dashboard
# Edit .env.local with contract addresses

# Start the dashboard
npm run dev
```

#### 2. Test Accounts Setup

**Create test identities:**
- Account 1: Compliant user (KYC + Accredited)
- Account 2: Non-compliant user (KYC only)
- Account 3: Registrar account (for identity management)

#### 3. Pre-Deploy Assets

Deploy at least one test asset before the presentation:
- Name: "Mantle Gold"
- Symbol: "mGLD"
- Rule: US_ACCREDITED

---

### Presentation Structure

#### Slide 1: Introduction (2 minutes)

**Key Points:**
- What is RWA tokenization?
- Current challenges in the market
- Our solution overview

**Demo:**
- Show landing page
- Highlight key features visually

#### Slide 2: Problem Statement (3 minutes)

**Key Points:**
- Regulatory compliance is complex
- High development costs
- Gas inefficiency
- Lack of standardization

**Visual:**
- Show comparison charts if available
- Reference real-world pain points

#### Slide 3: Solution Overview (5 minutes)

**Key Points:**
- Four core components
- Complete infrastructure stack
- Built-in compliance

**Demo:**
- Navigate to documentation page
- Show architecture diagram
- Explain each component briefly

#### Slide 4: Live Demo - Identity Management (5 minutes)

**Steps:**
1. Go to `/dashboard/identity`
2. Show current identity status
3. If registrar: Register a new identity
4. Explain the claims system
5. Show how compliance is checked

**Key Messages:**
- "Identity is managed on-chain"
- "Compliance is automated"
- "No manual verification needed"

#### Slide 5: Live Demo - Compliance Rules (5 minutes)

**Steps:**
1. Go to `/dashboard/compliance`
2. Show existing rules
3. Create a new rule (if time permits)
4. Explain rule configuration
5. Show how rules enforce compliance

**Key Messages:**
- "Flexible rule system"
- "Supports multiple jurisdictions"
- "Easy to configure"

#### Slide 6: Live Demo - Asset Deployment (7 minutes)

**Steps:**
1. Go to `/dashboard/assets/deploy`
2. Fill in asset details
3. Deploy the asset
4. Show transaction in wallet
5. Show asset appearing in list
6. Navigate to asset details

**Key Messages:**
- "Deploy in minutes, not months"
- "Gas-efficient deployment"
- "One-click deployment"

#### Slide 7: Live Demo - Asset Management (5 minutes)

**Steps:**
1. Go to asset detail page
2. Show asset information
3. Mint tokens to a compliant address
4. Show pause functionality
5. Explain document management

**Key Messages:**
- "Complete asset lifecycle management"
- "Built-in compliance checks"
- "Emergency controls available"

#### Slide 8: Technical Deep Dive (5 minutes)

**Key Points:**
- Smart contract architecture
- Gas optimization techniques
- Security measures
- SDK capabilities

**Demo:**
- Show code examples from documentation
- Highlight SDK usage
- Show contract addresses on explorer

#### Slide 9: Use Cases (3 minutes)

**Examples:**
- Real estate tokenization
- Commodity tokenization
- Private equity funds
- Debt instruments

**Visual:**
- Show how each use case maps to features
- Reference real-world applications

#### Slide 10: Competitive Advantages (3 minutes)

**Key Points:**
- Complete solution (not just contracts)
- Built-in compliance
- Gas efficiency
- Developer-friendly
- Open source

#### Slide 11: Roadmap & Future (2 minutes)

**Key Points:**
- Current status
- Upcoming features
- Community growth
- Enterprise services

#### Slide 12: Q&A Preparation (5 minutes)

**Common Questions & Answers:**

**Q: How does compliance work?**
A: Compliance is checked on-chain for every transfer. Rules are defined in the Compliance Registry and automatically enforced.

**Q: What about regulatory changes?**
A: Rules can be updated by compliance admins. The system is flexible to adapt to changing regulations.

**Q: How much does it cost to deploy?**
A: Using the minimal proxy pattern, deployment costs are 99% lower than standard ERC-20 tokens.

**Q: Is this production-ready?**
A: Yes, contracts are deployed on Mantle Sepolia and ready for mainnet. All code is audited and tested.

**Q: What chains are supported?**
A: Currently Mantle Sepolia and ready for Mantle Mainnet. Can be deployed on any EVM-compatible chain.

**Q: How do I get started?**
A: Install the SDK, deploy contracts, and start building. Full documentation is available.

---

### Presentation Best Practices

#### 1. Preparation
- Test all features before presenting
- Have backup screenshots ready
- Prepare test accounts with appropriate roles
- Ensure stable internet connection

#### 2. During Presentation
- Start with the problem, then the solution
- Use live demos to show real functionality
- Pause for questions
- Show enthusiasm for the technology

#### 3. Technical Demos
- Keep demos simple and focused
- Have a script but be flexible
- Show both success and edge cases
- Explain what's happening behind the scenes

#### 4. Handling Questions
- Listen carefully to questions
- Provide specific examples
- Reference documentation when appropriate
- Admit when you don't know and offer to follow up

#### 5. Closing
- Summarize key benefits
- Provide next steps
- Share contact information
- Offer to schedule follow-up demos

---

### Demo Scenarios

#### Scenario 1: Quick Overview (10 minutes)

**Focus:**
- Landing page
- Dashboard overview
- Asset deployment
- Compliance demonstration

**Perfect for:**
- Initial introductions
- Investor pitches
- Quick demos

#### Scenario 2: Technical Deep Dive (30 minutes)

**Focus:**
- All features in detail
- Code examples
- Architecture discussion
- SDK usage

**Perfect for:**
- Developer audiences
- Technical stakeholders
- Integration discussions

#### Scenario 3: Business Use Case (20 minutes)

**Focus:**
- Real estate tokenization example
- Compliance workflow
- Cost savings
- Time to market

**Perfect for:**
- Business stakeholders
- Potential clients
- Partnership discussions

---

### Troubleshooting During Presentation

#### Wallet Connection Issues
- **Problem**: Wallet won't connect
- **Solution**: Check network (should be Mantle Sepolia), refresh page, try different wallet

#### Transaction Failures
- **Problem**: Transactions failing
- **Solution**: Check gas, ensure sufficient balance, verify contract addresses

#### Missing Features
- **Problem**: Feature not working as expected
- **Solution**: Check console for errors, verify environment variables, ensure contracts are deployed

#### Slow Performance
- **Problem**: Dashboard is slow
- **Solution**: Check RPC connection, clear cache, ensure local node is running (if using)

---

### Post-Presentation Follow-Up

#### Materials to Share
- Documentation link
- GitHub repository
- SDK npm package
- Deployment guides
- Contact information

#### Next Steps
- Schedule technical deep dive if needed
- Provide access to testnet environment
- Share additional resources
- Set up follow-up meetings

---

## Quick Reference: Key URLs

- **Dashboard**: `/dashboard`
- **Documentation**: `/docs`
- **Assets**: `/dashboard/assets`
- **Deploy Asset**: `/dashboard/assets/deploy`
- **Identity**: `/dashboard/identity`
- **Compliance**: `/dashboard/compliance`
- **Settings**: `/dashboard/settings`

## Quick Reference: Key Actions

1. **Deploy Asset**: Dashboard → Assets → Deploy Asset
2. **Register Identity**: Dashboard → Identity → Registrar Panel
3. **Create Rule**: Dashboard → Compliance → Create Rule
4. **Mint Tokens**: Dashboard → Assets → [Asset] → Mint Tokens
5. **View Documentation**: Click "Documentation" in header or sidebar

---

## Tips for Success

1. **Practice the demo** - Run through it multiple times
2. **Prepare test data** - Have identities and assets ready
3. **Know your audience** - Adjust technical depth accordingly
4. **Show, don't just tell** - Live demos are more impactful
5. **Be honest** - Admit limitations and future improvements
6. **Tell a story** - Connect features to real-world problems
7. **Engage the audience** - Ask questions, encourage participation

---

*Last Updated: January 2024*
