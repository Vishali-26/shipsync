package com.dropship.ordermanagement.controller;

import com.dropship.ordermanagement.model.Product;
import com.dropship.ordermanagement.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class SimpleProductController {
    
    @Autowired
    private ProductRepository productRepository;
    
   
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
   
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.orElse(null);
    }
    
    
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }
    
    
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setPrice(productDetails.getPrice());
            product.setStockQuantity(productDetails.getStockQuantity());
            product.setCategory(productDetails.getCategory());
            return productRepository.save(product);
        }
        return null;
    }
    
    
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return "Product deleted successfully";
    }
    
  
    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String name) {
        return productRepository.findByNameContaining(name);
    }
    
   
    @GetMapping("/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        return productRepository.findByCategory(category);
    }
}
