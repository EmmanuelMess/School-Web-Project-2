package com.emmanuelmess.schoolwebproject.repository;

import com.emmanuelmess.schoolwebproject.domain.Thread;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Thread entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThreadRepository extends JpaRepository<Thread, Long> {

    @Query("select thread from Thread thread where thread.user.login = ?#{principal.username}")
    List<Thread> findByUserIsCurrentUser();

}
