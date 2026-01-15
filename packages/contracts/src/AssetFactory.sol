// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./RWAToken.sol";

/**
 * @title AssetFactory
 * @notice Factory contract to deploy new RWA Tokens cheaply using Clones.
 * @dev Note: RWAToken needs to be Initializable for Clones to work properly.
 *      The current RWAToken uses constructor args, so Clones won't work directly
 *      without refactoring RWAToken to use an `initialize` function.
 *      For this MVP step, we will deploy full contracts or refactor RWAToken.
 *      Let's refactor RWAToken to be Initializable in the next step if we want Clones.
 *      For now, let's just deploy standard contracts to keep it simple and robust first.
 */
contract AssetFactory is AccessControl {
    event AssetDeployed(
        address indexed assetAddress,
        string name,
        string symbol,
        address indexed deployer
    );
    event ImplementationUpdated(address indexed newImplementation);

    address public complianceRegistry;
    address public tokenImplementation;

    constructor(address _complianceRegistry, address _tokenImplementation) {
        complianceRegistry = _complianceRegistry;
        tokenImplementation = _tokenImplementation;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function updateImplementation(
        address _newImplementation
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        tokenImplementation = _newImplementation;
        emit ImplementationUpdated(_newImplementation);
    }

    function deployAsset(
        string memory name,
        string memory symbol,
        bytes32 complianceRuleId,
        uint256 initialSupply
    ) external returns (address) {
        require(
            tokenImplementation != address(0),
            "AssetFactory: Implementation not set"
        );

        address clone = Clones.clone(tokenImplementation);
        RWAToken(clone).initialize(
            name,
            symbol,
            complianceRegistry,
            complianceRuleId,
            msg.sender // The deployer becomes the admin of the new token
        );

        if (initialSupply > 0) {
            // The deployer is the minter. They can mint after deployment.
        }

        emit AssetDeployed(clone, name, symbol, msg.sender);
        return clone;
    }
}
