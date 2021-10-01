import express from "express"
import db from "../../db/modals/index.js"

const router = express.Router()
const { Cart } = db

router
.route("/")
.get(async(req, res, next) => {
    try {
        const data = await Cart.findAll()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})
.post(async(req, res, next) => {
    try {
        const data = await Cart.create(req.body)
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

router
.route("/:id")
.get(async(req, res, next) => {
    try {
        const data = await Cart.findOne({
            where: { id: req.params.id },
           
          });
          if (data) {
            res.send(data);
          } else {
            res.status(404).send("Not found");
          }
    } catch (error) {
        console.log(error)
    }
})
.put(async(req, res, next) => {
    try {
        const data = await Cart.update(req.body, {
            where: {
              id: req.params.id,
            },
            returning: true,
          });
          res.send(data[1][0]);
    } catch (error) {
        console.log(error)
    }
})
.delete(async(req, res, next) => {
    try {
        const rows = await User.destroy({ where: { id: req.params.id } });
        if (rows > 0) {
          res.send("Deleted successfully!!");
        } else {
          res.status(404).send("Not found");
        }
    } catch (error) {
        console.log(error)
    }
})

export default router;