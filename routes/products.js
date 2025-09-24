import express from "express";
const router = express.Router();
import Product from "../models/products.js";

const findAllProducts = async (req, res) => {
    try {
        const products = await Product.find().select("_id team driver price stock colors description sizes details categories")
        return res.status(200).send({message: "todos los products", products: products})
    } catch(error) {
        return res.status(501).send({message: "hubo un error", error})
    }
};

const findOneProduct = async (req, res) => {
    const {id} = req.params
    try {
        const product = await Product.findOne({_id: id}).select("_id team driver price stock colors description sizes details categories")
        return res.status(200).send({message: "Producto encontrado", product: product})
    } catch (error) {
        return res.status(501).send({message: "hubo un error", error})
    }
}

const addProduct = async (req, res) => {
    
    try {
        const product = new Product(req.body)
        await product.save()
         return res.status(200).send({message: "Producto creado", product: product})
    } catch (error) {
        return res.status(501).send({message: "hubo un error", error})
    }
}

const deleteProduct = async (req, res) => {
    const {id} = req.params
    try {
        const productToDelete = await Product.findOne({_id: id})
    if(!productToDelete){
        return res.status(404).send({message: "No existe el product", id: id})
    }
        await Product.deleteOne({_id: id})
        return res.status(200).send({message: "Producto Borrado", product: productToDelete})
    } catch (error) {
        return res.status(501).send({message: "hubo un error", error})
    }
}

const updateProduct = async (req, res) => {
    const {id} = req.params
    const {name} = req.body
    try {
        const productToUpdate = await Product.findOne({_id: id})
    if(!productToUpdate){
        return res.status(404).send({message: "No existe el product", id: id})
    }

    //valores a actualizar
    productToUpdate.name = name

        await productToUpdate.save()
        return res.status(200).send({message: "Producto actualizado", product: productToUpdate})
    } catch (error) {
        return res.status(501).send({message: "hubo un error", error})
    }
}



//CRUD endpoints
router.get("/", findAllProducts);
router.get("/:id", findOneProduct);
router.post("/", addProduct)
router.delete("/:id",deleteProduct)
router.put("/:id",updateProduct)
export default router;
