import Product from "../models/Product.js";

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get one product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { name, price, description, stock } = req.body;
        
        // Validate required fields
        if (!name || !price || !description || !stock) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newProduct = new Product({ name, price, description, stock });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const { name, price, description, stock } = req.body;

        // Ensure at least one field is being updated
        if (!name && !price && !description && !stock) {
            return res.status(400).json({ message: "At least one field must be updated" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
