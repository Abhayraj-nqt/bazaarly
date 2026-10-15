package com.bazaarly.gatewayserver.config;

// import java.time.LocalDateTime;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

        @Bean
        RouteLocator customRouteLocatorConfig(RouteLocatorBuilder routeLocatorBuilder) {
                // return routeLocatorBuilder.routes()
                // .route(p -> p.path("/bazaarly/catalogue/**")
                // .filters(f -> f.rewritePath("/bazaarly/catalogue/(?<segment>.*)",
                // "/${segment}")
                // .addResponseHeader("X-Response-Time",
                // LocalDateTime.now().toString()))
                // .uri("lb://catalogue"))
                // .build();
                return routeLocatorBuilder.routes()
                                .route("catalog-service", r -> r.path("/bazaarly/catalogue/**")
                                                .filters(f -> f.rewritePath("/bazaarly/catalogue/?(?<segment>.*)",
                                                                "/${segment}"))
                                                // .uri("http://localhost:8081"))
                                                .uri("lb://catalogue"))
                                .build();
        }

}
