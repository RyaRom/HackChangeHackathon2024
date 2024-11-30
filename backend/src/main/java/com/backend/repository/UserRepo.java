package com.backend.repository;

import com.backend.model.db.UserData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<UserData, String> {
    UserData findByClientId(String clientId);
}
