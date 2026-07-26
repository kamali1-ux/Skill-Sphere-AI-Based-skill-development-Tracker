package com.skillsphere.service;

import com.skillsphere.dto.PredictionRequest;
import com.skillsphere.dto.PredictionResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AiPredictionService {
    private final RestTemplate restTemplate = new RestTemplate();
    @Value("${app.ai-service.url}")
    private String aiServiceUrl;

    public PredictionResponse predict(PredictionRequest request) {
        return restTemplate.postForObject(aiServiceUrl + "/predict", request, PredictionResponse.class);
    }
}
