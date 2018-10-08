package com.emmanuelmess.schoolwebproject.web.rest;

import com.emmanuelmess.schoolwebproject.SchoolWebProjectApp;

import com.emmanuelmess.schoolwebproject.domain.Weapon;
import com.emmanuelmess.schoolwebproject.repository.WeaponRepository;
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
 * Test class for the WeaponResource REST controller.
 *
 * @see WeaponResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolWebProjectApp.class)
public class WeaponResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_NAME = "BBBBBBBBBB";

    @Autowired
    private WeaponRepository weaponRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWeaponMockMvc;

    private Weapon weapon;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WeaponResource weaponResource = new WeaponResource(weaponRepository);
        this.restWeaponMockMvc = MockMvcBuilders.standaloneSetup(weaponResource)
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
    public static Weapon createEntity(EntityManager em) {
        Weapon weapon = new Weapon()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .imageName(DEFAULT_IMAGE_NAME);
        return weapon;
    }

    @Before
    public void initTest() {
        weapon = createEntity(em);
    }

    @Test
    @Transactional
    public void createWeapon() throws Exception {
        int databaseSizeBeforeCreate = weaponRepository.findAll().size();

        // Create the Weapon
        restWeaponMockMvc.perform(post("/api/weapons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(weapon)))
            .andExpect(status().isCreated());

        // Validate the Weapon in the database
        List<Weapon> weaponList = weaponRepository.findAll();
        assertThat(weaponList).hasSize(databaseSizeBeforeCreate + 1);
        Weapon testWeapon = weaponList.get(weaponList.size() - 1);
        assertThat(testWeapon.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testWeapon.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testWeapon.getImageName()).isEqualTo(DEFAULT_IMAGE_NAME);
    }

    @Test
    @Transactional
    public void createWeaponWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = weaponRepository.findAll().size();

        // Create the Weapon with an existing ID
        weapon.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWeaponMockMvc.perform(post("/api/weapons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(weapon)))
            .andExpect(status().isBadRequest());

        // Validate the Weapon in the database
        List<Weapon> weaponList = weaponRepository.findAll();
        assertThat(weaponList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = weaponRepository.findAll().size();
        // set the field null
        weapon.setName(null);

        // Create the Weapon, which fails.

        restWeaponMockMvc.perform(post("/api/weapons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(weapon)))
            .andExpect(status().isBadRequest());

        List<Weapon> weaponList = weaponRepository.findAll();
        assertThat(weaponList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkImageNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = weaponRepository.findAll().size();
        // set the field null
        weapon.setImageName(null);

        // Create the Weapon, which fails.

        restWeaponMockMvc.perform(post("/api/weapons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(weapon)))
            .andExpect(status().isBadRequest());

        List<Weapon> weaponList = weaponRepository.findAll();
        assertThat(weaponList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllWeapons() throws Exception {
        // Initialize the database
        weaponRepository.saveAndFlush(weapon);

        // Get all the weaponList
        restWeaponMockMvc.perform(get("/api/weapons?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(weapon.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].imageName").value(hasItem(DEFAULT_IMAGE_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getWeapon() throws Exception {
        // Initialize the database
        weaponRepository.saveAndFlush(weapon);

        // Get the weapon
        restWeaponMockMvc.perform(get("/api/weapons/{id}", weapon.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(weapon.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.imageName").value(DEFAULT_IMAGE_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingWeapon() throws Exception {
        // Get the weapon
        restWeaponMockMvc.perform(get("/api/weapons/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWeapon() throws Exception {
        // Initialize the database
        weaponRepository.saveAndFlush(weapon);

        int databaseSizeBeforeUpdate = weaponRepository.findAll().size();

        // Update the weapon
        Weapon updatedWeapon = weaponRepository.findById(weapon.getId()).get();
        // Disconnect from session so that the updates on updatedWeapon are not directly saved in db
        em.detach(updatedWeapon);
        updatedWeapon
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .imageName(UPDATED_IMAGE_NAME);

        restWeaponMockMvc.perform(put("/api/weapons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWeapon)))
            .andExpect(status().isOk());

        // Validate the Weapon in the database
        List<Weapon> weaponList = weaponRepository.findAll();
        assertThat(weaponList).hasSize(databaseSizeBeforeUpdate);
        Weapon testWeapon = weaponList.get(weaponList.size() - 1);
        assertThat(testWeapon.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testWeapon.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testWeapon.getImageName()).isEqualTo(UPDATED_IMAGE_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingWeapon() throws Exception {
        int databaseSizeBeforeUpdate = weaponRepository.findAll().size();

        // Create the Weapon

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWeaponMockMvc.perform(put("/api/weapons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(weapon)))
            .andExpect(status().isBadRequest());

        // Validate the Weapon in the database
        List<Weapon> weaponList = weaponRepository.findAll();
        assertThat(weaponList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWeapon() throws Exception {
        // Initialize the database
        weaponRepository.saveAndFlush(weapon);

        int databaseSizeBeforeDelete = weaponRepository.findAll().size();

        // Get the weapon
        restWeaponMockMvc.perform(delete("/api/weapons/{id}", weapon.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Weapon> weaponList = weaponRepository.findAll();
        assertThat(weaponList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Weapon.class);
        Weapon weapon1 = new Weapon();
        weapon1.setId(1L);
        Weapon weapon2 = new Weapon();
        weapon2.setId(weapon1.getId());
        assertThat(weapon1).isEqualTo(weapon2);
        weapon2.setId(2L);
        assertThat(weapon1).isNotEqualTo(weapon2);
        weapon1.setId(null);
        assertThat(weapon1).isNotEqualTo(weapon2);
    }
}
