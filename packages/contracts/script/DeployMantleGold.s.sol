// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/AssetFactory.sol";
import "../src/RWAToken.sol";
import "../src/ComplianceRegistry.sol";

/**
 * @title DeployMantleGold
 * @notice Deploys Mantle Gold token using the AssetFactory
 * @dev This script deploys a new RWA token called "Mantle Gold" (mGLD)
 * 
 * Prerequisites:
 * - AssetFactory must be deployed
 * - ComplianceRegistry must have a rule set (e.g., US_ACCREDITED)
 * 
 * Usage:
 * forge script script/DeployMantleGold.s.sol:DeployMantleGold \
 *   --rpc-url $MANTLE_SEPOLIA_RPC_URL \
 *   --private-key $PRIVATE_KEY \
 *   --broadcast \
 *   -vvvv
 */
contract DeployMantleGold is Script {
    // Update these addresses after deploying the base contracts
    address constant ASSET_FACTORY = 0xA2ad6661C9d9010C6b9Ec8C01047b70C824142C1;
    address constant COMPLIANCE_REGISTRY = 0xC638309139e4985e6483730aAd417edd87402aeE;
    
    // Compliance Rule ID (must match what's set in ComplianceRegistry)
    bytes32 constant COMPLIANCE_RULE_ID = keccak256("US_ACCREDITED");

    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerKey);
        
        console.log("Deploying Mantle Gold from address:", deployer);
        console.log("Using AssetFactory:", ASSET_FACTORY);

        vm.startBroadcast(deployerKey);

        AssetFactory factory = AssetFactory(ASSET_FACTORY);

        // Deploy Mantle Gold token
        console.log("\n=== Deploying Mantle Gold (mGLD) ===");
        address goldTokenAddr = factory.deployAsset(
            "Mantle Gold",
            "mGLD",
            COMPLIANCE_RULE_ID,
            0 // Initial supply (can mint later)
        );

        RWAToken goldToken = RWAToken(goldTokenAddr);

        console.log("\n=== Deployment Summary ===");
        console.log("Mantle Gold (mGLD) deployed at:", goldTokenAddr);
        console.log("Name:", goldToken.name());
        console.log("Symbol:", goldToken.symbol());
        console.log("\nCopy this address to your .env file as NEXT_PUBLIC_MANTLE_GOLD_ADDRESS");

        vm.stopBroadcast();
    }
}
