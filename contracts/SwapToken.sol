//SPDX-License-identifier:GPL-2.0-or-later

pragma solidity >=0.7 <0.9.0;
pragma abicoder v2; //This will allow one to use nested array in our smart contract

//This package from uniswap  will help use to do the transfer
import "@uniswap/v3/contracts/libraries/TransferHelper.sol";

//This will allow us to to the swapping of the tokens
import "@uniswap/v3/contracts/interfaces/ISwapRouter.sol";

contract SingleSwapToken {
    //Define instance of the uniwap swap router whose address will be permanent/constant
    //using constant can equally cost less gas when deployed
    ISwapRouter public constant swapRouter =
       ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
   
    //note the swap router contract is deployed in the smart contract provided in the instance of the uniswap router above

//we will start with swapping WETH to DAI as hardhat already has given usse some amount of Ether
   address public constantt
 DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
 address public constant WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
address public constant USDC = "0x97f991971a37D4Ca58064e6a98FC563F03A71E5c";


function swapExactInputString(uint256 amountIn) external returns(uint256 amountOut){
//we will transfer the token/fund to uniswap smart contract to help us spend the token on our
//  behalf the approve them using approve fucntion from unsswap router to spend the token on our stead
    TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountIn);

    TransferHelper.safeApproval(WETH9, address(swapRouter), amountIn);

    ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
        tokenIn: WETH9,
        tokenOut: DAI,

        fee:3000,
        recipient:msg.msg.sender,
        amountIn:amountIn,
        amountOutMinimum:0,
        sqrtPriceLimitX96:0
    });

    amountOut = swapRouter.exactInputSingle(params);
}

//let's write a function for fixed amount of output
function swapExacInputString(uint amountOut, uint amountInMaximum) external returns(uint amountIn){
    TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountInMaximum);

    // TransferHelper.safeApproval(WETH9, address(swapRouter), amountInMaximum);
    TransferHelper.safeApproval(WETH9, address(this), amountInMaximum);

    ISwapRouter.ExactOutputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
          tokenIn: WETH9,
        tokenOut: DAI,

        fee:3000,
        recipient:msg.msg.sender,
        amountIn:amountIn,
        amountOutMinimum:0,
        sqrtPriceLimitX96:0
    })
}

}
