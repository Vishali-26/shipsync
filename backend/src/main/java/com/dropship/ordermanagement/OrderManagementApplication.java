package com.dropship.ordermanagement;

import com.dropship.ordermanagement.model.Product;
import com.dropship.ordermanagement.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OrderManagementApplication implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    public static void main(String[] args) {
        SpringApplication.run(OrderManagementApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
       
        addDefaultProducts();
    }

    private void addDefaultProducts() {
       
        productRepository.deleteAll();

        Product[] defaultProducts = {
            new Product("Wireless Bluetooth Headphones", "High-quality wireless headphones with noise cancellation", 79.99, 25, "Electronics"),
            new Product("Smart Fitness Watch", "Track your fitness goals with this advanced smartwatch", 199.99, 15, "Electronics"),
            new Product("Organic Cotton T-Shirt", "Comfortable and eco-friendly cotton t-shirt", 24.99, 50, "Clothing"),
            new Product("Stainless Steel Water Bottle", "Insulated water bottle that keeps drinks cold for 24 hours", 29.99, 30, "Home & Garden"),
            new Product("Wireless Phone Charger", "Fast wireless charging pad compatible with all Qi devices", 34.99, 20, "Electronics"),
            new Product("Yoga Mat Premium", "Non-slip yoga mat perfect for all types of workouts", 49.99, 18, "Sports & Fitness"),
            new Product("Coffee Maker Deluxe", "Programmable coffee maker with built-in grinder", 149.99, 12, "Home & Garden"),
            new Product("Gaming Mechanical Keyboard", "RGB backlit mechanical keyboard for gaming enthusiasts", 89.99, 22, "Electronics"),
            new Product("Running Shoes Pro", "Lightweight running shoes with advanced cushioning", 129.99, 35, "Sports & Fitness"),
            new Product("Ceramic Dinner Set", "Beautiful 16-piece ceramic dinner set for family meals", 69.99, 14, "Home & Garden")
        };

        for (Product product : defaultProducts) {
            productRepository.save(product);
        }

        System.out.println("✅ Added 10 default products to the database!");
    }
}
