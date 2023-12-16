package com.levi.microservicedemo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;

@CrossOrigin(
        origins = {
                "http://localhost:3000",
                "https://staging.example.com",
                "https://app.example.com"
        },
        methods = {
                RequestMethod.OPTIONS,
                RequestMethod.GET,
                RequestMethod.PUT,
                RequestMethod.DELETE,
                RequestMethod.POST
        })
@RestController
public class ShopifyController {

    Logger LOGGER = LoggerFactory.getLogger(HelloController.class.getSimpleName());


    @Autowired
    RestTemplate restTemplate;

    @GetMapping("/shopifyget/{id}")
    public String getProducts(@PathVariable("id") String id) {
        LOGGER.info("Received  Get Product Request {}", id);

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
                headers.set("X-Shopify-Access-Token", "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");
        HttpEntity<String> entity = new HttpEntity<String>(headers);

        //https://pmoditeststore.myshopify.com/admin/api/2023-10/products/7348002193508.json
        StringBuilder sb = new StringBuilder();
        sb.append("https://quickstart-efc5dafb.myshopify.com/admin/api/2023-10/products/");
        sb.append(id);
        sb.append(".json");
        LOGGER.info("final URL: " + sb.toString());

        return restTemplate.exchange(sb.toString(), HttpMethod.GET, entity, String.class).getBody();

    }

    @PutMapping("/shopifyput")
    public ResponseEntity<Root> hello(@RequestBody Product product) {
        LOGGER.info("Received  Product Update Request {} - {}", product.id, product.title);

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.set("X-Shopify-Access-Token", "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");

        Product productEntity = new Product();
        productEntity.setId(product.id);
        productEntity.setTitle(product.title);

        Root rootEntity = new Root();
        rootEntity.setProduct(productEntity);

        HttpEntity<Root> entity = new HttpEntity<Root>(rootEntity, headers);

        StringBuilder sb = new StringBuilder();
        sb.append("https://quickstart-efc5dafb.myshopify.com/admin/api/2023-10/products/");
        sb.append(productEntity.id);
        sb.append(".json");

        LOGGER.info("final URL: " + sb.toString());
        return restTemplate.exchange(sb.toString(), HttpMethod.PUT, entity, Root.class);

    }
}
