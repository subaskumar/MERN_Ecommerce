const Product = require("../model/ProductModel");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "nettantra",
  api_key: "991146668777348",
  api_secret: "FJBAMAot4WlkW8tRyMKOQyma0YE",
});


exports.createProduct = (req, res) => {
  console.log("body")
  console.log(req.body)
  const { name, price, description, quantity } = req.body;
  var productPictures = [];

  // req.files.photos.map((photo) => {
    cloudinary.uploader.upload(req.files.photos.tempFilePath, (err, result) =>{
      productPictures.push(result.url)
      })
  // })
  setTimeout(function() { 
  const product = new Product({
    name: name,
    price,
    quantity,
    description,
    productPictures
  });
  console.log(productPictures)
  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product, files: req.files });
    }
  });
  }, 3000);
};
;

exports.getProducts = async (req, res) => {
    const products = await Product.find()
    res.status(200).json({ products });
  };

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

exports.deleteProductById = (req, res) => {
  // const { productId } = req.body.payload;
  const { productId } = req.params;
  console.log(req.params)

  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};