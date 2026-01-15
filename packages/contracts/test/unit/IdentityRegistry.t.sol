// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../../src/IdentityRegistry.sol";

contract IdentityRegistryTest is Test {
    IdentityRegistry public registry;
    address public admin = address(1);
    address public registrar = address(2);
    address public user = address(3);

    function setUp() public {
        vm.startPrank(admin);
        registry = new IdentityRegistry();
        registry.grantRole(registry.REGISTRAR_ROLE(), registrar);
        vm.stopPrank();
    }

    function testSetIdentity() public {
        vm.startPrank(registrar);
        // Country: US (840), Claims: KYC L1 (1) + Accredited (4) = 5
        registry.setIdentity(user, 840, 5);

        assertEq(registry.investorCountry(user), 840);
        assertTrue(registry.hasClaim(user, 0)); // KYC L1
        assertFalse(registry.hasClaim(user, 1)); // KYC L2
        assertTrue(registry.hasClaim(user, 2)); // Accredited
        assertTrue(registry.isFromCountry(user, 840));
        vm.stopPrank();
    }

    function testRemoveIdentity() public {
        vm.startPrank(registrar);
        registry.setIdentity(user, 840, 5);
        registry.removeIdentity(user);

        assertEq(registry.investorCountry(user), 0);
        assertEq(registry.identityClaims(user), 0);
        vm.stopPrank();
    }

    function testAccessControl() public {
        vm.startPrank(user); // Not a registrar
        vm.expectRevert();
        registry.setIdentity(user, 840, 5);
        vm.stopPrank();
    }
}
