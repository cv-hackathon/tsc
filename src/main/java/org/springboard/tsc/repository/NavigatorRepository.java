package org.springboard.tsc.repository;

import org.springboard.tsc.entity.Navigator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NavigatorRepository extends JpaRepository<Navigator, Long> {

    List<Navigator> findByEmailAndPassword(String email, String password);

    List<Navigator> findByName(String name);
}
