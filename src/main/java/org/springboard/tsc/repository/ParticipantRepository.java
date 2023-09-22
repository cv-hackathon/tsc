package org.springboard.tsc.repository;

import java.util.List;

import org.springboard.tsc.VO.ServiceInfo;
import org.springboard.tsc.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {
	
	@Query(value = "select a.\"exit\", a.\"exit_reason\" \"exitReason\", a.\"bank_card_open\" \"bankCardOpen\", b.\"orgServiceId\", b.\"serviceCategory\", b.\"organizationId\", b.\"serviceId\", b.\"description\", a.\"navigator_id\" \"navigatorId\", a.\"email\", a.\"create_time\" \"registerTime\", a.\"gender\", a.\"birthday\", a.\"tags\", a.\"needs\", a.\"phone\", a.\"status\", a.\"firstname\", a.\"lastname\", a.\"participant_id\" \"participantId\", b.\"orgname\", b.\"servicename\", b.\"worker_name\" \"workerName\", b.\"workerEmail\", b.\"workerZoom\", b.\"serviceStatus\", b.\"startTime\", b.\"endTime\" from \"participant\" a left join (select os.\"category\" \"serviceCategory\", os.\"organization_id\" \"organizationId\", s.\"org_service_id\" \"orgServiceId\", s.\"service_id\" \"serviceId\", s.\"description\", s.\"create_time\" \"startTime\", s.\"update_time\" \"endTime\", s.\"status\" \"serviceStatus\", os.\"email\" \"workerEmail\", os.\"zoom\" \"workerZoom\", s.\"participant_id\", o.\"name\" \"orgname\", os.\"name\" \"servicename\", os.\"worker_name\" from \"org_service\" os,  \"organization\" o, \"service\" s where os.\"org_service_id\" = s.\"org_service_id\" and os.\"organization_id\" = o.\"organization_id\") b on a.\"participant_id\" = b.\"participant_id\"", nativeQuery = true)
	List<ServiceInfo> queryAll();

	@Query(value = "select p.\"exit\", p.\"exit_reason\" \"exitReason\", p.\"bank_card_open\" \"bankCardOpen\", os.\"category\" \"serviceCategory\",os.\"organization_id\" \"organizationId\", p.\"navigator_id\" \"navigatorId\", p.\"email\", p.\"create_time\" \"registerTime\", p.\"gender\", p.\"birthday\", p.\"status\", p.\"tags\", p.\"needs\", p.\"phone\", p.\"firstname\", p.\"lastname\", p.\"participant_id\" \"participantId\", o.\"name\" \"orgname\", os.\"name\" \"servicename\", os.\"worker_name\" \"workerName\", os.\"email\" \"workerEmail\", os.\"zoom\" \"workerZoom\", s.\"org_service_id\" \"orgServiceId\", s.\"status\" \"serviceStatus\", s.\"create_time\" \"startTime\", s.\"update_time\" \"endTime\", s.\"description\", s.\"service_id\" \"serviceId\" from \"participant\" p, \"service\" s, \"org_service\" os, \"organization\" o where p.\"participant_id\" = s.\"participant_id\" and os.\"org_service_id\" = s.\"org_service_id\" and o.\"organization_id\" = os.\"organization_id\" and o.\"organization_id\" = ?", nativeQuery = true)
	List<ServiceInfo> queryByOrgId(Long orgId);
	
	@Query(value = "select a.\"exit\", a.\"exit_reason\" \"exitReason\", a.\"bank_card_open\" \"bankCardOpen\", b.\"orgServiceId\", b.\"serviceCategory\", b.\"organizationId\", b.\"serviceId\", b.\"description\", a.\"navigator_id\" \"navigatorId\", a.\"email\", a.\"create_time\" \"registerTime\", a.\"gender\", a.\"birthday\", a.\"tags\", a.\"needs\", a.\"phone\", a.\"status\", a.\"firstname\", a.\"lastname\", a.\"participant_id\" \"participantId\", b.\"orgname\", b.\"servicename\", b.\"worker_name\" \"workerName\", b.\"workerEmail\", b.\"workerZoom\", b.\"serviceStatus\", b.\"startTime\", b.\"endTime\" from \"participant\" a left join (select os.\"category\" \"serviceCategory\", os.\"organization_id\" \"organizationId\", s.\"org_service_id\" \"orgServiceId\", s.\"service_id\" \"serviceId\", s.\"description\", s.\"create_time\" \"startTime\", s.\"update_time\" \"endTime\", s.\"status\" \"serviceStatus\", os.\"email\" \"workerEmail\", os.\"zoom\" \"workerZoom\", s.\"participant_id\", o.\"name\" \"orgname\", os.\"name\" \"servicename\", os.\"worker_name\" from \"org_service\" os,  \"organization\" o, \"service\" s where os.\"org_service_id\" = s.\"org_service_id\" and os.\"organization_id\" = o.\"organization_id\") b on a.\"participant_id\" = b.\"participant_id\" where a.\"participant_id\" =?", nativeQuery = true)
	List<ServiceInfo> queryByparticipantId(Long participantId);
	
	List<Participant> findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(String firstName, String lastName);

	@Query(value = "select * from \"participant\" where \"firstname\" = ?1 and \"lastname\" = ?2", nativeQuery = true)
	List<Participant> queryName(String firstName, String lastName);
}
