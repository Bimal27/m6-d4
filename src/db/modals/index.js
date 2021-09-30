import Review from "./review.js";
import Product from "./products.js";

Product.hasMany(Review); 
Review.belongsTo(Product); 

export default { Review, Product };