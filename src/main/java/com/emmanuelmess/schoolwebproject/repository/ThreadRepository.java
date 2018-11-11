package com.emmanuelmess.schoolwebproject.repository;

import com.emmanuelmess.schoolwebproject.domain.Thread;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Thread entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThreadRepository extends JpaRepository<Thread, Long> {

}
