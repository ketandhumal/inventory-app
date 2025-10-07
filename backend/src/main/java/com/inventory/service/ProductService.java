package com.inventory.service;

import com.inventory.model.Product;
import com.inventory.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;
    private final S3Service s3Service;

    public ProductService(ProductRepository repository, S3Service s3Service) {
        this.repository = repository;
        this.s3Service = s3Service;
    }

    public Product saveProduct(String name, String description, Double price, Integer quantity, MultipartFile image) throws IOException {
        String imageUrl = null;

        if (image != null && !image.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + Path.of(image.getOriginalFilename()).getFileName().toString();
            Path tempFile = Files.createTempFile("upload-", fileName);
            Files.write(tempFile, image.getBytes());
            imageUrl = s3Service.uploadFile(fileName, tempFile);
            Files.deleteIfExists(tempFile);
        }

        Product product = new Product();
        product.setName(name);
        product.setDescription(description != null ? description : "");
        product.setPrice(price != null ? price : 0.0);
        product.setQuantity(quantity != null ? quantity : 0);
        product.setImageUrl(imageUrl);

        return repository.save(product);
    }

    public List<Product> getAllProducts() {
        return repository.findAll();
    }
}
