// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/IdentityRegistry.sol";
import "../src/ComplianceRegistry.sol";
import "../src/RWAToken.sol";
import "../src/AssetFactory.sol";

/**
 * @title DeployMantleSepolia
 * @notice Deployment script for Mantle Sepolia Testnet
 * @dev Deploys all contracts and sets up initial configuration
 * 
 * Usage:
 * forge script script/DeployMantleSepolia.s.sol:DeployMantleSepolia \
 *   --rpc-url $MANTLE_SEPOLIA_RPC_URL \
 *   --private-key $PRIVATE_KEY \
 *   --broadcast \
 *   --verify \
 *   --etherscan-api-key $MANTLE_API_KEY
 */
contract DeployMantleSepolia is Script {
    function run() external {
        // Get deployer from environment or use default
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerKey);
        
        console.log("Deploying from address:", deployer);
        console.log("Deployer balance:", deployer.balance / 1e18, "ETH");

        vm.startBroadcast(deployerKey);

        // 1. Deploy Identity Registry
        console.log("\n=== Deploying Identity Registry ===");
        IdentityRegistry identityRegistry = new IdentityRegistry();
        console.log("IdentityRegistry deployed at:", address(identityRegistry));

        // 2. Deploy Compliance Registry
        console.log("\n=== Deploying Compliance Registry ===");
        ComplianceRegistry complianceRegistry = new ComplianceRegistry(
            address(identityRegistry)
        );
        console.log(
            "ComplianceRegistry deployed at:",
            address(complianceRegistry)
        );

        // 3. Deploy RWAToken Implementation
        console.log("\n=== Deploying RWAToken Implementation ===");
        RWAToken implementation = new RWAToken();
        console.log(
            "RWAToken Implementation deployed at:",
            address(implementation)
        );

        // 4. Deploy Asset Factory
        console.log("\n=== Deploying Asset Factory ===");
        AssetFactory assetFactory = new AssetFactory(
            address(complianceRegistry),
            address(implementation)
        );
        console.log("AssetFactory deployed at:", address(assetFactory));

        vm.stopBroadcast();

        // Print summary
        console.log("\n=== Deployment Summary ===");
        console.log("IdentityRegistry:", address(identityRegistry));
        console.log("ComplianceRegistry:", address(complianceRegistry));
        console.log("RWATokenImplementation:", address(implementation));
        console.log("AssetFactory:", address(assetFactory));
        console.log("\nCopy these addresses to your .env file!");
    }
}
