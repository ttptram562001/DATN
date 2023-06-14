package com.example.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService{

    @Override
    public String uploadImage(String path, MultipartFile file) throws IOException {
        String name = file.getOriginalFilename();

        String randomID = UUID.randomUUID().toString();
        String fileName = randomID.concat(name.substring(name.lastIndexOf("."))) ;

        String filePath = path + File.separator + fileName;
        File f = new File(path);

        if (!f.exists()) {
            f.mkdir();
        }

        Files.copy(file.getInputStream(), Paths.get(filePath));
        return fileName;
    }

    @Override
    public InputStream getResource(String path, String fileName) throws FileNotFoundException {
        String pullPath = path + File.separator + fileName;
        InputStream is = new FileInputStream(pullPath);
        return is;
    }
}
