package org.springboard.tsc.repository;

import org.springboard.tsc.entity.OrgService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrganizationServiceRepository extends JpaRepository<OrgService, Long> {
    List<OrgService> findByOrganizationId(Long id);

    List<OrgService> findByEmailAndPassword(String email, String password);
}
