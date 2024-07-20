//SPDX-License-Identifier:GPL-2.0-or-later

pragma solidity >=0.7 <0.9.0;
pragma abicoder v2; //This will allow one to use nested array in our smart contract

//This package from uniswap  will help use to do the transfer
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";

//This will allow us to to the swapping of the tokens
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract SingleSwapToken {
    //Define instance of the uniwap swap router whose address will be permanent/constant
    //using constant can equally cost less gas when deployed
    ISwapRouter public constant swapRouter =
        ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);

    //note the swap router contract is deployed in the smart contract provided in the instance of the uniswap router above

    //we will start with swapping WETH to token2 as hardhat already has given usse some amount of Ether
    // address public constant token2 = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    // address public constant WETH9 = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    // address public constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;

    function swapExactInputSingle(
        address token1,
        address token2,
        uint256 amountIn
    ) external returns (uint256 amountOut) {
        //we will transfer the token/fund to uniswap smart contract to help us spend the token on our
        //  behalf the approve them using approve fucntion from unsswap router to spend the token on our stead
        TransferHelper.safeTransferFrom(
            token1,
            msg.sender,
            address(this),
            amountIn
        );

        TransferHelper.safeApprove(token1, address(swapRouter), amountIn);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: token1,
                tokenOut: token2,
                fee: 3000,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        amountOut = swapRouter.exactInputSingle(params);
    }

    //let's write a function for fixed amount of output swap
    function swapExactOutputSingle(
        address token1,
        address token2,
        uint256 amountOut,
        uint256 amountInMaximum
    ) external returns (uint256 amountIn) {
        TransferHelper.safeTransferFrom(
            token1,
            msg.sender,
            address(this),
            amountInMaximum
        );

        // TransferHelper.safeApproval(token1, address(swapRouter), amountInMaximum);
        TransferHelper.safeApprove(
            token1,
            address(swapRouter),
            amountInMaximum
        );

        ISwapRouter.ExactOutputSingleParams memory params = ISwapRouter
            .ExactOutputSingleParams({
                tokenIn: token1,
                tokenOut: token2,
                fee: 3000,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountOut: amountOut,
                amountInMaximum: amountInMaximum,
                sqrtPriceLimitX96: 0
            });

        amountIn = swapRouter.exactOutputSingle(params);

        if (amountIn < amountInMaximum) {
            TransferHelper.safeApprove(token1, address(swapRouter), 0);

            TransferHelper.safeTransfer(
                token1,
                msg.sender,
                amountInMaximum - amountIn
            );
        }
    }
}
