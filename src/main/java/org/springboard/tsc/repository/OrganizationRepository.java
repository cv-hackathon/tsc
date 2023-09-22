package org.springboard.tsc.repository;

import org.springboard.tsc.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {

    List<Organization> findByNameContainingIgnoreCase(String name);

    List<Organization> findByEmailAndPassword(String email, String password);

    List<Organization> findByName(String name);
}
