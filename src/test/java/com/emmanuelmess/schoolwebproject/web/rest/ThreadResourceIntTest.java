package com.emmanuelmess.schoolwebproject.web.rest;

import com.emmanuelmess.schoolwebproject.SchoolWebProjectApp;

import com.emmanuelmess.schoolwebproject.domain.Thread;
import com.emmanuelmess.schoolwebproject.repository.ThreadRepository;
import com.emmanuelmess.schoolwebproject.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.emmanuelmess.schoolwebproject.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ThreadResource REST controller.
 *
 * @see ThreadResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolWebProjectApp.class)
public class ThreadResourceIntTest {

    @Autowired
    private ThreadRepository threadRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restThreadMockMvc;

    private Thread thread;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ThreadResource threadResource = new ThreadResource(threadRepository);
        this.restThreadMockMvc = MockMvcBuilders.standaloneSetup(threadResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Thread createEntity(EntityManager em) {
        Thread thread = new Thread();
        return thread;
    }

    @Before
    public void initTest() {
        thread = createEntity(em);
    }

    @Test
    @Transactional
    public void createThread() throws Exception {
        int databaseSizeBeforeCreate = threadRepository.findAll().size();

        // Create the Thread
        restThreadMockMvc.perform(post("/api/threads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(thread)))
            .andExpect(status().isCreated());

        // Validate the Thread in the database
        List<Thread> threadList = threadRepository.findAll();
        assertThat(threadList).hasSize(databaseSizeBeforeCreate + 1);
        Thread testThread = threadList.get(threadList.size() - 1);
    }

    @Test
    @Transactional
    public void createThreadWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = threadRepository.findAll().size();

        // Create the Thread with an existing ID
        thread.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restThreadMockMvc.perform(post("/api/threads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(thread)))
            .andExpect(status().isBadRequest());

        // Validate the Thread in the database
        List<Thread> threadList = threadRepository.findAll();
        assertThat(threadList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllThreads() throws Exception {
        // Initialize the database
        threadRepository.saveAndFlush(thread);

        // Get all the threadList
        restThreadMockMvc.perform(get("/api/threads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(thread.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getThread() throws Exception {
        // Initialize the database
        threadRepository.saveAndFlush(thread);

        // Get the thread
        restThreadMockMvc.perform(get("/api/threads/{id}", thread.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(thread.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingThread() throws Exception {
        // Get the thread
        restThreadMockMvc.perform(get("/api/threads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateThread() throws Exception {
        // Initialize the database
        threadRepository.saveAndFlush(thread);

        int databaseSizeBeforeUpdate = threadRepository.findAll().size();

        // Update the thread
        Thread updatedThread = threadRepository.findById(thread.getId()).get();
        // Disconnect from session so that the updates on updatedThread are not directly saved in db
        em.detach(updatedThread);

        restThreadMockMvc.perform(put("/api/threads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedThread)))
            .andExpect(status().isOk());

        // Validate the Thread in the database
        List<Thread> threadList = threadRepository.findAll();
        assertThat(threadList).hasSize(databaseSizeBeforeUpdate);
        Thread testThread = threadList.get(threadList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingThread() throws Exception {
        int databaseSizeBeforeUpdate = threadRepository.findAll().size();

        // Create the Thread

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restThreadMockMvc.perform(put("/api/threads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(thread)))
            .andExpect(status().isBadRequest());

        // Validate the Thread in the database
        List<Thread> threadList = threadRepository.findAll();
        assertThat(threadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteThread() throws Exception {
        // Initialize the database
        threadRepository.saveAndFlush(thread);

        int databaseSizeBeforeDelete = threadRepository.findAll().size();

        // Get the thread
        restThreadMockMvc.perform(delete("/api/threads/{id}", thread.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Thread> threadList = threadRepository.findAll();
        assertThat(threadList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Thread.class);
        Thread thread1 = new Thread();
        thread1.setId(1L);
        Thread thread2 = new Thread();
        thread2.setId(thread1.getId());
        assertThat(thread1).isEqualTo(thread2);
        thread2.setId(2L);
        assertThat(thread1).isNotEqualTo(thread2);
        thread1.setId(null);
        assertThat(thread1).isNotEqualTo(thread2);
    }
}
