package com.emmanuelmess.schoolwebproject.web.rest;

import com.emmanuelmess.schoolwebproject.SchoolWebProjectApp;

import com.emmanuelmess.schoolwebproject.domain.ThreadMessage;
import com.emmanuelmess.schoolwebproject.repository.ThreadMessageRepository;
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
 * Test class for the ThreadMessageResource REST controller.
 *
 * @see ThreadMessageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolWebProjectApp.class)
public class ThreadMessageResourceIntTest {

    @Autowired
    private ThreadMessageRepository threadMessageRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restThreadMessageMockMvc;

    private ThreadMessage threadMessage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ThreadMessageResource threadMessageResource = new ThreadMessageResource(threadMessageRepository);
        this.restThreadMessageMockMvc = MockMvcBuilders.standaloneSetup(threadMessageResource)
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
    public static ThreadMessage createEntity(EntityManager em) {
        ThreadMessage threadMessage = new ThreadMessage();
        return threadMessage;
    }

    @Before
    public void initTest() {
        threadMessage = createEntity(em);
    }

    @Test
    @Transactional
    public void createThreadMessage() throws Exception {
        int databaseSizeBeforeCreate = threadMessageRepository.findAll().size();

        // Create the ThreadMessage
        restThreadMessageMockMvc.perform(post("/api/thread-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(threadMessage)))
            .andExpect(status().isCreated());

        // Validate the ThreadMessage in the database
        List<ThreadMessage> threadMessageList = threadMessageRepository.findAll();
        assertThat(threadMessageList).hasSize(databaseSizeBeforeCreate + 1);
        ThreadMessage testThreadMessage = threadMessageList.get(threadMessageList.size() - 1);
    }

    @Test
    @Transactional
    public void createThreadMessageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = threadMessageRepository.findAll().size();

        // Create the ThreadMessage with an existing ID
        threadMessage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restThreadMessageMockMvc.perform(post("/api/thread-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(threadMessage)))
            .andExpect(status().isBadRequest());

        // Validate the ThreadMessage in the database
        List<ThreadMessage> threadMessageList = threadMessageRepository.findAll();
        assertThat(threadMessageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllThreadMessages() throws Exception {
        // Initialize the database
        threadMessageRepository.saveAndFlush(threadMessage);

        // Get all the threadMessageList
        restThreadMessageMockMvc.perform(get("/api/thread-messages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(threadMessage.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getThreadMessage() throws Exception {
        // Initialize the database
        threadMessageRepository.saveAndFlush(threadMessage);

        // Get the threadMessage
        restThreadMessageMockMvc.perform(get("/api/thread-messages/{id}", threadMessage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(threadMessage.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingThreadMessage() throws Exception {
        // Get the threadMessage
        restThreadMessageMockMvc.perform(get("/api/thread-messages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateThreadMessage() throws Exception {
        // Initialize the database
        threadMessageRepository.saveAndFlush(threadMessage);

        int databaseSizeBeforeUpdate = threadMessageRepository.findAll().size();

        // Update the threadMessage
        ThreadMessage updatedThreadMessage = threadMessageRepository.findById(threadMessage.getId()).get();
        // Disconnect from session so that the updates on updatedThreadMessage are not directly saved in db
        em.detach(updatedThreadMessage);

        restThreadMessageMockMvc.perform(put("/api/thread-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedThreadMessage)))
            .andExpect(status().isOk());

        // Validate the ThreadMessage in the database
        List<ThreadMessage> threadMessageList = threadMessageRepository.findAll();
        assertThat(threadMessageList).hasSize(databaseSizeBeforeUpdate);
        ThreadMessage testThreadMessage = threadMessageList.get(threadMessageList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingThreadMessage() throws Exception {
        int databaseSizeBeforeUpdate = threadMessageRepository.findAll().size();

        // Create the ThreadMessage

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restThreadMessageMockMvc.perform(put("/api/thread-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(threadMessage)))
            .andExpect(status().isBadRequest());

        // Validate the ThreadMessage in the database
        List<ThreadMessage> threadMessageList = threadMessageRepository.findAll();
        assertThat(threadMessageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteThreadMessage() throws Exception {
        // Initialize the database
        threadMessageRepository.saveAndFlush(threadMessage);

        int databaseSizeBeforeDelete = threadMessageRepository.findAll().size();

        // Get the threadMessage
        restThreadMessageMockMvc.perform(delete("/api/thread-messages/{id}", threadMessage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ThreadMessage> threadMessageList = threadMessageRepository.findAll();
        assertThat(threadMessageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ThreadMessage.class);
        ThreadMessage threadMessage1 = new ThreadMessage();
        threadMessage1.setId(1L);
        ThreadMessage threadMessage2 = new ThreadMessage();
        threadMessage2.setId(threadMessage1.getId());
        assertThat(threadMessage1).isEqualTo(threadMessage2);
        threadMessage2.setId(2L);
        assertThat(threadMessage1).isNotEqualTo(threadMessage2);
        threadMessage1.setId(null);
        assertThat(threadMessage1).isNotEqualTo(threadMessage2);
    }
}
