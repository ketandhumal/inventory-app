
package com.inventory.service;
import java.io.IOException;
import java.nio.file.Path;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

@Service
public class S3Service {

    private final S3Client s3Client;

    private final String bucketName;
    private final String region;

    // Inject values from Spring config
    public S3Service(@Value("${aws.s3.bucket-name}") String bucketName,
                     @Value("${aws.region}") String region) {
        this.bucketName = bucketName;
        this.region = region;
        this.s3Client = S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(DefaultCredentialsProvider.builder().build())
                .build();
    }

    public String uploadFile(String keyName, Path filePath) throws IOException {
        try {
            s3Client.putObject(PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(keyName)
                            .build(),
                    filePath);
        } catch (S3Exception e) {
            throw new IOException("S3 Upload failed: " + e.awsErrorDetails().errorMessage(), e);
        }
        return getFileUrl(keyName);
    }

    public String getFileUrl(String keyName) {
        return "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + keyName;
    }
}
