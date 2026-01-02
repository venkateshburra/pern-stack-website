import { Router } from "express";
import { createProducts, deleteProducts, getAllProducts, getProducts, updateProducts } from "../controllers/productsController.js";

const router = Router();

router.get('/', getAllProducts )
router.get('/:id', getProducts )
router.post('/', createProducts )
router.put('/:id', updateProducts )
router.delete('/:id', deleteProducts )




export default router;