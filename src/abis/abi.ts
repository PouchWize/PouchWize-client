import type { Abi } from "starknet";

export const POUCHWIZE_ABI = [
    {
        name: "Pouchwize",
        type: "impl",
        interface_name: "pouchwize::IPouchwize",
    },
    {
        name: "core::integer::u256",
        type: "struct",
        members: [
            {
                name: "low",
                type: "core::integer::u128",
            },
            {
                name: "high",
                type: "core::integer::u128",
            },
        ],
    },
    {
        name: "core::bool",
        type: "enum",
        variants: [
            {
                name: "False",
                type: "()",
            },
            {
                name: "True",
                type: "()",
            },
        ],
    },
    {
        name: "pouchwize::Pouchwize::LoanListing",
        type: "struct",
        members: [
            {
                name: "author",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                name: "amount",
                type: "core::integer::u256",
            },
            {
                name: "min_amount",
                type: "core::integer::u256",
            },
            {
                name: "max_amount",
                type: "core::integer::u256",
            },
            {
                name: "interest",
                type: "core::integer::u16",
            },
            {
                name: "return_date",
                type: "core::integer::u64",
            },
            {
                name: "token_address",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                name: "status",
                type: "core::integer::u8",
            },
        ],
    },
    {
        name: "core::array::Span::<core::integer::u128>",
        type: "struct",
        members: [
            {
                name: "snapshot",
                type: "@core::array::Array::<core::integer::u128>",
            },
        ],
    },
    {
        name: "pouchwize::IPouchwize",
        type: "interface",
        items: [
            {
                name: "deposit_collateral",
                type: "function",
                inputs: [
                    {
                        name: "token",
                        type: "core::starknet::contract_address::ContractAddress",
                    },
                    {
                        name: "amount",
                        type: "core::integer::u256",
                    },
                ],
                outputs: [],
                state_mutability: "external",
            },
            {
                name: "withdraw_collateral",
                type: "function",
                inputs: [
                    {
                        name: "token",
                        type: "core::starknet::contract_address::ContractAddress",
                    },
                    {
                        name: "amount",
                        type: "core::integer::u256",
                    },
                ],
                outputs: [],
                state_mutability: "external",
            },
            {
                name: "request_loan_from_listing",
                type: "function",
                inputs: [
                    {
                        name: "listing_id",
                        type: "core::integer::u128",
                    },
                    {
                        name: "amount",
                        type: "core::integer::u256",
                    },
                ],
                outputs: [
                    {
                        type: "core::integer::u128",
                    },
                ],
                state_mutability: "external",
            },
            {
                name: "repay_loan",
                type: "function",
                inputs: [
                    {
                        name: "loan_id",
                        type: "core::integer::u128",
                    },
                    {
                        name: "amount",
                        type: "core::integer::u256",
                    },
                ],
                outputs: [
                    {
                        type: "core::bool",
                    },
                ],
                state_mutability: "external",
            },
            {
                name: "create_loan_listing",
                type: "function",
                inputs: [
                    {
                        name: "amount",
                        type: "core::integer::u256",
                    },
                    {
                        name: "min_amount",
                        type: "core::integer::u256",
                    },
                    {
                        name: "max_amount",
                        type: "core::integer::u256",
                    },
                    {
                        name: "interest",
                        type: "core::integer::u16",
                    },
                    {
                        name: "token",
                        type: "core::starknet::contract_address::ContractAddress",
                    },
                ],
                outputs: [
                    {
                        type: "core::integer::u128",
                    },
                ],
                state_mutability: "external",
            },
            {
                name: "cancel_loan_listing",
                type: "function",
                inputs: [
                    {
                        name: "listing_id",
                        type: "core::integer::u128",
                    },
                ],
                outputs: [
                    {
                        type: "core::bool",
                    },
                ],
                state_mutability: "external",
            },
            {
                name: "cancel_loan_request_loan_from_listing",
                type: "function",
                inputs: [
                    {
                        name: "loan_id",
                        type: "core::integer::u128",
                    },
                ],
                outputs: [
                    {
                        type: "core::bool",
                    },
                ],
                state_mutability: "external",
            },
            {
                name: "liquidate",
                type: "function",
                inputs: [
                    {
                        name: "loan_id",
                        type: "core::integer::u128",
                    },
                ],
                outputs: [
                    {
                        type: "core::bool",
                    },
                ],
                state_mutability: "external",
            },
            {
                name: "check_and_liquidate_loans",
                type: "function",
                inputs: [
                    {
                        name: "loan_ids",
                        type: "core::array::Array::<core::integer::u128>",
                    },
                ],
                outputs: [
                    {
                        type: "core::array::Array::<core::bool>",
                    },
                ],
                state_mutability: "external",
            },
            {
                name: "get_loan_listing",
                type: "function",
                inputs: [
                    {
                        name: "listing_id",
                        type: "core::integer::u128",
                    },
                ],
                outputs: [
                    {
                        type: "pouchwize::Pouchwize::LoanListing",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_loan_details",
                type: "function",
                inputs: [
                    {
                        name: "loan_id",
                        type: "core::integer::u128",
                    },
                ],
                outputs: [
                    {
                        type: "(core::integer::u256, core::integer::u256, core::integer::u256, core::integer::u64)",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_loan_health",
                type: "function",
                inputs: [
                    {
                        name: "loan_id",
                        type: "core::integer::u128",
                    },
                ],
                outputs: [
                    {
                        type: "core::bool",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_loan_health_ratio",
                type: "function",
                inputs: [
                    {
                        name: "loan_id",
                        type: "core::integer::u128",
                    },
                ],
                outputs: [
                    {
                        type: "core::integer::u16",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_interest_accrued",
                type: "function",
                inputs: [
                    {
                        name: "loan_id",
                        type: "core::integer::u128",
                    },
                ],
                outputs: [
                    {
                        type: "core::integer::u256",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_user_loan_listings",
                type: "function",
                inputs: [
                    {
                        name: "user",
                        type: "core::starknet::contract_address::ContractAddress",
                    },
                ],
                outputs: [
                    {
                        type: "core::array::Span::<core::integer::u128>",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_user_active_loans",
                type: "function",
                inputs: [
                    {
                        name: "user",
                        type: "core::starknet::contract_address::ContractAddress",
                    },
                ],
                outputs: [
                    {
                        type: "core::array::Span::<core::integer::u128>",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_user_health_status",
                type: "function",
                inputs: [
                    {
                        name: "user",
                        type: "core::starknet::contract_address::ContractAddress",
                    },
                ],
                outputs: [
                    {
                        type: "core::integer::u8",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_borrowing_capacity",
                type: "function",
                inputs: [
                    {
                        name: "user",
                        type: "core::starknet::contract_address::ContractAddress",
                    },
                    {
                        name: "token",
                        type: "core::starknet::contract_address::ContractAddress",
                    },
                ],
                outputs: [
                    {
                        type: "core::integer::u256",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_collateral_balance",
                type: "function",
                inputs: [
                    {
                        name: "user",
                        type: "core::starknet::contract_address::ContractAddress",
                    },
                    {
                        name: "token",
                        type: "core::starknet::contract_address::ContractAddress",
                    },
                ],
                outputs: [
                    {
                        type: "core::integer::u256",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_collateral_value",
                type: "function",
                inputs: [
                    {
                        name: "token",
                        type: "core::starknet::contract_address::ContractAddress",
                    },
                    {
                        name: "amount",
                        type: "core::integer::u256",
                    },
                ],
                outputs: [
                    {
                        type: "core::integer::u256",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_total_collateral_value",
                type: "function",
                inputs: [
                    {
                        name: "user",
                        type: "core::starknet::contract_address::ContractAddress",
                    },
                ],
                outputs: [
                    {
                        type: "core::integer::u256",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_total_loans",
                type: "function",
                inputs: [],
                outputs: [
                    {
                        type: "core::integer::u128",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_total_listings",
                type: "function",
                inputs: [],
                outputs: [
                    {
                        type: "core::integer::u128",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_available_listings",
                type: "function",
                inputs: [],
                outputs: [
                    {
                        type: "core::array::Span::<core::integer::u128>",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_listing_utilization",
                type: "function",
                inputs: [
                    {
                        name: "listing_id",
                        type: "core::integer::u128",
                    },
                ],
                outputs: [
                    {
                        type: "core::integer::u256",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_liquidatable_loans",
                type: "function",
                inputs: [],
                outputs: [
                    {
                        type: "core::array::Span::<core::integer::u128>",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_liquidation_bonus",
                type: "function",
                inputs: [
                    {
                        name: "loan_id",
                        type: "core::integer::u128",
                    },
                ],
                outputs: [
                    {
                        type: "core::integer::u256",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "distribute_test_tokens",
                type: "function",
                inputs: [
                    {
                        name: "recipient",
                        type: "core::starknet::contract_address::ContractAddress",
                    },
                    {
                        name: "amount",
                        type: "core::integer::u256",
                    },
                ],
                outputs: [],
                state_mutability: "external",
            },
        ],
    },
    {
        name: "constructor",
        type: "constructor",
        inputs: [],
    },
    {
        kind: "struct",
        name: "pouchwize::Pouchwize::LoanListingCreated",
        type: "event",
        members: [
            {
                kind: "data",
                name: "listing_id",
                type: "core::integer::u128",
            },
            {
                kind: "data",
                name: "author",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                kind: "data",
                name: "amount",
                type: "core::integer::u256",
            },
            {
                kind: "data",
                name: "interest",
                type: "core::integer::u16",
            },
        ],
    },
    {
        kind: "struct",
        name: "pouchwize::Pouchwize::LoanCancelled",
        type: "event",
        members: [
            {
                kind: "data",
                name: "loan_id",
                type: "core::integer::u128",
            },
        ],
    },
    {
        kind: "struct",
        name: "pouchwize::Pouchwize::CollateralDeposited",
        type: "event",
        members: [
            {
                kind: "data",
                name: "user",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                kind: "data",
                name: "token",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                kind: "data",
                name: "amount",
                type: "core::integer::u256",
            },
        ],
    },
    {
        kind: "struct",
        name: "pouchwize::Pouchwize::CollateralWithdrawn",
        type: "event",
        members: [
            {
                kind: "data",
                name: "user",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                kind: "data",
                name: "token",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                kind: "data",
                name: "amount",
                type: "core::integer::u256",
            },
        ],
    },
    {
        kind: "struct",
        name: "pouchwize::Pouchwize::LoanCreated",
        type: "event",
        members: [
            {
                kind: "data",
                name: "loan_id",
                type: "core::integer::u128",
            },
            {
                kind: "data",
                name: "borrower",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                kind: "data",
                name: "amount",
                type: "core::integer::u256",
            },
            {
                kind: "data",
                name: "collateral",
                type: "core::starknet::contract_address::ContractAddress",
            },
        ],
    },
    {
        kind: "struct",
        name: "pouchwize::Pouchwize::LoanRepaid",
        type: "event",
        members: [
            {
                kind: "data",
                name: "loan_id",
                type: "core::integer::u128",
            },
            {
                kind: "data",
                name: "amount",
                type: "core::integer::u256",
            },
        ],
    },
    {
        kind: "struct",
        name: "pouchwize::Pouchwize::LoanLiquidated",
        type: "event",
        members: [
            {
                kind: "data",
                name: "loan_id",
                type: "core::integer::u128",
            },
            {
                kind: "data",
                name: "liquidator",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                kind: "data",
                name: "collateral_amount",
                type: "core::integer::u256",
            },
        ],
    },
    {
        kind: "struct",
        name: "pouchwize::Pouchwize::LoanHealthCompromised",
        type: "event",
        members: [
            {
                kind: "data",
                name: "loan_id",
                type: "core::integer::u128",
            },
            {
                kind: "data",
                name: "borrower",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                kind: "data",
                name: "current_collateral_value",
                type: "core::integer::u256",
            },
            {
                kind: "data",
                name: "required_collateral_value",
                type: "core::integer::u256",
            },
        ],
    },
    {
        kind: "enum",
        name: "pouchwize::Pouchwize::Event",
        type: "event",
        variants: [
            {
                kind: "nested",
                name: "LoanListingCreated",
                type: "pouchwize::Pouchwize::LoanListingCreated",
            },
            {
                kind: "nested",
                name: "LoanCancelled",
                type: "pouchwize::Pouchwize::LoanCancelled",
            },
            {
                kind: "nested",
                name: "CollateralDeposited",
                type: "pouchwize::Pouchwize::CollateralDeposited",
            },
            {
                kind: "nested",
                name: "CollateralWithdrawn",
                type: "pouchwize::Pouchwize::CollateralWithdrawn",
            },
            {
                kind: "nested",
                name: "LoanCreated",
                type: "pouchwize::Pouchwize::LoanCreated",
            },
            {
                kind: "nested",
                name: "LoanRepaid",
                type: "pouchwize::Pouchwize::LoanRepaid",
            },
            {
                kind: "nested",
                name: "LoanLiquidated",
                type: "pouchwize::Pouchwize::LoanLiquidated",
            },
            {
                kind: "nested",
                name: "LoanHealthCompromised",
                type: "pouchwize::Pouchwize::LoanHealthCompromised",
            },
        ],
    },
] as const satisfies Abi;
