// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "../../src/RWAToken.sol";
import "../../src/ComplianceRegistry.sol";
import "../../src/IdentityRegistry.sol";

contract RWATokenTest is Test {
    RWAToken public token;
    ComplianceRegistry public compliance;
    IdentityRegistry public identity;

    address public admin = address(1);
    address public user1 = address(2);
    address public user2 = address(3);
    address public recoveryAgent = address(4);

    bytes32 public constant RULE_ID = keccak256("RULE");

    function setUp() public {
        vm.startPrank(admin);
        identity = new IdentityRegistry();
        compliance = new ComplianceRegistry(address(identity));

        // Setup basic rule: No restrictions for base tests, or specific restrictions
        uint16[] memory restricted = new uint16[](0);
        compliance.setRule(RULE_ID, false, false, restricted); // Open rule

        RWAToken impl = new RWAToken();
        address proxy = Clones.clone(address(impl));
        token = RWAToken(proxy);
        token.initialize("Test", "TST", address(compliance), RULE_ID, admin);

        // Setup roles
        token.grantRole(token.MINTER_ROLE(), admin);
        token.grantRole(token.RECOVERY_ROLE(), recoveryAgent);

        vm.stopPrank();
    }

    function testMint() public {
        vm.startPrank(admin);
        token.mint(user1, 100);
        assertEq(token.balanceOf(user1), 100);
        vm.stopPrank();
    }

    function testTransfer() public {
        vm.startPrank(admin);
        token.mint(user1, 100);
        vm.stopPrank();

        vm.startPrank(user1);
        token.transfer(user2, 50);
        assertEq(token.balanceOf(user1), 50);
        assertEq(token.balanceOf(user2), 50);
        vm.stopPrank();
    }

    function testPause() public {
        vm.startPrank(admin);
        token.pause();
        vm.stopPrank();

        vm.startPrank(admin);
        vm.expectRevert(); // EnforcedPauser
        token.mint(user1, 100);
        vm.stopPrank();
    }

    function testForceTransfer() public {
        vm.startPrank(admin);
        token.mint(user1, 100);
        vm.stopPrank();

        vm.startPrank(recoveryAgent);
        token.forceTransfer(user1, user2, 100);
        assertEq(token.balanceOf(user1), 0);
        assertEq(token.balanceOf(user2), 100);
        vm.stopPrank();
    }

    function testSetDocument() public {
        vm.startPrank(admin);
        bytes32 docName = keccak256("DOC");
        token.setDocument(docName, "ipfs://test", bytes32(uint256(1)));

        (, , string memory uri) = token.documents(docName);
        assertEq(uri, "ipfs://test");
        vm.stopPrank();
    }
}
