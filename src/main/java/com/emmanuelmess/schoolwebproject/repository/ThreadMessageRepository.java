package com.emmanuelmess.schoolwebproject.repository;

import com.emmanuelmess.schoolwebproject.domain.ThreadMessage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ThreadMessage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThreadMessageRepository extends JpaRepository<ThreadMessage, Long> {

}
