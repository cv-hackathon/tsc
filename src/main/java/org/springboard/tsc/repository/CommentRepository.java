package org.springboard.tsc.repository;

import java.util.List;

import org.springboard.tsc.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
	@Query(value = "Select * from \"comment\" where \"participant_id\" = ?", nativeQuery = true)
	List<Comment> findByParticipantId(Long participantId);
}
