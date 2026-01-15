import * as viem from 'viem';
import { Chain, WalletClient, Address, PublicClient } from 'viem';

interface MantleRWASDKConfig {
    chain?: Chain;
    rpcUrl?: string;
    walletClient?: WalletClient;
    contractAddresses: {
        identityRegistry: Address;
        complianceRegistry: Address;
        assetFactory: Address;
    };
}
declare class MantleRWASDK {
    publicClient: PublicClient;
    walletClient?: WalletClient;
    config: MantleRWASDKConfig;
    constructor(config: MantleRWASDKConfig);
    private getContract;
    get identityRegistry(): {
        read: {
            [x: string]: (...parameters: [options?: viem.Prettify<viem.UnionOmit<viem.ReadContractParameters<({
                inputs: never[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string, readonly unknown[]>, "address" | "abi" | "args" | "functionName">> | undefined] | [args: readonly unknown[], options?: viem.Prettify<viem.UnionOmit<viem.ReadContractParameters<({
                inputs: never[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string, readonly unknown[]>, "address" | "abi" | "args" | "functionName">> | undefined]) => Promise<viem.ReadContractReturnType>;
        };
        estimateGas: {
            [x: string]: (...parameters: [options: viem.Prettify<viem.UnionOmit<viem.EstimateContractGasParameters<({
                inputs: never[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string, readonly unknown[], Chain | undefined>, "address" | "abi" | "args" | "functionName">>] | [args: readonly unknown[], options: viem.Prettify<viem.UnionOmit<viem.EstimateContractGasParameters<({
                inputs: never[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string, readonly unknown[], Chain | undefined>, "address" | "abi" | "args" | "functionName">>]) => Promise<viem.EstimateContractGasReturnType>;
        };
        simulate: {
            [x: string]: <chainOverride extends Chain | undefined = undefined, accountOverride extends viem.Account | Address | undefined = undefined>(...parameters: [options?: Omit<viem.SimulateContractParameters<({
                inputs: never[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string, readonly unknown[], Chain | undefined, chainOverride, accountOverride>, "address" | "abi" | "args" | "functionName"> | undefined] | [args: readonly unknown[], options?: Omit<viem.SimulateContractParameters<({
                inputs: never[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string, readonly unknown[], Chain | undefined, chainOverride, accountOverride>, "address" | "abi" | "args" | "functionName"> | undefined]) => Promise<viem.SimulateContractReturnType>;
        };
        createEventFilter: {
            [x: string]: <strict extends boolean | undefined = undefined>(...parameters: [options?: ({
                fromBlock?: bigint | viem.BlockTag | undefined;
                toBlock?: bigint | viem.BlockTag | undefined;
            } & {
                strict?: strict | undefined;
            }) | undefined] | [args: readonly unknown[] | {
                [x: string]: unknown;
                address?: undefined;
                abi?: undefined;
                eventName?: undefined;
                fromBlock?: undefined;
                strict?: undefined;
                toBlock?: undefined;
                args?: undefined;
            }, options?: ({
                fromBlock?: bigint | viem.BlockTag | undefined;
                toBlock?: bigint | viem.BlockTag | undefined;
            } & {
                strict?: strict | undefined;
            }) | undefined]) => Promise<viem.CreateContractEventFilterReturnType>;
        };
        getEvents: {
            [x: string]: (...parameters: [options?: {
                strict?: boolean | undefined;
                blockHash?: `0x${string}` | undefined;
                fromBlock?: bigint | viem.BlockTag | undefined;
                toBlock?: bigint | viem.BlockTag | undefined;
            } | undefined] | [args?: readonly unknown[] | {
                [x: string]: unknown;
                address?: undefined;
                abi?: undefined;
                args?: undefined;
                eventName?: undefined;
                fromBlock?: undefined;
                onError?: undefined;
                onLogs?: undefined;
                strict?: undefined;
                poll?: undefined;
                batch?: undefined;
                pollingInterval?: undefined;
            } | undefined, options?: {
                strict?: boolean | undefined;
                blockHash?: `0x${string}` | undefined;
                fromBlock?: bigint | viem.BlockTag | undefined;
                toBlock?: bigint | viem.BlockTag | undefined;
            } | undefined]) => Promise<viem.GetContractEventsReturnType<({
                inputs: never[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string>>;
        };
        watchEvent: {
            [x: string]: (...parameters: [options?: {
                batch?: boolean | undefined | undefined;
                pollingInterval?: number | undefined | undefined;
                strict?: boolean | undefined;
                fromBlock?: bigint | undefined;
                onError?: ((error: Error) => void) | undefined | undefined;
                onLogs: viem.WatchContractEventOnLogsFn<({
                    inputs: never[];
                    stateMutability: string;
                    type: string;
                    name?: undefined;
                    anonymous?: undefined;
                    outputs?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    type: string;
                    name: string;
                    stateMutability?: undefined;
                    anonymous?: undefined;
                    outputs?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                        indexed: boolean;
                    }[];
                    type: string;
                    name: string;
                    anonymous: boolean;
                    stateMutability?: undefined;
                    outputs?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    stateMutability: string;
                    type: string;
                    name: string;
                    outputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    anonymous?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    stateMutability: string;
                    type: string;
                    name: string;
                    anonymous?: undefined;
                    outputs?: undefined;
                })[], string, undefined>;
                poll?: true | undefined | undefined;
            } | undefined] | [args: readonly unknown[] | {
                [x: string]: unknown;
                address?: undefined;
                abi?: undefined;
                args?: undefined;
                eventName?: undefined;
                fromBlock?: undefined;
                onError?: undefined;
                onLogs?: undefined;
                strict?: undefined;
                poll?: undefined;
                batch?: undefined;
                pollingInterval?: undefined;
            }, options?: {
                batch?: boolean | undefined | undefined;
                pollingInterval?: number | undefined | undefined;
                strict?: boolean | undefined;
                fromBlock?: bigint | undefined;
                onError?: ((error: Error) => void) | undefined | undefined;
                onLogs: viem.WatchContractEventOnLogsFn<({
                    inputs: never[];
                    stateMutability: string;
                    type: string;
                    name?: undefined;
                    anonymous?: undefined;
                    outputs?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    type: string;
                    name: string;
                    stateMutability?: undefined;
                    anonymous?: undefined;
                    outputs?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                        indexed: boolean;
                    }[];
                    type: string;
                    name: string;
                    anonymous: boolean;
                    stateMutability?: undefined;
                    outputs?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    stateMutability: string;
                    type: string;
                    name: string;
                    outputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    anonymous?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    stateMutability: string;
                    type: string;
                    name: string;
                    anonymous?: undefined;
                    outputs?: undefined;
                })[], string, undefined>;
                poll?: true | undefined | undefined;
            } | undefined]) => viem.WatchContractEventReturnType;
        };
        address: `0x${string}`;
        abi: ({
            inputs: never[];
            stateMutability: string;
            type: string;
            name?: undefined;
            anonymous?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            type: string;
            name: string;
            stateMutability?: undefined;
            anonymous?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
                indexed: boolean;
            }[];
            type: string;
            name: string;
            anonymous: boolean;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            anonymous?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name: string;
            anonymous?: undefined;
            outputs?: undefined;
        })[];
    };
    get complianceRegistry(): {
        read: {
            [x: string]: (...parameters: [options?: viem.Prettify<viem.UnionOmit<viem.ReadContractParameters<({
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string, readonly unknown[]>, "address" | "abi" | "args" | "functionName">> | undefined] | [args: readonly unknown[], options?: viem.Prettify<viem.UnionOmit<viem.ReadContractParameters<({
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string, readonly unknown[]>, "address" | "abi" | "args" | "functionName">> | undefined]) => Promise<viem.ReadContractReturnType>;
        };
        estimateGas: {
            [x: string]: (...parameters: [options: viem.Prettify<viem.UnionOmit<viem.EstimateContractGasParameters<({
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string, readonly unknown[], Chain | undefined>, "address" | "abi" | "args" | "functionName">>] | [args: readonly unknown[], options: viem.Prettify<viem.UnionOmit<viem.EstimateContractGasParameters<({
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string, readonly unknown[], Chain | undefined>, "address" | "abi" | "args" | "functionName">>]) => Promise<viem.EstimateContractGasReturnType>;
        };
        simulate: {
            [x: string]: <chainOverride extends Chain | undefined = undefined, accountOverride extends viem.Account | Address | undefined = undefined>(...parameters: [options?: Omit<viem.SimulateContractParameters<({
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string, readonly unknown[], Chain | undefined, chainOverride, accountOverride>, "address" | "abi" | "args" | "functionName"> | undefined] | [args: readonly unknown[], options?: Omit<viem.SimulateContractParameters<({
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string, readonly unknown[], Chain | undefined, chainOverride, accountOverride>, "address" | "abi" | "args" | "functionName"> | undefined]) => Promise<viem.SimulateContractReturnType>;
        };
        createEventFilter: {
            [x: string]: <strict extends boolean | undefined = undefined>(...parameters: [options?: ({
                fromBlock?: bigint | viem.BlockTag | undefined;
                toBlock?: bigint | viem.BlockTag | undefined;
            } & {
                strict?: strict | undefined;
            }) | undefined] | [args: readonly unknown[] | {
                [x: string]: unknown;
                address?: undefined;
                abi?: undefined;
                eventName?: undefined;
                fromBlock?: undefined;
                strict?: undefined;
                toBlock?: undefined;
                args?: undefined;
            }, options?: ({
                fromBlock?: bigint | viem.BlockTag | undefined;
                toBlock?: bigint | viem.BlockTag | undefined;
            } & {
                strict?: strict | undefined;
            }) | undefined]) => Promise<viem.CreateContractEventFilterReturnType>;
        };
        getEvents: {
            [x: string]: (...parameters: [options?: {
                strict?: boolean | undefined;
                blockHash?: `0x${string}` | undefined;
                fromBlock?: bigint | viem.BlockTag | undefined;
                toBlock?: bigint | viem.BlockTag | undefined;
            } | undefined] | [args?: readonly unknown[] | {
                [x: string]: unknown;
                address?: undefined;
                abi?: undefined;
                args?: undefined;
                eventName?: undefined;
                fromBlock?: undefined;
                onError?: undefined;
                onLogs?: undefined;
                strict?: undefined;
                poll?: undefined;
                batch?: undefined;
                pollingInterval?: undefined;
            } | undefined, options?: {
                strict?: boolean | undefined;
                blockHash?: `0x${string}` | undefined;
                fromBlock?: bigint | viem.BlockTag | undefined;
                toBlock?: bigint | viem.BlockTag | undefined;
            } | undefined]) => Promise<viem.GetContractEventsReturnType<({
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string>>;
        };
        watchEvent: {
            [x: string]: (...parameters: [options?: {
                batch?: boolean | undefined | undefined;
                pollingInterval?: number | undefined | undefined;
                strict?: boolean | undefined;
                fromBlock?: bigint | undefined;
                onError?: ((error: Error) => void) | undefined | undefined;
                onLogs: viem.WatchContractEventOnLogsFn<({
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    stateMutability: string;
                    type: string;
                    name?: undefined;
                    anonymous?: undefined;
                    outputs?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    type: string;
                    name: string;
                    stateMutability?: undefined;
                    anonymous?: undefined;
                    outputs?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                        indexed: boolean;
                    }[];
                    type: string;
                    name: string;
                    anonymous: boolean;
                    stateMutability?: undefined;
                    outputs?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    stateMutability: string;
                    type: string;
                    name: string;
                    outputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    anonymous?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    stateMutability: string;
                    type: string;
                    name: string;
                    anonymous?: undefined;
                    outputs?: undefined;
                })[], string, undefined>;
                poll?: true | undefined | undefined;
            } | undefined] | [args: readonly unknown[] | {
                [x: string]: unknown;
                address?: undefined;
                abi?: undefined;
                args?: undefined;
                eventName?: undefined;
                fromBlock?: undefined;
                onError?: undefined;
                onLogs?: undefined;
                strict?: undefined;
                poll?: undefined;
                batch?: undefined;
                pollingInterval?: undefined;
            }, options?: {
                batch?: boolean | undefined | undefined;
                pollingInterval?: number | undefined | undefined;
                strict?: boolean | undefined;
                fromBlock?: bigint | undefined;
                onError?: ((error: Error) => void) | undefined | undefined;
                onLogs: viem.WatchContractEventOnLogsFn<({
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    stateMutability: string;
                    type: string;
                    name?: undefined;
                    anonymous?: undefined;
                    outputs?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    type: string;
                    name: string;
                    stateMutability?: undefined;
                    anonymous?: undefined;
                    outputs?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                        indexed: boolean;
                    }[];
                    type: string;
                    name: string;
                    anonymous: boolean;
                    stateMutability?: undefined;
                    outputs?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    stateMutability: string;
                    type: string;
                    name: string;
                    outputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    anonymous?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    stateMutability: string;
                    type: string;
                    name: string;
                    anonymous?: undefined;
                    outputs?: undefined;
                })[], string, undefined>;
                poll?: true | undefined | undefined;
            } | undefined]) => viem.WatchContractEventReturnType;
        };
        address: `0x${string}`;
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            anonymous?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            type: string;
            name: string;
            stateMutability?: undefined;
            anonymous?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
                indexed: boolean;
            }[];
            type: string;
            name: string;
            anonymous: boolean;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            anonymous?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name: string;
            anonymous?: undefined;
            outputs?: undefined;
        })[];
    };
    get assetFactory(): {
        read: {
            [x: string]: (...parameters: [options?: viem.Prettify<viem.UnionOmit<viem.ReadContractParameters<({
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string, readonly unknown[]>, "address" | "abi" | "args" | "functionName">> | undefined] | [args: readonly unknown[], options?: viem.Prettify<viem.UnionOmit<viem.ReadContractParameters<({
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string, readonly unknown[]>, "address" | "abi" | "args" | "functionName">> | undefined]) => Promise<viem.ReadContractReturnType>;
        };
        estimateGas: {
            [x: string]: (...parameters: [options: viem.Prettify<viem.UnionOmit<viem.EstimateContractGasParameters<({
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string, readonly unknown[], Chain | undefined>, "address" | "abi" | "args" | "functionName">>] | [args: readonly unknown[], options: viem.Prettify<viem.UnionOmit<viem.EstimateContractGasParameters<({
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string, readonly unknown[], Chain | undefined>, "address" | "abi" | "args" | "functionName">>]) => Promise<viem.EstimateContractGasReturnType>;
        };
        simulate: {
            [x: string]: <chainOverride extends Chain | undefined = undefined, accountOverride extends viem.Account | Address | undefined = undefined>(...parameters: [options?: Omit<viem.SimulateContractParameters<({
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string, readonly unknown[], Chain | undefined, chainOverride, accountOverride>, "address" | "abi" | "args" | "functionName"> | undefined] | [args: readonly unknown[], options?: Omit<viem.SimulateContractParameters<({
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string, readonly unknown[], Chain | undefined, chainOverride, accountOverride>, "address" | "abi" | "args" | "functionName"> | undefined]) => Promise<viem.SimulateContractReturnType>;
        };
        createEventFilter: {
            [x: string]: <strict extends boolean | undefined = undefined>(...parameters: [options?: ({
                fromBlock?: bigint | viem.BlockTag | undefined;
                toBlock?: bigint | viem.BlockTag | undefined;
            } & {
                strict?: strict | undefined;
            }) | undefined] | [args: readonly unknown[] | {
                [x: string]: unknown;
                address?: undefined;
                abi?: undefined;
                eventName?: undefined;
                fromBlock?: undefined;
                strict?: undefined;
                toBlock?: undefined;
                args?: undefined;
            }, options?: ({
                fromBlock?: bigint | viem.BlockTag | undefined;
                toBlock?: bigint | viem.BlockTag | undefined;
            } & {
                strict?: strict | undefined;
            }) | undefined]) => Promise<viem.CreateContractEventFilterReturnType>;
        };
        getEvents: {
            [x: string]: (...parameters: [options?: {
                strict?: boolean | undefined;
                blockHash?: `0x${string}` | undefined;
                fromBlock?: bigint | viem.BlockTag | undefined;
                toBlock?: bigint | viem.BlockTag | undefined;
            } | undefined] | [args?: readonly unknown[] | {
                [x: string]: unknown;
                address?: undefined;
                abi?: undefined;
                args?: undefined;
                eventName?: undefined;
                fromBlock?: undefined;
                onError?: undefined;
                onLogs?: undefined;
                strict?: undefined;
                poll?: undefined;
                batch?: undefined;
                pollingInterval?: undefined;
            } | undefined, options?: {
                strict?: boolean | undefined;
                blockHash?: `0x${string}` | undefined;
                fromBlock?: bigint | viem.BlockTag | undefined;
                toBlock?: bigint | viem.BlockTag | undefined;
            } | undefined]) => Promise<viem.GetContractEventsReturnType<({
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                type: string;
                name: string;
                stateMutability?: undefined;
                anonymous?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                    indexed: boolean;
                }[];
                type: string;
                name: string;
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                outputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                anonymous?: undefined;
            } | {
                inputs: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                stateMutability: string;
                type: string;
                name: string;
                anonymous?: undefined;
                outputs?: undefined;
            })[], string>>;
        };
        watchEvent: {
            [x: string]: (...parameters: [options?: {
                batch?: boolean | undefined | undefined;
                pollingInterval?: number | undefined | undefined;
                strict?: boolean | undefined;
                fromBlock?: bigint | undefined;
                onError?: ((error: Error) => void) | undefined | undefined;
                onLogs: viem.WatchContractEventOnLogsFn<({
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    stateMutability: string;
                    type: string;
                    name?: undefined;
                    anonymous?: undefined;
                    outputs?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    type: string;
                    name: string;
                    stateMutability?: undefined;
                    anonymous?: undefined;
                    outputs?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                        indexed: boolean;
                    }[];
                    type: string;
                    name: string;
                    anonymous: boolean;
                    stateMutability?: undefined;
                    outputs?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    stateMutability: string;
                    type: string;
                    name: string;
                    outputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    anonymous?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    stateMutability: string;
                    type: string;
                    name: string;
                    anonymous?: undefined;
                    outputs?: undefined;
                })[], string, undefined>;
                poll?: true | undefined | undefined;
            } | undefined] | [args: readonly unknown[] | {
                [x: string]: unknown;
                address?: undefined;
                abi?: undefined;
                args?: undefined;
                eventName?: undefined;
                fromBlock?: undefined;
                onError?: undefined;
                onLogs?: undefined;
                strict?: undefined;
                poll?: undefined;
                batch?: undefined;
                pollingInterval?: undefined;
            }, options?: {
                batch?: boolean | undefined | undefined;
                pollingInterval?: number | undefined | undefined;
                strict?: boolean | undefined;
                fromBlock?: bigint | undefined;
                onError?: ((error: Error) => void) | undefined | undefined;
                onLogs: viem.WatchContractEventOnLogsFn<({
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    stateMutability: string;
                    type: string;
                    name?: undefined;
                    anonymous?: undefined;
                    outputs?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    type: string;
                    name: string;
                    stateMutability?: undefined;
                    anonymous?: undefined;
                    outputs?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                        indexed: boolean;
                    }[];
                    type: string;
                    name: string;
                    anonymous: boolean;
                    stateMutability?: undefined;
                    outputs?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    stateMutability: string;
                    type: string;
                    name: string;
                    outputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    anonymous?: undefined;
                } | {
                    inputs: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    stateMutability: string;
                    type: string;
                    name: string;
                    anonymous?: undefined;
                    outputs?: undefined;
                })[], string, undefined>;
                poll?: true | undefined | undefined;
            } | undefined]) => viem.WatchContractEventReturnType;
        };
        address: `0x${string}`;
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            anonymous?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            type: string;
            name: string;
            stateMutability?: undefined;
            anonymous?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
                indexed: boolean;
            }[];
            type: string;
            name: string;
            anonymous: boolean;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            anonymous?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name: string;
            anonymous?: undefined;
            outputs?: undefined;
        })[];
    };
    getRWAToken(address: Address): {
        read: {
            [x: string]: (...parameters: [options?: viem.Prettify<viem.UnionOmit<viem.ReadContractParameters<({
                type: string;
                inputs: never[];
                stateMutability: string;
                name?: undefined;
                outputs?: undefined;
                anonymous?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                outputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                stateMutability: string;
                anonymous?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    indexed: boolean;
                    internalType: string;
                }[];
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                stateMutability?: undefined;
                outputs?: undefined;
                anonymous?: undefined;
            })[], string, readonly unknown[]>, "address" | "abi" | "args" | "functionName">> | undefined] | [args: readonly unknown[], options?: viem.Prettify<viem.UnionOmit<viem.ReadContractParameters<({
                type: string;
                inputs: never[];
                stateMutability: string;
                name?: undefined;
                outputs?: undefined;
                anonymous?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                outputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                stateMutability: string;
                anonymous?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    indexed: boolean;
                    internalType: string;
                }[];
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                stateMutability?: undefined;
                outputs?: undefined;
                anonymous?: undefined;
            })[], string, readonly unknown[]>, "address" | "abi" | "args" | "functionName">> | undefined]) => Promise<viem.ReadContractReturnType>;
        };
        estimateGas: {
            [x: string]: (...parameters: [options: viem.Prettify<viem.UnionOmit<viem.EstimateContractGasParameters<({
                type: string;
                inputs: never[];
                stateMutability: string;
                name?: undefined;
                outputs?: undefined;
                anonymous?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                outputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                stateMutability: string;
                anonymous?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    indexed: boolean;
                    internalType: string;
                }[];
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                stateMutability?: undefined;
                outputs?: undefined;
                anonymous?: undefined;
            })[], string, readonly unknown[], Chain | undefined>, "address" | "abi" | "args" | "functionName">>] | [args: readonly unknown[], options: viem.Prettify<viem.UnionOmit<viem.EstimateContractGasParameters<({
                type: string;
                inputs: never[];
                stateMutability: string;
                name?: undefined;
                outputs?: undefined;
                anonymous?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                outputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                stateMutability: string;
                anonymous?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    indexed: boolean;
                    internalType: string;
                }[];
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                stateMutability?: undefined;
                outputs?: undefined;
                anonymous?: undefined;
            })[], string, readonly unknown[], Chain | undefined>, "address" | "abi" | "args" | "functionName">>]) => Promise<viem.EstimateContractGasReturnType>;
        };
        simulate: {
            [x: string]: <chainOverride extends Chain | undefined = undefined, accountOverride extends viem.Account | Address | undefined = undefined>(...parameters: [options?: Omit<viem.SimulateContractParameters<({
                type: string;
                inputs: never[];
                stateMutability: string;
                name?: undefined;
                outputs?: undefined;
                anonymous?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                outputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                stateMutability: string;
                anonymous?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    indexed: boolean;
                    internalType: string;
                }[];
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                stateMutability?: undefined;
                outputs?: undefined;
                anonymous?: undefined;
            })[], string, readonly unknown[], Chain | undefined, chainOverride, accountOverride>, "address" | "abi" | "args" | "functionName"> | undefined] | [args: readonly unknown[], options?: Omit<viem.SimulateContractParameters<({
                type: string;
                inputs: never[];
                stateMutability: string;
                name?: undefined;
                outputs?: undefined;
                anonymous?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                outputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                stateMutability: string;
                anonymous?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    indexed: boolean;
                    internalType: string;
                }[];
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                stateMutability?: undefined;
                outputs?: undefined;
                anonymous?: undefined;
            })[], string, readonly unknown[], Chain | undefined, chainOverride, accountOverride>, "address" | "abi" | "args" | "functionName"> | undefined]) => Promise<viem.SimulateContractReturnType>;
        };
        createEventFilter: {
            [x: string]: <strict extends boolean | undefined = undefined>(...parameters: [options?: ({
                fromBlock?: bigint | viem.BlockTag | undefined;
                toBlock?: bigint | viem.BlockTag | undefined;
            } & {
                strict?: strict | undefined;
            }) | undefined] | [args: readonly unknown[] | {
                [x: string]: unknown;
                address?: undefined;
                abi?: undefined;
                eventName?: undefined;
                fromBlock?: undefined;
                strict?: undefined;
                toBlock?: undefined;
                args?: undefined;
            }, options?: ({
                fromBlock?: bigint | viem.BlockTag | undefined;
                toBlock?: bigint | viem.BlockTag | undefined;
            } & {
                strict?: strict | undefined;
            }) | undefined]) => Promise<viem.CreateContractEventFilterReturnType>;
        };
        getEvents: {
            [x: string]: (...parameters: [options?: {
                strict?: boolean | undefined;
                blockHash?: `0x${string}` | undefined;
                fromBlock?: bigint | viem.BlockTag | undefined;
                toBlock?: bigint | viem.BlockTag | undefined;
            } | undefined] | [args?: readonly unknown[] | {
                [x: string]: unknown;
                address?: undefined;
                abi?: undefined;
                args?: undefined;
                eventName?: undefined;
                fromBlock?: undefined;
                onError?: undefined;
                onLogs?: undefined;
                strict?: undefined;
                poll?: undefined;
                batch?: undefined;
                pollingInterval?: undefined;
            } | undefined, options?: {
                strict?: boolean | undefined;
                blockHash?: `0x${string}` | undefined;
                fromBlock?: bigint | viem.BlockTag | undefined;
                toBlock?: bigint | viem.BlockTag | undefined;
            } | undefined]) => Promise<viem.GetContractEventsReturnType<({
                type: string;
                inputs: never[];
                stateMutability: string;
                name?: undefined;
                outputs?: undefined;
                anonymous?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                outputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                stateMutability: string;
                anonymous?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    indexed: boolean;
                    internalType: string;
                }[];
                anonymous: boolean;
                stateMutability?: undefined;
                outputs?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                    internalType: string;
                }[];
                stateMutability?: undefined;
                outputs?: undefined;
                anonymous?: undefined;
            })[], string>>;
        };
        watchEvent: {
            [x: string]: (...parameters: [options?: {
                batch?: boolean | undefined | undefined;
                pollingInterval?: number | undefined | undefined;
                strict?: boolean | undefined;
                fromBlock?: bigint | undefined;
                onError?: ((error: Error) => void) | undefined | undefined;
                onLogs: viem.WatchContractEventOnLogsFn<({
                    type: string;
                    inputs: never[];
                    stateMutability: string;
                    name?: undefined;
                    outputs?: undefined;
                    anonymous?: undefined;
                } | {
                    type: string;
                    name: string;
                    inputs: {
                        name: string;
                        type: string;
                        internalType: string;
                    }[];
                    outputs: {
                        name: string;
                        type: string;
                        internalType: string;
                    }[];
                    stateMutability: string;
                    anonymous?: undefined;
                } | {
                    type: string;
                    name: string;
                    inputs: {
                        name: string;
                        type: string;
                        indexed: boolean;
                        internalType: string;
                    }[];
                    anonymous: boolean;
                    stateMutability?: undefined;
                    outputs?: undefined;
                } | {
                    type: string;
                    name: string;
                    inputs: {
                        name: string;
                        type: string;
                        internalType: string;
                    }[];
                    stateMutability?: undefined;
                    outputs?: undefined;
                    anonymous?: undefined;
                })[], string, undefined>;
                poll?: true | undefined | undefined;
            } | undefined] | [args: readonly unknown[] | {
                [x: string]: unknown;
                address?: undefined;
                abi?: undefined;
                args?: undefined;
                eventName?: undefined;
                fromBlock?: undefined;
                onError?: undefined;
                onLogs?: undefined;
                strict?: undefined;
                poll?: undefined;
                batch?: undefined;
                pollingInterval?: undefined;
            }, options?: {
                batch?: boolean | undefined | undefined;
                pollingInterval?: number | undefined | undefined;
                strict?: boolean | undefined;
                fromBlock?: bigint | undefined;
                onError?: ((error: Error) => void) | undefined | undefined;
                onLogs: viem.WatchContractEventOnLogsFn<({
                    type: string;
                    inputs: never[];
                    stateMutability: string;
                    name?: undefined;
                    outputs?: undefined;
                    anonymous?: undefined;
                } | {
                    type: string;
                    name: string;
                    inputs: {
                        name: string;
                        type: string;
                        internalType: string;
                    }[];
                    outputs: {
                        name: string;
                        type: string;
                        internalType: string;
                    }[];
                    stateMutability: string;
                    anonymous?: undefined;
                } | {
                    type: string;
                    name: string;
                    inputs: {
                        name: string;
                        type: string;
                        indexed: boolean;
                        internalType: string;
                    }[];
                    anonymous: boolean;
                    stateMutability?: undefined;
                    outputs?: undefined;
                } | {
                    type: string;
                    name: string;
                    inputs: {
                        name: string;
                        type: string;
                        internalType: string;
                    }[];
                    stateMutability?: undefined;
                    outputs?: undefined;
                    anonymous?: undefined;
                })[], string, undefined>;
                poll?: true | undefined | undefined;
            } | undefined]) => viem.WatchContractEventReturnType;
        };
        address: `0x${string}`;
        abi: ({
            type: string;
            inputs: never[];
            stateMutability: string;
            name?: undefined;
            outputs?: undefined;
            anonymous?: undefined;
        } | {
            type: string;
            name: string;
            inputs: {
                name: string;
                type: string;
                internalType: string;
            }[];
            outputs: {
                name: string;
                type: string;
                internalType: string;
            }[];
            stateMutability: string;
            anonymous?: undefined;
        } | {
            type: string;
            name: string;
            inputs: {
                name: string;
                type: string;
                indexed: boolean;
                internalType: string;
            }[];
            anonymous: boolean;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            type: string;
            name: string;
            inputs: {
                name: string;
                type: string;
                internalType: string;
            }[];
            stateMutability?: undefined;
            outputs?: undefined;
            anonymous?: undefined;
        })[];
    };
    /**
     * Deploys a new RWA Asset
     * @param name Asset name
     * @param symbol Asset symbol
     * @param complianceRuleId Compliance rule ID
     * @param initialSupply Initial supply
     * @returns Transaction hash
     */
    deployAsset(name: string, symbol: string, complianceRuleId: `0x${string}`, initialSupply: bigint): Promise<`0x${string}`>;
    /**
     * Registers or updates an identity
     * @param user User address
     * @param country Country code (ISO 3166-1 numeric)
     * @param claims Claims bitmap
     * @returns Transaction hash
     */
    registerIdentity(user: Address, country: number, claims: bigint): Promise<`0x${string}`>;
}

var IdentityRegistry = [
	{
		inputs: [
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		inputs: [
		],
		type: "error",
		name: "AccessControlBadConfirmation"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				internalType: "bytes32",
				name: "neededRole",
				type: "bytes32"
			}
		],
		type: "error",
		name: "AccessControlUnauthorizedAccount"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address",
				indexed: true
			}
		],
		type: "event",
		name: "IdentityRemoved",
		anonymous: false
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address",
				indexed: true
			},
			{
				internalType: "uint16",
				name: "country",
				type: "uint16",
				indexed: false
			},
			{
				internalType: "uint256",
				name: "claims",
				type: "uint256",
				indexed: false
			}
		],
		type: "event",
		name: "IdentityUpdated",
		anonymous: false
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
				indexed: true
			},
			{
				internalType: "bytes32",
				name: "previousAdminRole",
				type: "bytes32",
				indexed: true
			},
			{
				internalType: "bytes32",
				name: "newAdminRole",
				type: "bytes32",
				indexed: true
			}
		],
		type: "event",
		name: "RoleAdminChanged",
		anonymous: false
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
				indexed: true
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
				indexed: true
			},
			{
				internalType: "address",
				name: "sender",
				type: "address",
				indexed: true
			}
		],
		type: "event",
		name: "RoleGranted",
		anonymous: false
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
				indexed: true
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
				indexed: true
			},
			{
				internalType: "address",
				name: "sender",
				type: "address",
				indexed: true
			}
		],
		type: "event",
		name: "RoleRevoked",
		anonymous: false
	},
	{
		inputs: [
		],
		stateMutability: "view",
		type: "function",
		name: "DEFAULT_ADMIN_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		]
	},
	{
		inputs: [
		],
		stateMutability: "view",
		type: "function",
		name: "REGISTRAR_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		]
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function",
		name: "getRoleAdmin",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		]
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "function",
		name: "grantRole"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				internalType: "uint8",
				name: "claimBitIndex",
				type: "uint8"
			}
		],
		stateMutability: "view",
		type: "function",
		name: "hasClaim",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		]
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function",
		name: "hasRole",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		]
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function",
		name: "identityClaims",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		]
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function",
		name: "investorCountry",
		outputs: [
			{
				internalType: "uint16",
				name: "",
				type: "uint16"
			}
		]
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				internalType: "uint16",
				name: "country",
				type: "uint16"
			}
		],
		stateMutability: "view",
		type: "function",
		name: "isFromCountry",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		]
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "function",
		name: "removeIdentity"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "callerConfirmation",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "function",
		name: "renounceRole"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "function",
		name: "revokeRole"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				internalType: "uint16",
				name: "country",
				type: "uint16"
			},
			{
				internalType: "uint256",
				name: "claims",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function",
		name: "setIdentity"
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4"
			}
		],
		stateMutability: "view",
		type: "function",
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		]
	}
];

var ComplianceRegistry = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_identityRegistry",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		inputs: [
		],
		type: "error",
		name: "AccessControlBadConfirmation"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				internalType: "bytes32",
				name: "neededRole",
				type: "bytes32"
			}
		],
		type: "error",
		name: "AccessControlUnauthorizedAccount"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
				indexed: true
			},
			{
				internalType: "bytes32",
				name: "previousAdminRole",
				type: "bytes32",
				indexed: true
			},
			{
				internalType: "bytes32",
				name: "newAdminRole",
				type: "bytes32",
				indexed: true
			}
		],
		type: "event",
		name: "RoleAdminChanged",
		anonymous: false
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
				indexed: true
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
				indexed: true
			},
			{
				internalType: "address",
				name: "sender",
				type: "address",
				indexed: true
			}
		],
		type: "event",
		name: "RoleGranted",
		anonymous: false
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
				indexed: true
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
				indexed: true
			},
			{
				internalType: "address",
				name: "sender",
				type: "address",
				indexed: true
			}
		],
		type: "event",
		name: "RoleRevoked",
		anonymous: false
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "ruleId",
				type: "bytes32",
				indexed: true
			},
			{
				internalType: "bool",
				name: "requiresAccredited",
				type: "bool",
				indexed: false
			},
			{
				internalType: "bool",
				name: "requiresKYC",
				type: "bool",
				indexed: false
			}
		],
		type: "event",
		name: "RuleUpdated",
		anonymous: false
	},
	{
		inputs: [
		],
		stateMutability: "view",
		type: "function",
		name: "COMPLIANCE_ADMIN_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		]
	},
	{
		inputs: [
		],
		stateMutability: "view",
		type: "function",
		name: "DEFAULT_ADMIN_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		]
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				internalType: "bytes32",
				name: "ruleId",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function",
		name: "checkCompliance",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		]
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function",
		name: "getRoleAdmin",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		]
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "function",
		name: "grantRole"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function",
		name: "hasRole",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		]
	},
	{
		inputs: [
		],
		stateMutability: "view",
		type: "function",
		name: "identityRegistry",
		outputs: [
			{
				internalType: "contract IdentityRegistry",
				name: "",
				type: "address"
			}
		]
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "callerConfirmation",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "function",
		name: "renounceRole"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "function",
		name: "revokeRole"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function",
		name: "rules",
		outputs: [
			{
				internalType: "bool",
				name: "requiresAccredited",
				type: "bool"
			},
			{
				internalType: "bool",
				name: "requiresKYC",
				type: "bool"
			}
		]
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "ruleId",
				type: "bytes32"
			},
			{
				internalType: "bool",
				name: "requiresAccredited",
				type: "bool"
			},
			{
				internalType: "bool",
				name: "requiresKYC",
				type: "bool"
			},
			{
				internalType: "uint16[]",
				name: "restrictedCountries",
				type: "uint16[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function",
		name: "setRule"
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4"
			}
		],
		stateMutability: "view",
		type: "function",
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		]
	}
];

var AssetFactory = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_complianceRegistry",
				type: "address"
			},
			{
				internalType: "address",
				name: "_tokenImplementation",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		inputs: [
		],
		type: "error",
		name: "AccessControlBadConfirmation"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				internalType: "bytes32",
				name: "neededRole",
				type: "bytes32"
			}
		],
		type: "error",
		name: "AccessControlUnauthorizedAccount"
	},
	{
		inputs: [
		],
		type: "error",
		name: "FailedDeployment"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "balance",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "needed",
				type: "uint256"
			}
		],
		type: "error",
		name: "InsufficientBalance"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "assetAddress",
				type: "address",
				indexed: true
			},
			{
				internalType: "string",
				name: "name",
				type: "string",
				indexed: false
			},
			{
				internalType: "string",
				name: "symbol",
				type: "string",
				indexed: false
			},
			{
				internalType: "address",
				name: "deployer",
				type: "address",
				indexed: true
			}
		],
		type: "event",
		name: "AssetDeployed",
		anonymous: false
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newImplementation",
				type: "address",
				indexed: true
			}
		],
		type: "event",
		name: "ImplementationUpdated",
		anonymous: false
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
				indexed: true
			},
			{
				internalType: "bytes32",
				name: "previousAdminRole",
				type: "bytes32",
				indexed: true
			},
			{
				internalType: "bytes32",
				name: "newAdminRole",
				type: "bytes32",
				indexed: true
			}
		],
		type: "event",
		name: "RoleAdminChanged",
		anonymous: false
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
				indexed: true
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
				indexed: true
			},
			{
				internalType: "address",
				name: "sender",
				type: "address",
				indexed: true
			}
		],
		type: "event",
		name: "RoleGranted",
		anonymous: false
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
				indexed: true
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
				indexed: true
			},
			{
				internalType: "address",
				name: "sender",
				type: "address",
				indexed: true
			}
		],
		type: "event",
		name: "RoleRevoked",
		anonymous: false
	},
	{
		inputs: [
		],
		stateMutability: "view",
		type: "function",
		name: "DEFAULT_ADMIN_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		]
	},
	{
		inputs: [
		],
		stateMutability: "view",
		type: "function",
		name: "complianceRegistry",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		]
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "name",
				type: "string"
			},
			{
				internalType: "string",
				name: "symbol",
				type: "string"
			},
			{
				internalType: "bytes32",
				name: "complianceRuleId",
				type: "bytes32"
			},
			{
				internalType: "uint256",
				name: "initialSupply",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function",
		name: "deployAsset",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		]
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function",
		name: "getRoleAdmin",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		]
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "function",
		name: "grantRole"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function",
		name: "hasRole",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		]
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "callerConfirmation",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "function",
		name: "renounceRole"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "function",
		name: "revokeRole"
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4"
			}
		],
		stateMutability: "view",
		type: "function",
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		]
	},
	{
		inputs: [
		],
		stateMutability: "view",
		type: "function",
		name: "tokenImplementation",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		]
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_newImplementation",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "function",
		name: "updateImplementation"
	}
];

var RWAToken = [
	{
		type: "constructor",
		inputs: [
		],
		stateMutability: "nonpayable"
	},
	{
		type: "function",
		name: "COMPLIANCE_ROLE",
		inputs: [
		],
		outputs: [
			{
				name: "",
				type: "bytes32",
				internalType: "bytes32"
			}
		],
		stateMutability: "view"
	},
	{
		type: "function",
		name: "DEFAULT_ADMIN_ROLE",
		inputs: [
		],
		outputs: [
			{
				name: "",
				type: "bytes32",
				internalType: "bytes32"
			}
		],
		stateMutability: "view"
	},
	{
		type: "function",
		name: "MINTER_ROLE",
		inputs: [
		],
		outputs: [
			{
				name: "",
				type: "bytes32",
				internalType: "bytes32"
			}
		],
		stateMutability: "view"
	},
	{
		type: "function",
		name: "PAUSER_ROLE",
		inputs: [
		],
		outputs: [
			{
				name: "",
				type: "bytes32",
				internalType: "bytes32"
			}
		],
		stateMutability: "view"
	},
	{
		type: "function",
		name: "RECOVERY_ROLE",
		inputs: [
		],
		outputs: [
			{
				name: "",
				type: "bytes32",
				internalType: "bytes32"
			}
		],
		stateMutability: "view"
	},
	{
		type: "function",
		name: "allowance",
		inputs: [
			{
				name: "owner",
				type: "address",
				internalType: "address"
			},
			{
				name: "spender",
				type: "address",
				internalType: "address"
			}
		],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256"
			}
		],
		stateMutability: "view"
	},
	{
		type: "function",
		name: "approve",
		inputs: [
			{
				name: "spender",
				type: "address",
				internalType: "address"
			},
			{
				name: "value",
				type: "uint256",
				internalType: "uint256"
			}
		],
		outputs: [
			{
				name: "",
				type: "bool",
				internalType: "bool"
			}
		],
		stateMutability: "nonpayable"
	},
	{
		type: "function",
		name: "balanceOf",
		inputs: [
			{
				name: "account",
				type: "address",
				internalType: "address"
			}
		],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256"
			}
		],
		stateMutability: "view"
	},
	{
		type: "function",
		name: "complianceRegistry",
		inputs: [
		],
		outputs: [
			{
				name: "",
				type: "address",
				internalType: "contract ComplianceRegistry"
			}
		],
		stateMutability: "view"
	},
	{
		type: "function",
		name: "complianceRuleId",
		inputs: [
		],
		outputs: [
			{
				name: "",
				type: "bytes32",
				internalType: "bytes32"
			}
		],
		stateMutability: "view"
	},
	{
		type: "function",
		name: "decimals",
		inputs: [
		],
		outputs: [
			{
				name: "",
				type: "uint8",
				internalType: "uint8"
			}
		],
		stateMutability: "view"
	},
	{
		type: "function",
		name: "docNames",
		inputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256"
			}
		],
		outputs: [
			{
				name: "",
				type: "bytes32",
				internalType: "bytes32"
			}
		],
		stateMutability: "view"
	},
	{
		type: "function",
		name: "documents",
		inputs: [
			{
				name: "",
				type: "bytes32",
				internalType: "bytes32"
			}
		],
		outputs: [
			{
				name: "docHash",
				type: "bytes32",
				internalType: "bytes32"
			},
			{
				name: "lastModified",
				type: "uint256",
				internalType: "uint256"
			},
			{
				name: "uri",
				type: "string",
				internalType: "string"
			}
		],
		stateMutability: "view"
	},
	{
		type: "function",
		name: "forceTransfer",
		inputs: [
			{
				name: "from",
				type: "address",
				internalType: "address"
			},
			{
				name: "to",
				type: "address",
				internalType: "address"
			},
			{
				name: "amount",
				type: "uint256",
				internalType: "uint256"
			}
		],
		outputs: [
		],
		stateMutability: "nonpayable"
	},
	{
		type: "function",
		name: "getRoleAdmin",
		inputs: [
			{
				name: "role",
				type: "bytes32",
				internalType: "bytes32"
			}
		],
		outputs: [
			{
				name: "",
				type: "bytes32",
				internalType: "bytes32"
			}
		],
		stateMutability: "view"
	},
	{
		type: "function",
		name: "grantRole",
		inputs: [
			{
				name: "role",
				type: "bytes32",
				internalType: "bytes32"
			},
			{
				name: "account",
				type: "address",
				internalType: "address"
			}
		],
		outputs: [
		],
		stateMutability: "nonpayable"
	},
	{
		type: "function",
		name: "hasRole",
		inputs: [
			{
				name: "role",
				type: "bytes32",
				internalType: "bytes32"
			},
			{
				name: "account",
				type: "address",
				internalType: "address"
			}
		],
		outputs: [
			{
				name: "",
				type: "bool",
				internalType: "bool"
			}
		],
		stateMutability: "view"
	},
	{
		type: "function",
		name: "initialize",
		inputs: [
			{
				name: "name",
				type: "string",
				internalType: "string"
			},
			{
				name: "symbol",
				type: "string",
				internalType: "string"
			},
			{
				name: "_complianceRegistry",
				type: "address",
				internalType: "address"
			},
			{
				name: "_complianceRuleId",
				type: "bytes32",
				internalType: "bytes32"
			},
			{
				name: "admin",
				type: "address",
				internalType: "address"
			}
		],
		outputs: [
		],
		stateMutability: "nonpayable"
	},
	{
		type: "function",
		name: "mint",
		inputs: [
			{
				name: "to",
				type: "address",
				internalType: "address"
			},
			{
				name: "amount",
				type: "uint256",
				internalType: "uint256"
			}
		],
		outputs: [
		],
		stateMutability: "nonpayable"
	},
	{
		type: "function",
		name: "name",
		inputs: [
		],
		outputs: [
			{
				name: "",
				type: "string",
				internalType: "string"
			}
		],
		stateMutability: "view"
	},
	{
		type: "function",
		name: "pause",
		inputs: [
		],
		outputs: [
		],
		stateMutability: "nonpayable"
	},
	{
		type: "function",
		name: "paused",
		inputs: [
		],
		outputs: [
			{
				name: "",
				type: "bool",
				internalType: "bool"
			}
		],
		stateMutability: "view"
	},
	{
		type: "function",
		name: "renounceRole",
		inputs: [
			{
				name: "role",
				type: "bytes32",
				internalType: "bytes32"
			},
			{
				name: "callerConfirmation",
				type: "address",
				internalType: "address"
			}
		],
		outputs: [
		],
		stateMutability: "nonpayable"
	},
	{
		type: "function",
		name: "revokeRole",
		inputs: [
			{
				name: "role",
				type: "bytes32",
				internalType: "bytes32"
			},
			{
				name: "account",
				type: "address",
				internalType: "address"
			}
		],
		outputs: [
		],
		stateMutability: "nonpayable"
	},
	{
		type: "function",
		name: "setComplianceRegistry",
		inputs: [
			{
				name: "_newRegistry",
				type: "address",
				internalType: "address"
			}
		],
		outputs: [
		],
		stateMutability: "nonpayable"
	},
	{
		type: "function",
		name: "setComplianceRuleId",
		inputs: [
			{
				name: "_newRuleId",
				type: "bytes32",
				internalType: "bytes32"
			}
		],
		outputs: [
		],
		stateMutability: "nonpayable"
	},
	{
		type: "function",
		name: "setDocument",
		inputs: [
			{
				name: "name",
				type: "bytes32",
				internalType: "bytes32"
			},
			{
				name: "uri",
				type: "string",
				internalType: "string"
			},
			{
				name: "docHash",
				type: "bytes32",
				internalType: "bytes32"
			}
		],
		outputs: [
		],
		stateMutability: "nonpayable"
	},
	{
		type: "function",
		name: "supportsInterface",
		inputs: [
			{
				name: "interfaceId",
				type: "bytes4",
				internalType: "bytes4"
			}
		],
		outputs: [
			{
				name: "",
				type: "bool",
				internalType: "bool"
			}
		],
		stateMutability: "view"
	},
	{
		type: "function",
		name: "symbol",
		inputs: [
		],
		outputs: [
			{
				name: "",
				type: "string",
				internalType: "string"
			}
		],
		stateMutability: "view"
	},
	{
		type: "function",
		name: "totalSupply",
		inputs: [
		],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256"
			}
		],
		stateMutability: "view"
	},
	{
		type: "function",
		name: "transfer",
		inputs: [
			{
				name: "to",
				type: "address",
				internalType: "address"
			},
			{
				name: "value",
				type: "uint256",
				internalType: "uint256"
			}
		],
		outputs: [
			{
				name: "",
				type: "bool",
				internalType: "bool"
			}
		],
		stateMutability: "nonpayable"
	},
	{
		type: "function",
		name: "transferFrom",
		inputs: [
			{
				name: "from",
				type: "address",
				internalType: "address"
			},
			{
				name: "to",
				type: "address",
				internalType: "address"
			},
			{
				name: "value",
				type: "uint256",
				internalType: "uint256"
			}
		],
		outputs: [
			{
				name: "",
				type: "bool",
				internalType: "bool"
			}
		],
		stateMutability: "nonpayable"
	},
	{
		type: "function",
		name: "unpause",
		inputs: [
		],
		outputs: [
		],
		stateMutability: "nonpayable"
	},
	{
		type: "event",
		name: "Approval",
		inputs: [
			{
				name: "owner",
				type: "address",
				indexed: true,
				internalType: "address"
			},
			{
				name: "spender",
				type: "address",
				indexed: true,
				internalType: "address"
			},
			{
				name: "value",
				type: "uint256",
				indexed: false,
				internalType: "uint256"
			}
		],
		anonymous: false
	},
	{
		type: "event",
		name: "ComplianceRegistryUpdated",
		inputs: [
			{
				name: "newRegistry",
				type: "address",
				indexed: true,
				internalType: "address"
			}
		],
		anonymous: false
	},
	{
		type: "event",
		name: "ComplianceRuleUpdated",
		inputs: [
			{
				name: "newRuleId",
				type: "bytes32",
				indexed: true,
				internalType: "bytes32"
			}
		],
		anonymous: false
	},
	{
		type: "event",
		name: "DocumentUpdated",
		inputs: [
			{
				name: "name",
				type: "bytes32",
				indexed: true,
				internalType: "bytes32"
			},
			{
				name: "uri",
				type: "string",
				indexed: false,
				internalType: "string"
			},
			{
				name: "docHash",
				type: "bytes32",
				indexed: false,
				internalType: "bytes32"
			}
		],
		anonymous: false
	},
	{
		type: "event",
		name: "ForcedTransfer",
		inputs: [
			{
				name: "from",
				type: "address",
				indexed: true,
				internalType: "address"
			},
			{
				name: "to",
				type: "address",
				indexed: true,
				internalType: "address"
			},
			{
				name: "amount",
				type: "uint256",
				indexed: false,
				internalType: "uint256"
			}
		],
		anonymous: false
	},
	{
		type: "event",
		name: "Initialized",
		inputs: [
			{
				name: "version",
				type: "uint64",
				indexed: false,
				internalType: "uint64"
			}
		],
		anonymous: false
	},
	{
		type: "event",
		name: "Paused",
		inputs: [
			{
				name: "account",
				type: "address",
				indexed: false,
				internalType: "address"
			}
		],
		anonymous: false
	},
	{
		type: "event",
		name: "RoleAdminChanged",
		inputs: [
			{
				name: "role",
				type: "bytes32",
				indexed: true,
				internalType: "bytes32"
			},
			{
				name: "previousAdminRole",
				type: "bytes32",
				indexed: true,
				internalType: "bytes32"
			},
			{
				name: "newAdminRole",
				type: "bytes32",
				indexed: true,
				internalType: "bytes32"
			}
		],
		anonymous: false
	},
	{
		type: "event",
		name: "RoleGranted",
		inputs: [
			{
				name: "role",
				type: "bytes32",
				indexed: true,
				internalType: "bytes32"
			},
			{
				name: "account",
				type: "address",
				indexed: true,
				internalType: "address"
			},
			{
				name: "sender",
				type: "address",
				indexed: true,
				internalType: "address"
			}
		],
		anonymous: false
	},
	{
		type: "event",
		name: "RoleRevoked",
		inputs: [
			{
				name: "role",
				type: "bytes32",
				indexed: true,
				internalType: "bytes32"
			},
			{
				name: "account",
				type: "address",
				indexed: true,
				internalType: "address"
			},
			{
				name: "sender",
				type: "address",
				indexed: true,
				internalType: "address"
			}
		],
		anonymous: false
	},
	{
		type: "event",
		name: "Transfer",
		inputs: [
			{
				name: "from",
				type: "address",
				indexed: true,
				internalType: "address"
			},
			{
				name: "to",
				type: "address",
				indexed: true,
				internalType: "address"
			},
			{
				name: "value",
				type: "uint256",
				indexed: false,
				internalType: "uint256"
			}
		],
		anonymous: false
	},
	{
		type: "event",
		name: "Unpaused",
		inputs: [
			{
				name: "account",
				type: "address",
				indexed: false,
				internalType: "address"
			}
		],
		anonymous: false
	},
	{
		type: "error",
		name: "AccessControlBadConfirmation",
		inputs: [
		]
	},
	{
		type: "error",
		name: "AccessControlUnauthorizedAccount",
		inputs: [
			{
				name: "account",
				type: "address",
				internalType: "address"
			},
			{
				name: "neededRole",
				type: "bytes32",
				internalType: "bytes32"
			}
		]
	},
	{
		type: "error",
		name: "ERC20InsufficientAllowance",
		inputs: [
			{
				name: "spender",
				type: "address",
				internalType: "address"
			},
			{
				name: "allowance",
				type: "uint256",
				internalType: "uint256"
			},
			{
				name: "needed",
				type: "uint256",
				internalType: "uint256"
			}
		]
	},
	{
		type: "error",
		name: "ERC20InsufficientBalance",
		inputs: [
			{
				name: "sender",
				type: "address",
				internalType: "address"
			},
			{
				name: "balance",
				type: "uint256",
				internalType: "uint256"
			},
			{
				name: "needed",
				type: "uint256",
				internalType: "uint256"
			}
		]
	},
	{
		type: "error",
		name: "ERC20InvalidApprover",
		inputs: [
			{
				name: "approver",
				type: "address",
				internalType: "address"
			}
		]
	},
	{
		type: "error",
		name: "ERC20InvalidReceiver",
		inputs: [
			{
				name: "receiver",
				type: "address",
				internalType: "address"
			}
		]
	},
	{
		type: "error",
		name: "ERC20InvalidSender",
		inputs: [
			{
				name: "sender",
				type: "address",
				internalType: "address"
			}
		]
	},
	{
		type: "error",
		name: "ERC20InvalidSpender",
		inputs: [
			{
				name: "spender",
				type: "address",
				internalType: "address"
			}
		]
	},
	{
		type: "error",
		name: "EnforcedPause",
		inputs: [
		]
	},
	{
		type: "error",
		name: "ExpectedPause",
		inputs: [
		]
	},
	{
		type: "error",
		name: "InvalidInitialization",
		inputs: [
		]
	},
	{
		type: "error",
		name: "NotInitializing",
		inputs: [
		]
	}
];

export { AssetFactory as AssetFactoryABI, ComplianceRegistry as ComplianceRegistryABI, IdentityRegistry as IdentityRegistryABI, MantleRWASDK, type MantleRWASDKConfig, RWAToken as RWATokenABI };
