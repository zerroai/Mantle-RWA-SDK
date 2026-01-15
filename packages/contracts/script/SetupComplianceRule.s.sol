// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/ComplianceRegistry.sol";

/**
 * @title SetupComplianceRule
 * @notice Sets up a compliance rule in the ComplianceRegistry
 * @dev This script creates the "US_ACCREDITED" rule needed for Mantle Gold
 * 
 * Usage:
 * forge script script/SetupComplianceRule.s.sol:SetupComplianceRule \
 *   --rpc-url $MANTLE_SEPOLIA_RPC_URL \
 *   --private-key $PRIVATE_KEY \
 *   --broadcast \
 *   -vvvv
 */
contract SetupComplianceRule is Script {
    // Update with your deployed ComplianceRegistry address
    address constant COMPLIANCE_REGISTRY = 0xC638309139e4985e6483730aAd417edd87402aeE;
    
    // Rule ID
    bytes32 constant RULE_ID = keccak256("US_ACCREDITED");

    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerKey);
        
        console.log("Setting up compliance rule from address:", deployer);
        console.log("Using ComplianceRegistry:", COMPLIANCE_REGISTRY);

        vm.startBroadcast(deployerKey);

        ComplianceRegistry registry = ComplianceRegistry(COMPLIANCE_REGISTRY);

        // Set up US_ACCREDITED rule
        // Requires: Accredited Investor = true, KYC = true
        // Restricted countries: empty array (no restrictions)
        uint16[] memory restricted = new uint16[](0);
        
        console.log("\n=== Setting Compliance Rule ===");
        console.log("Rule ID:", vm.toString(RULE_ID));
        console.log("Requires Accredited: true");
        console.log("Requires KYC: true");
        console.log("Restricted Countries: none");
        
        registry.setRule(RULE_ID, true, true, restricted);
        
        console.log("\n✅ Compliance rule 'US_ACCREDITED' set successfully!");

        vm.stopBroadcast();
    }
}
