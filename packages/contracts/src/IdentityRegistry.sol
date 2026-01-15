// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title IdentityRegistry
 * @notice Manages identity verification status for addresses.
 * @dev Maps user addresses to their verified identity claims (KYC/AML status).
 */
contract IdentityRegistry is AccessControl {
    bytes32 public constant REGISTRAR_ROLE = keccak256("REGISTRAR_ROLE");

    // Mapping from user address to country code (ISO 3166-1 alpha-2 converted to uint16)
    // 0 means not verified or unknown.
    mapping(address => uint16) public investorCountry;

    // Mapping from user address to a bitmap of verification levels
    // e.g. bit 0 = KYC Level 1, bit 1 = KYC Level 2, bit 2 = Accredited Investor
    mapping(address => uint256) public identityClaims;

    event IdentityUpdated(address indexed user, uint16 country, uint256 claims);
    event IdentityRemoved(address indexed user);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(REGISTRAR_ROLE, msg.sender);
    }

    /**
     * @notice Sets the identity data for a user.
     * @param user The address of the user.
     * @param country The ISO 3166-1 numeric country code.
     * @param claims A bitmap of identity claims.
     */
    function setIdentity(
        address user,
        uint16 country,
        uint256 claims
    ) external onlyRole(REGISTRAR_ROLE) {
        investorCountry[user] = country;
        identityClaims[user] = claims;
        emit IdentityUpdated(user, country, claims);
    }

    /**
     * @notice Removes identity data for a user.
     * @param user The address of the user.
     */
    function removeIdentity(address user) external onlyRole(REGISTRAR_ROLE) {
        delete investorCountry[user];
        delete identityClaims[user];
        emit IdentityRemoved(user);
    }

    /**
     * @notice Checks if a user has a specific claim bit set.
     * @param user The address of the user.
     * @param claimBitIndex The index of the bit to check (0-255).
     */
    function hasClaim(
        address user,
        uint8 claimBitIndex
    ) external view returns (bool) {
        return (identityClaims[user] >> claimBitIndex) & 1 == 1;
    }

    /**
     * @notice Checks if a user is from a specific country.
     * @param user The address of the user.
     * @param country The country code to check.
     */
    function isFromCountry(
        address user,
        uint16 country
    ) external view returns (bool) {
        return investorCountry[user] == country;
    }
}
