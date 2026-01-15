// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./ComplianceRegistry.sol";

/**
 * @title RWAToken
 * @notice An ERC-20 token representing a Real-World Asset.
 * @dev Integrates with ComplianceRegistry, supports Clones, and includes Legal Recovery.
 */
contract RWAToken is
    Initializable,
    ERC20Upgradeable,
    ERC20PausableUpgradeable,
    AccessControlUpgradeable
{
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant COMPLIANCE_ROLE = keccak256("COMPLIANCE_ROLE");
    bytes32 public constant RECOVERY_ROLE = keccak256("RECOVERY_ROLE");

    ComplianceRegistry public complianceRegistry;
    bytes32 public complianceRuleId;

    // ERC-1643 style document management
    struct Document {
        bytes32 docHash; // Hash of the document content
        uint256 lastModified;
        string uri; // IPFS or external link
    }
    mapping(bytes32 => Document) public documents;
    bytes32[] public docNames;

    event ComplianceRuleUpdated(bytes32 indexed newRuleId);
    event ComplianceRegistryUpdated(address indexed newRegistry);
    event DocumentUpdated(bytes32 indexed name, string uri, bytes32 docHash);
    event ForcedTransfer(
        address indexed from,
        address indexed to,
        uint256 amount
    );

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        string memory name,
        string memory symbol,
        address _complianceRegistry,
        bytes32 _complianceRuleId,
        address admin
    ) external initializer {
        __ERC20_init(name, symbol);
        __ERC20Pausable_init();
        __AccessControl_init();

        complianceRegistry = ComplianceRegistry(_complianceRegistry);
        complianceRuleId = _complianceRuleId;

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(MINTER_ROLE, admin);
        _grantRole(PAUSER_ROLE, admin);
        _grantRole(COMPLIANCE_ROLE, admin);
        _grantRole(RECOVERY_ROLE, admin);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        require(_checkCompliance(to), "RWAToken: Recipient not compliant");
        _mint(to, amount);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    /**
     * @notice Allows the admin (legal authority) to seize funds from a non-compliant or sanctioned address.
     * @dev Critical for RWA compliance (court orders).
     */
    function forceTransfer(
        address from,
        address to,
        uint256 amount
    ) external onlyRole(RECOVERY_ROLE) {
        require(to != address(0), "RWAToken: Transfer to zero address");
        _transfer(from, to, amount);
        emit ForcedTransfer(from, to, amount);
    }

    /**
     * @notice Updates or adds a legal document reference.
     * @param name The short name of the document (e.g. "Prospectus").
     * @param uri The URI to the document (e.g. IPFS hash).
     * @param docHash The hash of the document content for verification.
     */
    function setDocument(
        bytes32 name,
        string calldata uri,
        bytes32 docHash
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (documents[name].lastModified == 0) {
            docNames.push(name);
        }
        documents[name] = Document({
            docHash: docHash,
            lastModified: block.timestamp,
            uri: uri
        });
        emit DocumentUpdated(name, uri, docHash);
    }

    function setComplianceRuleId(
        bytes32 _newRuleId
    ) external onlyRole(COMPLIANCE_ROLE) {
        complianceRuleId = _newRuleId;
        emit ComplianceRuleUpdated(_newRuleId);
    }

    function setComplianceRegistry(
        address _newRegistry
    ) external onlyRole(COMPLIANCE_ROLE) {
        complianceRegistry = ComplianceRegistry(_newRegistry);
        emit ComplianceRegistryUpdated(_newRegistry);
    }

    /**
     * @dev Hook that is called before any transfer of tokens.
     * Includes minting and burning.
     */
    function _update(
        address from,
        address to,
        uint256 value
    ) internal virtual override(ERC20Upgradeable, ERC20PausableUpgradeable) {
        super._update(from, to, value);

        // Skip check for minting (handled in mint) and burning
        if (from != address(0) && to != address(0)) {
            require(_checkCompliance(to), "RWAToken: Recipient not compliant");
            // Optional: Check sender too? Usually just recipient matters for holding.
        }
    }

    function _checkCompliance(address user) internal view returns (bool) {
        // If no rule is set, allow everything (or should we default to deny?)
        // For safety in RWA, default to deny if registry is set.
        if (address(complianceRegistry) == address(0)) return true;

        return complianceRegistry.checkCompliance(user, complianceRuleId);
    }
}
