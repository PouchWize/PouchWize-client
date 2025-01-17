export const ABI = [
    {
        name: "TokenManagement",
        type: "impl",
        interface_name: "pouchwize::ITokenManagement",
    },
    {
        name: "pouchwize::ITokenManagement",
        type: "interface",
        items: [
            {
                name: "add_lending_token",
                type: "function",
                inputs: [
                    {
                        name: "token",
                        type: "core::starknet::contract_address::ContractAddress",
                    },
                ],
                outputs: [],
                state_mutability: "external",
            },
            {
                name: "add_collateral_token",
                type: "function",
                inputs: [
                    {
                        name: "token",
                        type: "core::starknet::contract_address::ContractAddress",
                    },
                ],
                outputs: [],
                state_mutability: "external",
            },
        ],
    },
    {
        name: "LendingImpl",
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
        name: "pouchwize::Pouchwize::Loan",
        type: "struct",
        members: [
            {
                name: "borrower",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                name: "amount",
                type: "core::integer::u256",
            },
            {
                name: "collateral",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                name: "active",
                type: "core::bool",
            },
            {
                name: "timestamp",
                type: "core::integer::u64",
            },
            {
                name: "listing_id",
                type: "core::integer::u128",
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
                name: "create_loan",
                type: "function",
                inputs: [
                    {
                        name: "amount",
                        type: "core::integer::u256",
                    },
                    {
                        name: "collateral",
                        type: "core::starknet::contract_address::ContractAddress",
                    },
                    {
                        name: "listing_id",
                        type: "core::integer::u128",
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
                name: "get_loan",
                type: "function",
                inputs: [
                    {
                        name: "loan_id",
                        type: "core::integer::u128",
                    },
                ],
                outputs: [
                    {
                        type: "pouchwize::Pouchwize::Loan",
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
                name: "cancel_loan",
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
        kind: "struct",
        name: "pouchwize::Pouchwize::InterestAccrued",
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
            {
                kind: "data",
                name: "timestamp",
                type: "core::integer::u64",
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
            {
                kind: "nested",
                name: "InterestAccrued",
                type: "pouchwize::Pouchwize::InterestAccrued",
            },
        ],
    },
] as const;
