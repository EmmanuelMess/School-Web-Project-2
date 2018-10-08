package com.emmanuelmess.schoolwebproject.repository;

import com.emmanuelmess.schoolwebproject.domain.Message;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Message entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

}
