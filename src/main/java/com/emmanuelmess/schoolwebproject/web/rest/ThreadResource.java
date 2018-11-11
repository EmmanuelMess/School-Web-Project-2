package com.emmanuelmess.schoolwebproject.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.emmanuelmess.schoolwebproject.domain.Thread;
import com.emmanuelmess.schoolwebproject.repository.ThreadRepository;
import com.emmanuelmess.schoolwebproject.web.rest.errors.BadRequestAlertException;
import com.emmanuelmess.schoolwebproject.web.rest.util.HeaderUtil;
import com.emmanuelmess.schoolwebproject.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Thread.
 */
@RestController
@RequestMapping("/api")
public class ThreadResource {

    private final Logger log = LoggerFactory.getLogger(ThreadResource.class);

    private static final String ENTITY_NAME = "thread";

    private final ThreadRepository threadRepository;

    public ThreadResource(ThreadRepository threadRepository) {
        this.threadRepository = threadRepository;
    }

    /**
     * POST  /threads : Create a new thread.
     *
     * @param thread the thread to create
     * @return the ResponseEntity with status 201 (Created) and with body the new thread, or with status 400 (Bad Request) if the thread has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/threads")
    @Timed
    public ResponseEntity<Thread> createThread(@RequestBody Thread thread) throws URISyntaxException {
        log.debug("REST request to save Thread : {}", thread);
        if (thread.getId() != null) {
            throw new BadRequestAlertException("A new thread cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Thread result = threadRepository.save(thread);
        return ResponseEntity.created(new URI("/api/threads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /threads : Updates an existing thread.
     *
     * @param thread the thread to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated thread,
     * or with status 400 (Bad Request) if the thread is not valid,
     * or with status 500 (Internal Server Error) if the thread couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/threads")
    @Timed
    public ResponseEntity<Thread> updateThread(@RequestBody Thread thread) throws URISyntaxException {
        log.debug("REST request to update Thread : {}", thread);
        if (thread.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Thread result = threadRepository.save(thread);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, thread.getId().toString()))
            .body(result);
    }

    /**
     * GET  /threads : get all the threads.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of threads in body
     */
    @GetMapping("/threads")
    @Timed
    public ResponseEntity<List<Thread>> getAllThreads(Pageable pageable) {
        log.debug("REST request to get a page of Threads");
        Page<Thread> page = threadRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/threads");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /threads/:id : get the "id" thread.
     *
     * @param id the id of the thread to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the thread, or with status 404 (Not Found)
     */
    @GetMapping("/threads/{id}")
    @Timed
    public ResponseEntity<Thread> getThread(@PathVariable Long id) {
        log.debug("REST request to get Thread : {}", id);
        Optional<Thread> thread = threadRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(thread);
    }

    /**
     * DELETE  /threads/:id : delete the "id" thread.
     *
     * @param id the id of the thread to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/threads/{id}")
    @Timed
    public ResponseEntity<Void> deleteThread(@PathVariable Long id) {
        log.debug("REST request to delete Thread : {}", id);

        threadRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
