// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./IdentityRegistry.sol";

/**
 * @title ComplianceRegistry
 * @notice Manages global compliance rules for RWA tokens.
 * @dev Defines rules like "US Accredited Only" or "Non-US Retail".
 */
contract ComplianceRegistry is AccessControl {
    bytes32 public constant COMPLIANCE_ADMIN_ROLE =
        keccak256("COMPLIANCE_ADMIN_ROLE");

    IdentityRegistry public immutable identityRegistry;

    struct Rule {
        bool requiresAccredited;
        bool requiresKYC;
        uint16[] restrictedCountries; // List of country codes that are BANNED
    }

    // Mapping from a Rule ID (e.g., keccak256("US_ACCREDITED")) to the Rule struct
    mapping(bytes32 => Rule) public rules;

    event RuleUpdated(
        bytes32 indexed ruleId,
        bool requiresAccredited,
        bool requiresKYC
    );

    constructor(address _identityRegistry) {
        identityRegistry = IdentityRegistry(_identityRegistry);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(COMPLIANCE_ADMIN_ROLE, msg.sender);
    }

    /**
     * @notice Creates or updates a compliance rule.
     * @param ruleId The unique identifier for the rule.
     * @param requiresAccredited Whether the user must be an accredited investor.
     * @param requiresKYC Whether the user must have KYC Level 1 (bit 0).
     * @param restrictedCountries List of country codes that are restricted.
     */
    function setRule(
        bytes32 ruleId,
        bool requiresAccredited,
        bool requiresKYC,
        uint16[] calldata restrictedCountries
    ) external onlyRole(COMPLIANCE_ADMIN_ROLE) {
        rules[ruleId] = Rule({
            requiresAccredited: requiresAccredited,
            requiresKYC: requiresKYC,
            restrictedCountries: restrictedCountries
        });
        emit RuleUpdated(ruleId, requiresAccredited, requiresKYC);
    }

    /**
     * @notice Checks if a user complies with a specific rule.
     * @param user The address of the user.
     * @param ruleId The identifier of the rule to check against.
     */
    function checkCompliance(
        address user,
        bytes32 ruleId
    ) external view returns (bool) {
        Rule memory rule = rules[ruleId];

        // 1. Check KYC
        if (rule.requiresKYC) {
            // Assuming bit 0 is basic KYC
            if (!identityRegistry.hasClaim(user, 0)) {
                return false;
            }
        }

        // 2. Check Accredited Status
        if (rule.requiresAccredited) {
            // Assuming bit 2 is Accredited Investor
            if (!identityRegistry.hasClaim(user, 2)) {
                return false;
            }
        }

        // 3. Check Country Restrictions
        uint16 userCountry = identityRegistry.investorCountry(user);
        for (uint256 i = 0; i < rule.restrictedCountries.length; i++) {
            if (userCountry == rule.restrictedCountries[i]) {
                return false;
            }
        }

        return true;
    }
}
