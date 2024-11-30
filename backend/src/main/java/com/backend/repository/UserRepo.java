package com.backend.repository;

import com.backend.model.db.UserData;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface UserRepo extends ReactiveCrudRepository<UserData, String> {
    Mono<UserData> findByClientId(String clientId);
}
