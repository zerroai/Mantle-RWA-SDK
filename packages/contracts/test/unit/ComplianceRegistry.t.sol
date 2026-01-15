// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../../src/ComplianceRegistry.sol";
import "../../src/IdentityRegistry.sol";

contract ComplianceRegistryTest is Test {
    ComplianceRegistry public compliance;
    IdentityRegistry public identity;

    address public admin = address(1);
    address public complianceAdmin = address(2);
    address public user = address(3);

    bytes32 public constant RULE_ID = keccak256("RULE_1");

    function setUp() public {
        vm.startPrank(admin);
        identity = new IdentityRegistry();
        compliance = new ComplianceRegistry(address(identity));
        compliance.grantRole(
            compliance.COMPLIANCE_ADMIN_ROLE(),
            complianceAdmin
        );

        // Make admin the registrar for identity setup
        identity.grantRole(identity.REGISTRAR_ROLE(), admin);
        vm.stopPrank();
    }

    function testSetRule() public {
        vm.startPrank(complianceAdmin);
        uint16[] memory restricted = new uint16[](1);
        restricted[0] = 100; // Ban country 100

        compliance.setRule(RULE_ID, true, true, restricted);

        (bool reqAcc, bool reqKYC) = compliance.rules(RULE_ID);
        assertTrue(reqAcc);
        assertTrue(reqKYC);
        vm.stopPrank();
    }

    function testCheckComplianceSuccess() public {
        // Setup Rule: KYC + Accredited, No bans
        vm.startPrank(complianceAdmin);
        uint16[] memory restricted = new uint16[](0);
        compliance.setRule(RULE_ID, true, true, restricted);
        vm.stopPrank();

        // Setup User: KYC (bit 0) + Accredited (bit 2) = 5
        vm.startPrank(admin);
        identity.setIdentity(user, 840, 5);
        vm.stopPrank();

        assertTrue(compliance.checkCompliance(user, RULE_ID));
    }

    function testCheckComplianceFailKYC() public {
        // Setup Rule: KYC required
        vm.startPrank(complianceAdmin);
        uint16[] memory restricted = new uint16[](0);
        compliance.setRule(RULE_ID, false, true, restricted);
        vm.stopPrank();

        // Setup User: No KYC
        vm.startPrank(admin);
        identity.setIdentity(user, 840, 0);
        vm.stopPrank();

        assertFalse(compliance.checkCompliance(user, RULE_ID));
    }

    function testCheckComplianceFailAccredited() public {
        // Setup Rule: Accredited required
        vm.startPrank(complianceAdmin);
        uint16[] memory restricted = new uint16[](0);
        compliance.setRule(RULE_ID, true, false, restricted);
        vm.stopPrank();

        // Setup User: KYC only (1)
        vm.startPrank(admin);
        identity.setIdentity(user, 840, 1);
        vm.stopPrank();

        assertFalse(compliance.checkCompliance(user, RULE_ID));
    }

    function testCheckComplianceFailCountry() public {
        // Setup Rule: Ban country 100
        vm.startPrank(complianceAdmin);
        uint16[] memory restricted = new uint16[](1);
        restricted[0] = 100;
        compliance.setRule(RULE_ID, false, false, restricted);
        vm.stopPrank();

        // Setup User: From country 100
        vm.startPrank(admin);
        identity.setIdentity(user, 100, 0);
        vm.stopPrank();

        assertFalse(compliance.checkCompliance(user, RULE_ID));
    }
}
