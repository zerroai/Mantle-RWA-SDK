// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/IdentityRegistry.sol";
import "../src/ComplianceRegistry.sol";
import "../src/RWAToken.sol";
import "../src/AssetFactory.sol";

contract DeployLocal is Script {
    // Default Anvil Key (Account 0)
    uint256 public deployerKey =
        0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;

    function run() external {
        vm.startBroadcast(deployerKey);

        // 1. Deploy Identity Registry
        IdentityRegistry identityRegistry = new IdentityRegistry();
        console.log("IdentityRegistry deployed at:", address(identityRegistry));

        // 2. Deploy Compliance Registry
        ComplianceRegistry complianceRegistry = new ComplianceRegistry(
            address(identityRegistry)
        );
        console.log(
            "ComplianceRegistry deployed at:",
            address(complianceRegistry)
        );

        // 3. Deploy RWAToken Implementation
        RWAToken implementation = new RWAToken();
        console.log(
            "RWAToken Implementation deployed at:",
            address(implementation)
        );

        // 4. Deploy Asset Factory
        AssetFactory assetFactory = new AssetFactory(
            address(complianceRegistry),
            address(implementation)
        );
        console.log("AssetFactory deployed at:", address(assetFactory));

        // --- Setup Demo Environment ---

        // A. Setup Compliance Rule: US Accredited (Rule ID 1)
        bytes32 ruleId = keccak256("US_ACCREDITED");
        uint16[] memory restricted = new uint16[](0);
        complianceRegistry.setRule(ruleId, true, true, restricted); // Req Accredited, Req KYC
        console.log("Compliance Rule 'US_ACCREDITED' set.");

        // B. Setup Identities
        // Alice: US (840), KYC (1) + Accredited (4) = 5
        address alice = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8; // Anvil Account 1
        identityRegistry.setIdentity(alice, 840, 5);
        console.log("Identity set for Alice (Compliant):", alice);

        // Bob: US (840), KYC (1) only = 1 (Not Accredited)
        address bob = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC; // Anvil Account 2
        identityRegistry.setIdentity(bob, 840, 1);
        console.log("Identity set for Bob (Non-Compliant):", bob);

        // C. Deploy an Asset
        address goldTokenAddr = assetFactory.deployAsset(
            "Mantle Gold",
            "mGLD",
            ruleId,
            0
        );
        RWAToken goldToken = RWAToken(goldTokenAddr);
        console.log("Mantle Gold (mGLD) deployed at:", goldTokenAddr);

        // D. Mint Tokens to Alice
        // Note: The deployer (this script) is the admin/minter of the new token because AssetFactory sets msg.sender as admin
        goldToken.mint(alice, 1000 * 10 ** 18);
        console.log("Minted 1000 mGLD to Alice");

        vm.stopBroadcast();
    }
}
