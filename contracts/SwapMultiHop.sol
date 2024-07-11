//SPDX-License-Identifier:GPL-2.0-or-later

pragma solidity >=0.7 <0.9.0;
pragma abicoder v2; //This will allow one to use nested array in our smart contract
//This package from uniswap  will help use to do the transfer
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
//This will allow us to to the swapping of the tokens
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract SwapMultiHop {
    //Define instance of the uniwap swap router whose address will be permanent/constant
    //using constant can equally cost less gas when deployed
    ISwapRouter public constant swapRouter =
        ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);

    //note the swap router contract is deployed in the smart contract provided in the instance of the uniswap router above

    //we will start with swapping WETH to DAI as hardhat already has given usse some amount of Ether
    address public constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address public constant WETH9 = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address public constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;

    function swapExactInputMultihop(
        uint amountIn
    ) external returns (uint amountOut) {
        TransferHelper.safeTransferFrom(
            WETH9,
            msg.sender,
            address(this),
            amountIn
        );

        TransferHelper.safeApprove(WETH9, address(swapRouter), amountIn);

        ISwapRouter.ExactInputParams memory params = ISwapRouter
            .ExactInputParams({
                path: abi.encodedPacked(
                    WETH9,
                    uint24(3000),
                    USDC,
                    uint24(100),
                    DAI
                ),
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0
            });

        amountOut = swapRouter.exactInput(params);
    }

    function swapExactOutputMultihop(
        uint amountOut,
        uint amountInMaximum
    ) external returns (uint amountIn) {
        TransferHelper.safeTransferFrom(
            WETH9,
            msg.sender,
            address(this),
            amountIn
        );

        TransferHelper.safeApprove(WETH9, address(swapRouter), amountIn);

        ISwapRouter.ExactInputParams memory params = ISwapRouter
            .ExactInputParams({
                path: abi.encodedPacked(
                    WETH9,
                    uint24(3000),
                    USDC,
                    uint24(100),
                    DAI
                ),
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0
            });

        amountOut = swapRouter.exactInput(params);
    }
}
