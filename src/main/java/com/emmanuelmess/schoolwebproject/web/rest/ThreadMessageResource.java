package com.emmanuelmess.schoolwebproject.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.emmanuelmess.schoolwebproject.domain.ThreadMessage;
import com.emmanuelmess.schoolwebproject.repository.ThreadMessageRepository;
import com.emmanuelmess.schoolwebproject.web.rest.errors.BadRequestAlertException;
import com.emmanuelmess.schoolwebproject.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ThreadMessage.
 */
@RestController
@RequestMapping("/api")
public class ThreadMessageResource {

    private final Logger log = LoggerFactory.getLogger(ThreadMessageResource.class);

    private static final String ENTITY_NAME = "threadMessage";

    private final ThreadMessageRepository threadMessageRepository;

    public ThreadMessageResource(ThreadMessageRepository threadMessageRepository) {
        this.threadMessageRepository = threadMessageRepository;
    }

    /**
     * POST  /thread-messages : Create a new threadMessage.
     *
     * @param threadMessage the threadMessage to create
     * @return the ResponseEntity with status 201 (Created) and with body the new threadMessage, or with status 400 (Bad Request) if the threadMessage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/thread-messages")
    @Timed
    public ResponseEntity<ThreadMessage> createThreadMessage(@RequestBody ThreadMessage threadMessage) throws URISyntaxException {
        log.debug("REST request to save ThreadMessage : {}", threadMessage);
        if (threadMessage.getId() != null) {
            throw new BadRequestAlertException("A new threadMessage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ThreadMessage result = threadMessageRepository.save(threadMessage);
        return ResponseEntity.created(new URI("/api/thread-messages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /thread-messages : Updates an existing threadMessage.
     *
     * @param threadMessage the threadMessage to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated threadMessage,
     * or with status 400 (Bad Request) if the threadMessage is not valid,
     * or with status 500 (Internal Server Error) if the threadMessage couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/thread-messages")
    @Timed
    public ResponseEntity<ThreadMessage> updateThreadMessage(@RequestBody ThreadMessage threadMessage) throws URISyntaxException {
        log.debug("REST request to update ThreadMessage : {}", threadMessage);
        if (threadMessage.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ThreadMessage result = threadMessageRepository.save(threadMessage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, threadMessage.getId().toString()))
            .body(result);
    }

    /**
     * GET  /thread-messages : get all the threadMessages.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of threadMessages in body
     */
    @GetMapping("/thread-messages")
    @Timed
    public List<ThreadMessage> getAllThreadMessages() {
        log.debug("REST request to get all ThreadMessages");
        return threadMessageRepository.findAll();
    }

    /**
     * GET  /thread-messages/:id : get the "id" threadMessage.
     *
     * @param id the id of the threadMessage to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the threadMessage, or with status 404 (Not Found)
     */
    @GetMapping("/thread-messages/{id}")
    @Timed
    public ResponseEntity<ThreadMessage> getThreadMessage(@PathVariable Long id) {
        log.debug("REST request to get ThreadMessage : {}", id);
        Optional<ThreadMessage> threadMessage = threadMessageRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(threadMessage);
    }

    /**
     * DELETE  /thread-messages/:id : delete the "id" threadMessage.
     *
     * @param id the id of the threadMessage to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/thread-messages/{id}")
    @Timed
    public ResponseEntity<Void> deleteThreadMessage(@PathVariable Long id) {
        log.debug("REST request to delete ThreadMessage : {}", id);

        threadMessageRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
