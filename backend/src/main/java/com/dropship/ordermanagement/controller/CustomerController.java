package com.dropship.ordermanagement.controller;

import com.dropship.ordermanagement.model.Order;
import com.dropship.ordermanagement.model.Product;
import com.dropship.ordermanagement.repository.OrderRepository;
import com.dropship.ordermanagement.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private OrderRepository orderRepository;

    // Customer can browse all products
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Customer can view their orders
    @GetMapping("/orders/{userId}")
    public List<Order> getMyOrders(@PathVariable Long userId) {
        return orderRepository.findByUserId(userId);
    }

    // Customer can place an order
    @PostMapping("/orders")
    public Order placeOrder(@RequestBody Order order) {
        // Generate order number
        order.setOrderNumber("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        order.setStatus("PENDING");
        return orderRepository.save(order);
    }

    // Customer can view order by ID
    @GetMapping("/orders/details/{orderId}")
    public Order getOrderDetails(@PathVariable Long orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }
}
