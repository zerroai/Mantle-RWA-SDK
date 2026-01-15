// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../../src/AssetFactory.sol";
import "../../src/RWAToken.sol";
import "../../src/ComplianceRegistry.sol";
import "../../src/IdentityRegistry.sol";

contract AssetFactoryTest is Test {
    AssetFactory public factory;
    RWAToken public implementation;
    ComplianceRegistry public compliance;
    IdentityRegistry public identity;

    address public admin = address(1);

    function setUp() public {
        vm.startPrank(admin);
        identity = new IdentityRegistry();
        compliance = new ComplianceRegistry(address(identity));
        implementation = new RWAToken();
        factory = new AssetFactory(
            address(compliance),
            address(implementation)
        );
        vm.stopPrank();
    }

    function testDeployAsset() public {
        vm.startPrank(admin);
        address asset = factory.deployAsset("Test Token", "TT", bytes32(0), 0);

        RWAToken token = RWAToken(asset);
        assertEq(token.name(), "Test Token");
        assertEq(token.symbol(), "TT");
        assertTrue(token.hasRole(token.DEFAULT_ADMIN_ROLE(), admin));
        vm.stopPrank();
    }

    function testUpdateImplementation() public {
        vm.startPrank(admin);
        RWAToken newImpl = new RWAToken();
        factory.updateImplementation(address(newImpl));
        assertEq(factory.tokenImplementation(), address(newImpl));
        vm.stopPrank();
    }

    function testAccessControl() public {
        address user = address(2);
        vm.startPrank(user);
        vm.expectRevert();
        factory.updateImplementation(address(0));
        vm.stopPrank();
    }
}
