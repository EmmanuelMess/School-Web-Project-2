package com.emmanuelmess.schoolwebproject.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ThreadMessage.
 */
@Entity
@Table(name = "thread_message")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ThreadMessage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Thread thread;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Thread getThread() {
        return thread;
    }

    public ThreadMessage thread(Thread thread) {
        this.thread = thread;
        return this;
    }

    public void setThread(Thread thread) {
        this.thread = thread;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ThreadMessage threadMessage = (ThreadMessage) o;
        if (threadMessage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), threadMessage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ThreadMessage{" +
            "id=" + getId() +
            "}";
    }
}
