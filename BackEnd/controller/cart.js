const Cart = require("../model/cart");
const Product = require("../model/ProductModel")

// function runUpdate(condition, updateData) {
//   return new Promise((resolve, reject) => {

//     Cart.findOneAndUpdate(condition, updateData, { upsert: true })
//       .then((result) => resolve())
//       .catch((err) => reject(err));
//   });
// }

exports.addItemToCart = (req, res) => {
  console.log(req.body)
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    console.log("user id", req.user._id)
    
    if (error) {
      return res.status(400).json({ error });
    }
    if (cart) {
        console.log(cart)
        Product.findOne({ _id: req.body.ProductID }).exec(async (error, product) => {
          const cartItem = cart.cartItems
          const Cproduct = product._id
          const Quantity = 1
          const citem = {product : Cproduct, quantity : Quantity}
          cartItem.push(citem)
          const Mcart = await Cart.findByIdAndUpdate("61babad55552797fa3423d99" ,{cartItems: cartItem})
            // Mcart.save()
          return res.status(201).json({ Mcart });
        })
      } 
      else {
        Product.findOne({ _id: req.body.ProductID }).exec((error, product) => {
          const cartItems = []
          const Cproduct = product
          const Quantity = 1
          const citem = {product : Cproduct, quantity : Quantity}
          cartItems.push(citem)

        //if cart not exist then create a new cart
          const cart = new Cart({
            user: req.user._id,
            cartItems: cartItems,
            price : "100"
          });
          cart.save((error, cart) => {
            if (error) return res.status(400).json({ error });
            if (cart) {
                return res.status(201).json({ cart });
              }
          });
        })
      }
  });
};

exports.getCartItems = (req, res) => {
  //const { user } = req.body.payload;
  //if(user){
  Cart.findOne({ user: req.user._id })
    .populate("cartItems.product", "_id name price productPictures")
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error });
      if (cart) {
        let cartItems = {};
        cart.cartItems.forEach((item, index) => {
          cartItems["products"] = {
            _id: item.product._id.toString(),
            name: item.product.name,
            img: item.product.productPictures[0].img,
            price: item.product.price,
            qty: item.quantity,
          };
        });
        console.log(cartItems)
        const len = cart.cartItems.length
        res.status(200).json({ cartItems,len });
      }
    });
  //}
};

// new update remove cart items
exports.removeCartItems = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Cart.update(
      { user: req.user._id },
      {
        $pull: {
          cartItems: {
            product: productId,
          },
        },
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};