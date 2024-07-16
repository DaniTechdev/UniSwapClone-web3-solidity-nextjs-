//SPDX-License-Identifier:GPL-2.0-or-later

pragma solidity >=0.7 <0.9.0;

pragma abicoder v2;

import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-core/contracts/libraries/TickMath.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";
import "@uniswap/v3-periphery/contracts/base/LiquidityManagement.sol";
import "hardhat/console.sol";

contract LiquidityExamples is IERC721Receiver {
    address public constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address public constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;

    //0.01%

    uint24 public constant poolFee = 100;
    //Will have to searchf for the updated nonfungiblePositionManager  contract addresss
    INonfungiblePositionManager public nonfungiblePositionManager =
        INonfungiblePositionManager(0xC36442b4a4522E871399CD717aBDD847Ab11FE88);

    //@notice Representss the deposit of an NFT since every liquidity will have a unique identity in our exchange which can be possible usisng nft intance

    struct Deposit {
        address owner;
        uint128 liquidity;
        address token0;
        address token1;
    }

    //@dev deposit[tokenId] => Deposit

    mapping(uint => Deposit) public deposits;

    //store token id used in this example
    uint public tokenId;

    //implementing onERC721Received so this contract can receive custody of erc721 token
    function onERC721Received(
        address operator,
        address,
        uint _tokenId,
        bytes calldata
    ) external override returns (bytes4) {
        _createDeposit(operator, _tokenId);
        return this.onERC721Received.selector;
    }

    function _createDeposit(address owner, uint _tokenId) internal {
        (
            ,
            ,
            address token0,
            address token1,
            ,
            ,
            ,
            uint128 liquidity,
            ,
            ,
            ,

        ) = nonfungiblePositionManager.positions(_tokenId);

        //set the owner and data for position
        //operator is msg.sender

        deposits[_tokenId] = Deposit({
            owner: owner,
            liquidity: liquidity,
            token0: token0,
            token1: token1
        });

        console.log("Token id", _tokenId);
        console.log("Liquidity", liquidity);

        tokenId = _tokenId;
    }

    //function  that can mint
    function mintNewPosition()
        external
        returns (uint _tokenId, uint128 liquidity, uint amount0, uint amount1)
    {
        //for this example we will provide equal amounts of liquidity to both assets
        //providing liquidity in both assests means liquidity will be earning fees and is in-range
        uint amount0ToMint = 1e18;
        uint amount1ToMint = 1e6;
        //Approve the position mananger
        TransferHelper.safeApprove(
            DAI,
            address(nonfungiblePositionManager),
            amount0ToMint
        );

        TransferHelper.safeApprove(
            USDC,
            address(nonfungiblePositionManager),
            amount1ToMint
        );

        INonfungiblePositionManager.MintParams memory params = INonfungiblePositionManager
            .MintParams({
                token0: DAI,
                token1: USDC,
                fee: poolFee,
                //By using TickMath.MIN_TICK and TickMath.MAX_TICK,
                //we are providing liquidity accros the whole range of the pool.
                //Not recommended in production
                tickLower: TickMath.MIN_TICK,
                tickUpper: TickMath.MAX_TICK,
                amount0Desired: amount0ToMint,
                amount1Desired: amount1ToMint,
                amount0Min: 0,
                amount1Min: 0,
                recipient: address(this),
                deadline: block.timestamp
            });
        //Note that the pool defined by DAI/USDC and fee tier 0.01% must
        //already  be created and initialized in order to mint
        (_tokenId, liquidity, amount0, amount1) = nonfungiblePositionManager
            .mint(params);

        //Create a deposit
        _createDeposit(msg.sender, _tokenId);

        //Remove allowance and refund in both assets
        if (amount0 < amount0ToMint) {
            TransferHelper.safeApprove(
                DAI,
                address(nonfungiblePositionManager),
                0
            );
            uint refund0 = amount0ToMint - amount0;
            TransferHelper.safeTransfer(DAI, msg.sender, refund0);
        }

        if (amount1 < amount1ToMint) {
            TransferHelper.safeApprove(
                USDC,
                address(nonfungiblePositionManager),
                0
            );
            uint refund1 = amount1ToMint - amount1;
            TransferHelper.safeTransfer(USDC, msg.sender, refund1);
        }
    }

    //functions to increate or decrease liquidity fee, functions to remove or decrease the liquidity added into the liquidity pool

    //function to collectAllFee when someoen do the transactions/swap
    function collectAllFees()
        external
        returns (uint256 amount0, uint256 amount1)
    {
        //set amount0Max and amount1Max to uint256.max to collect all fees
        //alternately can set recipient to msg.sender and avoid another transaction in "sendToOwner"

        INonfungiblePositionManager.CollectParams
            memory params = INonfungiblePositionManager.CollectParams({
                tokenId: tokenId,
                recipient: address(this),
                amount0Max: type(uint128).max,
                amount1Max: type(uint128).max
            });

        (amount0, amount1) = nonfungiblePositionManager.collect(params);

        console.log("fee o", amount0);
        console.log("fee 1", amount1);
    }

    //function to increase current liquidity
    function increaseLiquidityCurrentRange(
        uint256 amountAdd0,
        uint256 amountAdd1
    ) external returns (uint128 liquidity, uint256 amount0, uint256 amount1) {
        TransferHelper.safeTransferFrom(
            DAI,
            msg.sender,
            address(this),
            amountAdd0
        );
        TransferHelper.safeTransferFrom(
            USDC,
            msg.sender,
            address(this),
            amountAdd1
        );

        TransferHelper.safeApprove(
            DAI,
            address(nonfungiblePositionManager),
            amountAdd0
        );
        TransferHelper.safeApprove(
            USDC,
            address(nonfungiblePositionManager),
            amountAdd1
        );

        INonfungiblePositionManager.IncreaseLiquidityParams
            memory params = INonfungiblePositionManager
                .IncreaseLiquidityParams({
                    tokenId: tokenId,
                    amount0Desired: amountAdd0,
                    amount1Desired: amountAdd1,
                    amount0Min: 0,
                    amount1Min: 0,
                    deadline: block.timestamp
                });

        (liquidity, amount0, amount1) = nonfungiblePositionManager
            .increaseLiquidity(params);
        console.log("Liquidity", liquidity);
        console.log("amount0", amount0);
        console.log("amount1", amount1);
    }

    //function to know or get the amount of liquidity one has provided in the liquidity pool
    function getLiquidity(uint _tokenId) external view returns (uint128) {
        (, , , , , , , uint128 liquidity, , , , ) = nonfungiblePositionManager
            .positions(_tokenId);

        return liquidity;
    }

    //function to decrease current liquidity
    function decreaseLiquidity(
        uint128 liquidity
    ) external returns (uint amount0, uint amount1) {
        INonfungiblePositionManager.DecreaseLiquidityParams
            memory params = INonfungiblePositionManager
                .DecreaseLiquidityParams({
                    tokenId: tokenId,
                    liquidity: liquidity,
                    amount0Min: 0,
                    amount1Min: 0,
                    deadline: block.timestamp
                });

        (amount0, amount1) = nonfungiblePositionManager.decreaseLiquidity(
            params
        );
        console.log("amount 0", amount0);
        console.log("amount 1", amount1);
    }
}
