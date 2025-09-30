package com.inventory.service;

import com.inventory.model.Product;
import com.inventory.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

 public Product saveProduct(String name, String description, Double price, Integer quantity, MultipartFile image) throws IOException {
    String fileName = null;

    // Save image only if it exists
    if (image != null && !image.isEmpty()) {
        fileName = System.currentTimeMillis() + "_" + Path.of(image.getOriginalFilename()).getFileName().toString();
        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(fileName);
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
    }

    // Always save product, with or without image
    Product product = new Product();
    product.setName(name);
    product.setDescription(description != null ? description : "");
    product.setPrice(price != null ? price : 0.0);
    product.setQuantity(quantity != null ? quantity : 0);
    product.setImageUrl(fileName); // stays null if no image uploaded

    return repository.save(product);
}

    public List<Product> getAllProducts() {
        return repository.findAll();
    }
}
