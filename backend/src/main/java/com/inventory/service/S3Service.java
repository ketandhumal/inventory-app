package com.inventory.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.nio.file.Path;

@Service
public class S3Service {

    private final S3Client s3Client;
    private final String region; 

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    public S3Service(@Value("${aws.region}") String region,
                     @Value("${aws.access-key}") String accessKey,
                     @Value("${aws.secret-key}") String secretKey) {
        this.region = region;

        s3Client = S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(
                        StaticCredentialsProvider.create(
                                AwsBasicCredentials.create(accessKey, secretKey)
                        )
                ).build();
    }

    public String uploadFile(String keyName, Path filePath) throws IOException {
        try {
            s3Client.putObject(PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(keyName)
                            .acl("public-read")
                            .build(),
                    filePath);
        } catch (S3Exception e) {
            throw new IOException("S3 Upload failed: " + e.awsErrorDetails().errorMessage());
        }
        return getFileUrl(keyName);
    }

    public String getFileUrl(String keyName) {
        return "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + keyName;
    }
}
