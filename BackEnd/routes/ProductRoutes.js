const router = require("express").Router();
const {createProduct,getProductDetailsById,deleteProductById,getProducts} = require("../controller/product");
const {requireSignin,adminMiddleware} = require("../common-middleware");



router.get("/product/getProducts",getProducts);
router.get("/product/:productId", getProductDetailsById);
router.post("/product/create", requireSignin,adminMiddleware,createProduct);
router.delete("/product/:productId",requireSignin,adminMiddleware,deleteProductById);
module.exports = router;