package com.backend.repository;

import com.backend.model.db.UserData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<UserData, String> {
    Optional<UserData> findByClientId(String clientId);
}
