import express from "express";
import db from "../../db/modals/index.js";
const router = express.Router();
const { Product, Review } = db;
router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Review.findAll({
         include: Product,
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Review.create(req.body);
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
        const data = await Review.findByPk(req.params.id);
        res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
        const data = await Review.update(req.body, {
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
        const rows = await Review.destroy({ where: { id: req.params.id } });
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
