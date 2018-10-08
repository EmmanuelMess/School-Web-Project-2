package com.emmanuelmess.schoolwebproject.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.emmanuelmess.schoolwebproject.domain.Weapon;
import com.emmanuelmess.schoolwebproject.repository.WeaponRepository;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Weapon.
 */
@RestController
@RequestMapping("/api")
public class WeaponResource {

    private final Logger log = LoggerFactory.getLogger(WeaponResource.class);

    private static final String ENTITY_NAME = "weapon";

    private final WeaponRepository weaponRepository;

    public WeaponResource(WeaponRepository weaponRepository) {
        this.weaponRepository = weaponRepository;
    }

    /**
     * POST  /weapons : Create a new weapon.
     *
     * @param weapon the weapon to create
     * @return the ResponseEntity with status 201 (Created) and with body the new weapon, or with status 400 (Bad Request) if the weapon has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/weapons")
    @Timed
    public ResponseEntity<Weapon> createWeapon(@Valid @RequestBody Weapon weapon) throws URISyntaxException {
        log.debug("REST request to save Weapon : {}", weapon);
        if (weapon.getId() != null) {
            throw new BadRequestAlertException("A new weapon cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Weapon result = weaponRepository.save(weapon);
        return ResponseEntity.created(new URI("/api/weapons/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /weapons : Updates an existing weapon.
     *
     * @param weapon the weapon to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated weapon,
     * or with status 400 (Bad Request) if the weapon is not valid,
     * or with status 500 (Internal Server Error) if the weapon couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/weapons")
    @Timed
    public ResponseEntity<Weapon> updateWeapon(@Valid @RequestBody Weapon weapon) throws URISyntaxException {
        log.debug("REST request to update Weapon : {}", weapon);
        if (weapon.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Weapon result = weaponRepository.save(weapon);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, weapon.getId().toString()))
            .body(result);
    }

    /**
     * GET  /weapons : get all the weapons.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of weapons in body
     */
    @GetMapping("/weapons")
    @Timed
    public ResponseEntity<List<Weapon>> getAllWeapons(Pageable pageable) {
        log.debug("REST request to get a page of Weapons");
        Page<Weapon> page = weaponRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/weapons");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /weapons/:id : get the "id" weapon.
     *
     * @param id the id of the weapon to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the weapon, or with status 404 (Not Found)
     */
    @GetMapping("/weapons/{id}")
    @Timed
    public ResponseEntity<Weapon> getWeapon(@PathVariable Long id) {
        log.debug("REST request to get Weapon : {}", id);
        Optional<Weapon> weapon = weaponRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(weapon);
    }

    /**
     * DELETE  /weapons/:id : delete the "id" weapon.
     *
     * @param id the id of the weapon to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/weapons/{id}")
    @Timed
    public ResponseEntity<Void> deleteWeapon(@PathVariable Long id) {
        log.debug("REST request to delete Weapon : {}", id);

        weaponRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
