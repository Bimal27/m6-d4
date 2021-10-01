import express from "express";
import db from "../../db/modals/index.js";
import s from "sequelize";
import Category from "../../db/modals/category.js";
// import Cart from "../../db/modals/cart.js";
const { Op } = s;
const router = express.Router();

const { Product, Review , ProductCategory, Cart } = db;

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findAll({
        include: [Review, {model:Category, through:{attributes:[]}}]
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const  {categoryId,userId, ...rest} = req.body
      const product = await Product.create(rest);
      const data = await ProductCategory.create({categoryId, productId:product.id})

      const userData  = await Cart.create({userId, productId:product.id})
  

      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findByPk(req.params.id);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const data = await Product.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
      });
      res.send(data[1][0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await Product.destroy({ where: { id: req.params.id } });
      if (rows > 0) {
        res.send("ok");
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default router;