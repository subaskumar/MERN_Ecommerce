const express = require("express");
const {addItemToCart,getCartItems,removeCartItems,} = require("../controller/cart");
const { requireSignin, userMiddleware } = require("../common-middleware/index");
const router = express.Router();

router.patch("/user/cart/addtocart",requireSignin,userMiddleware,addItemToCart);
router.get("/user/getCartItems", requireSignin, userMiddleware, getCartItems);
router.post("/user/cart/removeItem",requireSignin,userMiddleware,removeCartItems);

module.exports = router;