import Review from "./review.js";
import Product from "./products.js";
import Category from "./category.js";
import User from "./user.js"
import ProductCategory from "./productCategory.js"


Product.hasMany(Review); 
Review.belongsTo(Product); 

User.hasMany(Review);
Review.belongsTo(User)


Product.belongsToMany(Category,{
    through: { model: ProductCategory, unique: false },
})
Category.belongsToMany(Product, {
    through: { model: ProductCategory, unique: false },
})

export default { Review, Product ,Category, ProductCategory, User};