// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../../src/IdentityRegistry.sol";
import "../../src/ComplianceRegistry.sol";
import "../../src/RWAToken.sol";
import "../../src/AssetFactory.sol";

contract RWAIntegrationTest is Test {
    IdentityRegistry public identityRegistry;
    ComplianceRegistry public complianceRegistry;
    AssetFactory public assetFactory;
    RWAToken public rwaToken;
    RWAToken public implementation;

    address public admin = address(1);
    address public issuer = address(2);
    address public compliantUser = address(3);
    address public nonCompliantUser = address(4);
    address public restrictedUser = address(5);
    address public legalAuthority = address(6);

    bytes32 public constant US_ACCREDITED_RULE = keccak256("US_ACCREDITED");

    function setUp() public {
        vm.startPrank(admin);

        // 1. Deploy Infrastructure
        identityRegistry = new IdentityRegistry();
        complianceRegistry = new ComplianceRegistry(address(identityRegistry));
        implementation = new RWAToken();
        assetFactory = new AssetFactory(
            address(complianceRegistry),
            address(implementation)
        );

        // 2. Setup Compliance Rule: US (840) Accredited Only, Ban North Korea (408)
        uint16[] memory restricted = new uint16[](1);
        restricted[0] = 408;
        complianceRegistry.setRule(US_ACCREDITED_RULE, true, true, restricted);

        // 3. Setup Identities
        identityRegistry.grantRole(identityRegistry.REGISTRAR_ROLE(), admin);

        // Compliant: US, KYC, Accredited
        identityRegistry.setIdentity(compliantUser, 840, 5); // 101 binary

        // Non-Compliant: US, KYC, Not Accredited
        identityRegistry.setIdentity(nonCompliantUser, 840, 1); // 001 binary

        // Restricted: North Korea
        identityRegistry.setIdentity(restrictedUser, 408, 5);

        // Legal Authority: Compliant (needs to hold tokens to seize them)
        identityRegistry.setIdentity(legalAuthority, 840, 5);

        vm.stopPrank();
    }

    function testFullLifecycle() public {
        // 1. Deploy Asset
        vm.startPrank(issuer);
        address assetAddr = assetFactory.deployAsset(
            "Real Estate",
            "RET",
            US_ACCREDITED_RULE,
            0
        );
        rwaToken = RWAToken(assetAddr);

        // Grant roles to issuer for testing convenience (Factory makes msg.sender admin)
        rwaToken.grantRole(rwaToken.RECOVERY_ROLE(), legalAuthority);
        vm.stopPrank();

        // 2. Minting
        vm.startPrank(issuer);
        // Mint to compliant user -> Success
        rwaToken.mint(compliantUser, 1000);
        assertEq(rwaToken.balanceOf(compliantUser), 1000);

        // Mint to non-compliant user -> Fail
        vm.expectRevert("RWAToken: Recipient not compliant");
        rwaToken.mint(nonCompliantUser, 1000);
        vm.stopPrank();

        // 3. Transfers
        vm.startPrank(compliantUser);
        // Transfer to non-compliant -> Fail
        vm.expectRevert("RWAToken: Recipient not compliant");
        rwaToken.transfer(nonCompliantUser, 100);

        // Transfer to restricted -> Fail
        vm.expectRevert("RWAToken: Recipient not compliant");
        rwaToken.transfer(restrictedUser, 100);
        vm.stopPrank();

        // 4. Compliance Update & Transfer
        vm.startPrank(admin);
        // Make nonCompliantUser compliant (Give Accredited status)
        identityRegistry.setIdentity(nonCompliantUser, 840, 5);
        vm.stopPrank();

        vm.startPrank(compliantUser);
        // Now transfer should succeed
        rwaToken.transfer(nonCompliantUser, 100);
        assertEq(rwaToken.balanceOf(nonCompliantUser), 100);
        vm.stopPrank();

        // 5. Legal Seizure
        vm.startPrank(legalAuthority);
        // Seize funds from nonCompliantUser (who is now compliant, but maybe under investigation)
        rwaToken.forceTransfer(nonCompliantUser, legalAuthority, 100);
        assertEq(rwaToken.balanceOf(nonCompliantUser), 0);
        assertEq(rwaToken.balanceOf(legalAuthority), 100);
        vm.stopPrank();
    }
}
