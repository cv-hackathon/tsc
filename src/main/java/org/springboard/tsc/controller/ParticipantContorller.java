package org.springboard.tsc.controller;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springboard.tsc.VO.ParticipantVo;
import org.springboard.tsc.VO.ServiceInfo;
import org.springboard.tsc.VO.ServiceVo;
import org.springboard.tsc.entity.Comment;
import org.springboard.tsc.entity.Navigator;
import org.springboard.tsc.entity.OrgService;
import org.springboard.tsc.entity.Organization;
import org.springboard.tsc.entity.Participant;
import org.springboard.tsc.entity.Service;
import org.springboard.tsc.repository.CommentRepository;
import org.springboard.tsc.repository.NavigatorRepository;
import org.springboard.tsc.repository.OrganizationRepository;
import org.springboard.tsc.repository.OrganizationServiceRepository;
import org.springboard.tsc.repository.ParticipantRepository;
import org.springboard.tsc.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/participant")
public class ParticipantContorller {
	@Autowired
	private ServiceRepository serviceRepository;

	@Autowired
	private ParticipantRepository participantRepository;

	@Autowired
	private OrganizationRepository organizationRepository;

	@Autowired
	private OrganizationServiceRepository organizationServiceRepository;

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private NavigatorRepository navigatorRepository;

	@GetMapping("/test")
	public void test() {
		//Login User (navigator and organization)
		Navigator navigator = new Navigator();
		navigator.setNavigatorId(1L);
		navigator.setName("Jeff Ronald");
		navigator.setStatus("active");
		navigator.setCreateTime(new Timestamp(new Date().getTime()));
		navigator.setZoom("jeff@tsc.com");
		navigator.setEmail("jeff@tsc.com");
		navigator.setPassword("123");
		navigatorRepository.save(navigator);

		Navigator navigator2 = new Navigator();
		navigator2.setNavigatorId(2L);
		navigator2.setName("Judson Malone");
		navigator2.setStatus("active");
		navigator2.setCreateTime(new Timestamp(new Date().getTime()));
		navigator2.setZoom("judson@tsc.com");
		navigator2.setEmail("judson@tsc.com");
		navigator2.setPassword("123");
		navigatorRepository.save(navigator2);

		Organization o = new Organization();
		o.setOrganizationId(1L);
		o.setName("La Red Health Center");
		o.setPassword("123");
		o.setCreateTime(new Timestamp(System.currentTimeMillis()));
		o.setStatus("active");
		o.setEmail("lrhc@lrhc.com");
		o.setLocation("21444 Carmean Way, Georgetown, DE 19947");
		o.setPhone("+1 302-855-1233");
		organizationRepository.save(o);

		Organization o2 = new Organization();
		o2.setOrganizationId(2L);
		o2.setName("PROMISE and the ACT Teams ");
		o2.setPassword("123");
		o2.setCreateTime(new Timestamp(System.currentTimeMillis()));
		o2.setStatus("active");
		o2.setEmail("pat@pat.com");
		o2.setLocation("408 N. Bedford St., Georgetown DE 19947");
		o2.setPhone("+1 302-741-8559");
		organizationRepository.save(o2);

		Organization o3 = new Organization();
		o3.setOrganizationId(3L);
		o3.setName("Del-One Credit Union");
		o3.setPassword("123");
		o3.setCreateTime(new Timestamp(System.currentTimeMillis()));
		o3.setStatus("active");
		o3.setEmail("docu@docu.com");
		o3.setLocation("270 Beiser Blvd, Dover, DE 19904, United States");
		o3.setPhone("+1 302-739-4496");
		organizationRepository.save(o3);

		Organization o4 = new Organization();
		o4.setOrganizationId(4L);
		o4.setName("NET Centers");
		o4.setPassword("123");
		o4.setCreateTime(new Timestamp(System.currentTimeMillis()));
		o4.setStatus("active");
		o4.setEmail("nc@nc.com");
		o4.setLocation("3315 Kirkwood Highway, Wilmington, DE");
		o4.setPhone("+1 302-691-0140");
		organizationRepository.save(o4);

		Organization o5 = new Organization();
		o5.setOrganizationId(5L);
		o5.setName("Fellowship Health Resources, Inc.");
		o5.setPassword("123");
		o5.setCreateTime(new Timestamp(System.currentTimeMillis()));
		o5.setStatus("active");
		o5.setEmail("fhri@fhri.com");
		o5.setLocation("7549 Wilkins Rd, Milford, DE 19963");
		o5.setPhone("+1 302-422-6699");
		organizationRepository.save(o5);

		Organization o6 = new Organization();
		o6.setOrganizationId(6L);
		o6.setName("Mental Health Centers");
		o6.setPassword("123");
		o6.setCreateTime(new Timestamp(System.currentTimeMillis()));
		o6.setStatus("active");
		o6.setEmail("mhc@mhc.com");
		o6.setLocation("100 W 10th St Ste 600, Wilmington, DE 19801");
		o6.setPhone("+1 302-654-6833");
		organizationRepository.save(o6);

		Organization o7 = new Organization();
		o7.setOrganizationId(7L);
		o7.setName("Brandywine Valley SPCA");
		o7.setPassword("123");
		o7.setCreateTime(new Timestamp(System.currentTimeMillis()));
		o7.setStatus("active");
		o7.setEmail("bvs@bvs.com");
		o7.setLocation("19022 Shingle Point Rd, Georgetown, DE 19947");
		o7.setPhone("+1 302-858-4628");
		organizationRepository.save(o7);

		//Participant
		Participant p = new Participant();
		p.setParticipantId(1L);
		p.setCabin("#101");
		p.setBirthday("1968-02-01");
		p.setLastname("Lyons");
		p.setFirstname("Rebecca");
		p.setPhone("302-313-6028");
		p.setTags("MHD,SUD");
		p.setNeeds("Life Skills");
		p.setGender("Male");
		p.setNavigatorId(1L);
		p.setStatus("In Progress");
		p.setEmail("Rebecca@foxmail.com");
		p.setBankCardOpen("Y");
		p.setExit("Y");
		p.setExitReason("Move to Assertive Commninity Treatment Teams");
		p.setCreateTime(new Timestamp(System.currentTimeMillis()));
		participantRepository.save(p);

		Participant p2 = new Participant();
		p2.setParticipantId(2L);
		p2.setAchievement("Y");
		p2.setAchieveReason("got job");
		p2.setCabin("#103");
		p2.setBirthday("1999-02-01");
		p2.setLastname("Terry");
		p2.setFirstname("Bobby");
		p2.setPhone("123-456-7890");
		p2.setTags("MHD");
		p2.setNeeds("Employment");
		p2.setGender("Male");
		p2.setNavigatorId(2L);
		p2.setStatus("In Progress");
		p2.setEmail("Bobby@foxmail.com");
		p2.setBankCardOpen("Y");
		p2.setCreateTime(new Timestamp(System.currentTimeMillis()));
		participantRepository.save(p2);

		Participant p3 = new Participant();
		p3.setParticipantId(3L);
		p3.setBirthday("2001-01-01");
		p3.setLastname("Freck");
		p3.setFirstname("Joyce");
		p3.setPhone("312-313-6998");
		p3.setTags("MHD");
		p3.setNeeds("Physical health");
		p3.setGender("Male");
		p3.setNavigatorId(1L);
		p3.setStatus("Completed");
		p3.setEmail("Joyce@foxmail.com");
		p3.setBankCardOpen("N");
		p3.setCreateTime(new Timestamp(System.currentTimeMillis()));
		participantRepository.save(p3);

		Participant p4 = new Participant();
		p4.setParticipantId(4L);
		p4.setBirthday("1983-06-05");
		p4.setLastname("Baker");
		p4.setFirstname("Kathleen");
		p4.setPhone("123-456-7890");
		p4.setTags("MHD,SUD");
		p4.setNeeds("Family reunification");
		p4.setGender("Male");
		p4.setNavigatorId(2L);
		p4.setStatus("In Progress");
		p4.setEmail("Kathleen@foxmail.com");
		p4.setCreateTime(new Timestamp(System.currentTimeMillis()));
		p4.setBankCardOpen("N");
		participantRepository.save(p4);

		Participant p5 = new Participant();
		p5.setParticipantId(5L);
		p5.setBirthday("1968-02-01");
		p5.setLastname("Morris");
		p5.setFirstname("Jacob (Wes)");
		p5.setPhone("302-313-6028");
		p5.setTags("SUD");
		p5.setNeeds("Legal");
		p5.setGender("Male");
		p5.setNavigatorId(1L);
		p5.setStatus("In Progress");
		p5.setEmail("Jacob@foxmail.com");
		p5.setCreateTime(new Timestamp(System.currentTimeMillis()));
		p5.setBankCardOpen("N");
		participantRepository.save(p5);

		Participant p6 = new Participant();
		p6.setParticipantId(6L);
		p6.setBirthday("1968-02-01");
		p6.setLastname("Carswel");
		p6.setFirstname("Freddie");
		p6.setPhone("302-313-6028");
		p6.setTags("");
		p6.setNeeds("Financial");
		p6.setGender("Female");
		p6.setNavigatorId(1L);
		p6.setStatus("In Progress");
		p6.setEmail("Freddie@foxmail.com");
		p6.setBankCardOpen("Y");
		p6.setCreateTime(new Timestamp(System.currentTimeMillis()));
		participantRepository.save(p6);

		Participant p7 = new Participant();
		p7.setParticipantId(7L);
		p7.setBirthday("1968-02-01");
		p7.setLastname("Brade");
		p7.setFirstname("Lin");
		p7.setPhone("302-313-6028");
		p7.setTags("MHD,SUD");
		p7.setNeeds("Life Skills");
		p7.setGender("Male");
		p7.setNavigatorId(1L);
		p7.setStatus("In Progress");
		p7.setEmail("Brade@foxmail.com");
		p7.setBankCardOpen("Y");
		p7.setCreateTime(new Timestamp(System.currentTimeMillis()));
		participantRepository.save(p7);

		Participant p8 = new Participant();
		p8.setParticipantId(8L);
		p8.setBirthday("2001-01-01");
		p8.setLastname("Tolbert");
		p8.setFirstname("Jacqueline");
		p8.setPhone("302-313-6028");
		p8.setTags("SUD");
		p8.setNeeds("Employment");
		p8.setGender("Male");
		p8.setNavigatorId(2L);
		p8.setStatus("In Progress");
		p8.setEmail("Jacqueline@foxmail.com");
		p8.setCreateTime(new Timestamp(System.currentTimeMillis()));
		p8.setBankCardOpen("Y");
		participantRepository.save(p8);

		Participant p9 = new Participant();
		p9.setParticipantId(9L);
		p9.setBirthday("1983-06-05");
		p9.setLastname("Fisher");
		p9.setFirstname("James");
		p9.setPhone("302-313-6028");
		p9.setTags("SUD");
		p9.setNeeds("Educational/Vocational");
		p9.setGender("Female");
		p9.setNavigatorId(1L);
		p9.setStatus("In Progress");
		p9.setEmail("James@foxmail.com");
		p9.setBankCardOpen("Y");
		p9.setCreateTime(new Timestamp(System.currentTimeMillis()));
		participantRepository.save(p9);

		Participant p10 = new Participant();
		p10.setParticipantId(10L);
		p10.setBirthday("1968-02-01");
		p10.setLastname("Warner");
		p10.setFirstname("Joy");
		p10.setPhone("302-313-6028");
		p10.setTags("MHD,SUD");
		p10.setNeeds("Others");
		p10.setGender("Male");
		p10.setNavigatorId(1L);
		p10.setStatus("In Progress");
		p10.setEmail("Joy@foxmail.com");
		p10.setBankCardOpen("N");
		p10.setCreateTime(new Timestamp(System.currentTimeMillis()));
		participantRepository.save(p10);

		Participant p11 = new Participant();
		p11.setParticipantId(11L);
		p11.setBirthday("1999-02-01");
		p11.setLastname("Botts");
		p11.setFirstname("Jeffrey");
		p11.setPhone("302-313-6028");
		p11.setTags("SUD");
		p11.setNeeds("Social Security/Bike");
		p11.setGender("Male");
		p11.setNavigatorId(1L);
		p11.setStatus("In Progress");
		p11.setEmail("Jeffrey@foxmail.com");
		p11.setBankCardOpen("Y");
		p11.setCreateTime(new Timestamp(System.currentTimeMillis()));
		participantRepository.save(p11);

		Participant p12 = new Participant();
		p12.setParticipantId(12L);
		p12.setBirthday("2001-01-01");
		p12.setLastname("Armstrong");
		p12.setFirstname("Wendy");
		p12.setPhone("302-245-0177");
		p12.setTags("");
		p12.setNeeds("Life Skills/Employment");
		p12.setGender("Male");
		p12.setNavigatorId(2L);
		p12.setStatus("In Progress");
		p12.setEmail("Wendy@foxmail.com");
		p12.setBankCardOpen("Y");
		p12.setCreateTime(new Timestamp(System.currentTimeMillis()));
		participantRepository.save(p12);

		Participant p13 = new Participant();
		p13.setParticipantId(13L);
		p13.setBirthday("1983-06-05");
		p13.setLastname("Wagner");
		p13.setFirstname("Jessica");
		p13.setPhone("342-313-6028");
		p13.setTags("SUD");
		p13.setNeeds("Financial");
		p13.setGender("Male");
		p13.setNavigatorId(1L);
		p13.setStatus("In Progress");
		p13.setEmail("Jessica@foxmail.com");
		p13.setBankCardOpen("N");
		p13.setCreateTime(new Timestamp(System.currentTimeMillis()));
		participantRepository.save(p13);

		Participant p14 = new Participant();
		p14.setParticipantId(14L);
		p14.setBirthday("1968-02-01");
		p14.setLastname("Perez");
		p14.setFirstname("Anner");
		p14.setPhone("332-313-6028");
		p14.setTags("MHD,SUD");
		p14.setNeeds("Life Skills");
		p14.setGender("Male");
		p14.setNavigatorId(1L);
		p14.setStatus("In Progress");
		p14.setEmail("Anner@foxmail.com");
		p14.setBankCardOpen("N");
		p14.setCreateTime(new Timestamp(System.currentTimeMillis()));
		participantRepository.save(p14);

		Participant p15 = new Participant();
		p15.setParticipantId(15L);
		p15.setBirthday("1999-02-01");
		p15.setLastname("Roberts");
		p15.setFirstname("Kevin");
		p15.setPhone("302-313-6028");
		p15.setTags("MHD");
		p15.setNeeds("Legal");
		p15.setGender("Male");
		p15.setNavigatorId(2L);
		p15.setStatus("In Progress");
		p15.setEmail("Kevin@foxmail.com");
		p15.setBankCardOpen("Y");
		p15.setCreateTime(new Timestamp(System.currentTimeMillis()));
		participantRepository.save(p15);

		Participant p16 = new Participant();
		p16.setParticipantId(16L);
		p16.setBirthday("2001-01-01");
		p16.setLastname("Stevenson/Baker");
		p16.setFirstname("Kristen");
		p16.setPhone("302-313-6028");
		p16.setTags("SUD");
		p16.setNeeds("Employment");
		p16.setGender("Female");
		p16.setNavigatorId(1L);
		p16.setStatus("In Progress");
		p16.setEmail("Kristen@foxmail.com");
		p16.setBankCardOpen("Y");
		p16.setCreateTime(new Timestamp(System.currentTimeMillis()));
		participantRepository.save(p16);

		Participant p17 = new Participant();
		p17.setParticipantId(17L);
		p17.setBirthday("1983-06-05");
		p17.setLastname("Carter");
		p17.setFirstname("Eunice");
		p17.setPhone("352-313-6028");
		p17.setTags("");
		p17.setNeeds("Legal");
		p17.setGender("Female");
		p17.setNavigatorId(2L);
		p17.setStatus("In Progress");
		p17.setEmail("Eunice@foxmail.com");
		p17.setBankCardOpen("Y");
		p17.setExit("Y");
		p17.setExitReason("Passed Away");
		p17.setCreateTime(new Timestamp(System.currentTimeMillis()));
		participantRepository.save(p17);

		Participant p18 = new Participant();
		p18.setParticipantId(18L);
		p18.setBirthday("1968-02-01");
		p18.setLastname("Carter");
		p18.setFirstname("Margaret");
		p18.setPhone("302-313-6028");
		p18.setTags("MHD");
		p18.setNeeds("");
		p18.setGender("Male");
		p18.setNavigatorId(1L);
		p18.setStatus("In Progress");
		p18.setEmail("Margaret@foxmail.com");
		p18.setBankCardOpen("Y");
		p18.setExit("Y");
		p18.setExitReason("Rule Viotalions");
		p18.setCreateTime(new Timestamp(System.currentTimeMillis()));
		participantRepository.save(p18);

		//Service
		//Dental Service
		Service s = new Service();
		s.setParticipantId(1L);
		s.setNavigatorId(1L);
		s.setOrgServiceId(1001L);
		s.setStatus("Open");
		s.setDescription("TBD");
		s.setCreateTime(new Timestamp(System.currentTimeMillis()));
		serviceRepository.save(s);

		//Financial Coaching
		Service s2 = new Service();
		s2.setParticipantId(2L);
		s2.setNavigatorId(1L);
		s2.setOrgServiceId(1004L);
		s2.setStatus("In Progress");
		s2.setDescription("TBD");
		s2.setCreateTime(new Timestamp(System.currentTimeMillis()));
		serviceRepository.save(s2);

		//Financial Service
		Service s3 = new Service();
		s3.setParticipantId(3L);
		s3.setNavigatorId(1L);
		s3.setOrgServiceId(1007L);
		s3.setStatus("Completed");
		s3.setDescription("TBD");
		s3.setCreateTime(new Timestamp(System.currentTimeMillis()));
		serviceRepository.save(s3);

		//Food Stamps
		Service s4 = new Service();
		s4.setParticipantId(4L);
		s4.setNavigatorId(1L);
		s4.setOrgServiceId(1008L);
		s4.setStatus("Open");
		s4.setDescription("TBD");
		s4.setCreateTime(new Timestamp(System.currentTimeMillis()));
		serviceRepository.save(s4);

		//Individual Employment Supports
		Service s5 = new Service();
		s5.setParticipantId(5L);
		s5.setNavigatorId(2L);
		s5.setOrgServiceId(1005L);
		s5.setStatus("In Progress");
		s5.setDescription("TBD");
		s5.setCreateTime(new Timestamp(System.currentTimeMillis()));
		serviceRepository.save(s5);

		//Medicaid Service
		Service s6 = new Service();
		s6.setParticipantId(6L);
		s6.setNavigatorId(2L);
		s6.setOrgServiceId(1009L);
		s6.setStatus("In Progress");
		s6.setDescription("TBD");
		s6.setCreateTime(new Timestamp(System.currentTimeMillis()));
		serviceRepository.save(s6);

		//Medical Service
		Service s7 = new Service();
		s7.setParticipantId(7L);
		s7.setNavigatorId(2L);
		s7.setOrgServiceId(1002L);
		s7.setStatus("In Progress");
		s7.setDescription("TBD");
		s7.setCreateTime(new Timestamp(System.currentTimeMillis()));
		serviceRepository.save(s7);

		//Mental Health Service
		Service s8 = new Service();
		s8.setParticipantId(8L);
		s8.setNavigatorId(2L);
		s8.setOrgServiceId(1010L);
		s8.setStatus("In Progress");
		s8.setDescription("TBD");
		s8.setCreateTime(new Timestamp(System.currentTimeMillis()));
		serviceRepository.save(s8);

		//Mental Health Service
		Service s9 = new Service();
		s9.setParticipantId(9L);
		s9.setNavigatorId(2L);
		s9.setOrgServiceId(1003L);
		s9.setStatus("In Progress");
		s9.setDescription("TBD");
		s9.setCreateTime(new Timestamp(System.currentTimeMillis()));
		serviceRepository.save(s9);

		//Mental Health Service
		Service s10 = new Service();
		s10.setParticipantId(10L);
		s10.setNavigatorId(2L);
		s10.setOrgServiceId(1011L);
		s10.setStatus("In Progress");
		s10.setDescription("TBD");
		s10.setCreateTime(new Timestamp(System.currentTimeMillis()));
		serviceRepository.save(s10);

		//SUD Treatment Service
		Service s11 = new Service();
		s11.setParticipantId(11L);
		s11.setNavigatorId(2L);
		s11.setOrgServiceId(1006L);
		s11.setStatus("In Progress");
		s11.setDescription("TBD");
		s11.setCreateTime(new Timestamp(System.currentTimeMillis()));
		serviceRepository.save(s11);

		//Veterinary care
		Service s12 = new Service();
		s12.setParticipantId(12L);
		s12.setNavigatorId(2L);
		s12.setOrgServiceId(1012L);
		s12.setStatus("In Progress");
		s12.setDescription("TBD");
		s12.setCreateTime(new Timestamp(System.currentTimeMillis()));
		serviceRepository.save(s12);

		//OrgService
		OrgService os = new OrgService();
		os.setOrgServiceId(1001L);
		os.setName("Dental Service");
		os.setOrganizationId(1L);
		os.setWorkerName("Lei");
		os.setEmail("lei@lrh.com");
		os.setPassword("123");
		os.setZoom("lei@lrh.com");
		os.setCategory("care");
		os.setCreateTime(new Timestamp(System.currentTimeMillis()));
		organizationServiceRepository.save(os);

		OrgService os2 = new OrgService();
		os2.setOrgServiceId(1002L);
		os2.setName("Medical Service");
		os2.setOrganizationId(1L);
		os2.setWorkerName("Alan");
		os2.setEmail("alan@lrh.com");
		os2.setPassword("123");
		os2.setZoom("alan@lrh.com");
		os2.setCategory("care");
		os2.setCreateTime(new Timestamp(System.currentTimeMillis()));
		organizationServiceRepository.save(os2);

		OrgService os3 = new OrgService();
		os3.setOrgServiceId(1003L);
		os3.setName("Mental Health Service");
		os3.setOrganizationId(1L);
		os3.setWorkerName("George");
		os3.setEmail("george@lrh.com");
		os3.setPassword("123");
		os3.setZoom("george@lrh.com");
		os3.setCategory("care");
		os3.setCreateTime(new Timestamp(System.currentTimeMillis()));
		organizationServiceRepository.save(os3);

		OrgService os4 = new OrgService();
		os4.setOrgServiceId(1004L);
		os4.setName("Financial Coaching");
		os4.setOrganizationId(2L);
		os4.setWorkerName("Jinjin");
		os4.setEmail("jinjin@promise-act.com");
		os4.setPassword("123");
		os4.setZoom("jinjin@promise-act.com");
		os4.setCategory("education");
		os4.setCreateTime(new Timestamp(System.currentTimeMillis()));
		organizationServiceRepository.save(os4);

		OrgService os5 = new OrgService();
		os5.setOrgServiceId(1005L);
		os5.setName("Individual Employment Supports");
		os5.setOrganizationId(2L);
		os5.setWorkerName("Yu");
		os5.setEmail("yu@promise-act.com");
		os5.setPassword("123");
		os5.setZoom("yu@promise-act.com");
		os5.setCategory("education");
		os5.setCreateTime(new Timestamp(System.currentTimeMillis()));
		organizationServiceRepository.save(os5);

		OrgService os6 = new OrgService();
		os6.setOrgServiceId(1006L);
		os6.setName("SUD Treatment Service");
		os6.setOrganizationId(2L);
		os6.setWorkerName("Walter");
		os6.setEmail("walter@promise-act.com");
		os6.setPassword("123");
		os6.setZoom("walter@promise-act.com");
		os6.setCategory("care");
		os6.setCreateTime(new Timestamp(System.currentTimeMillis()));
		organizationServiceRepository.save(os6);

		OrgService os7 = new OrgService();
		os7.setOrgServiceId(1007L);
		os7.setName("Financial Service");
		os7.setOrganizationId(3L);
		os7.setWorkerName("Jinjin");
		os7.setEmail("jinjin@del1-credit.com");
		os7.setPassword("123");
		os7.setZoom("jinjin@del1-credit.com");
		os7.setCategory("education");
		os7.setCreateTime(new Timestamp(System.currentTimeMillis()));
		organizationServiceRepository.save(os7);

		OrgService os8 = new OrgService();
		os8.setOrgServiceId(1008L);
		os8.setName("Food Stamps");
		os8.setOrganizationId(4L);
		os8.setWorkerName("Andy");
		os8.setEmail("andy@net-center.com");
		os8.setPassword("123");
		os8.setZoom("andy@net-center.com");
		os8.setCategory("cabin");
		os8.setCreateTime(new Timestamp(System.currentTimeMillis()));
		organizationServiceRepository.save(os8);

		OrgService os9 = new OrgService();
		os9.setOrgServiceId(1009L);
		os9.setName("Medicaid Service");
		os9.setOrganizationId(4L);
		os9.setWorkerName("Sheffer");
		os9.setEmail("sheffer@net-center.com");
		os9.setPassword("123");
		os9.setZoom("sheffer@net-center.com");
		os9.setCategory("cabin");
		os9.setCreateTime(new Timestamp(System.currentTimeMillis()));
		organizationServiceRepository.save(os9);

		OrgService os10 = new OrgService();
		os10.setOrgServiceId(1010L);
		os10.setName("Mental Health Service");
		os10.setOrganizationId(5L);
		os10.setWorkerName("Emily");
		os10.setEmail("emily@fhr.com");
		os10.setPassword("123");
		os10.setZoom("emily@fhr.com");
		os10.setCategory("care");
		os10.setCreateTime(new Timestamp(System.currentTimeMillis()));
		organizationServiceRepository.save(os10);

		OrgService os11 = new OrgService();
		os11.setOrgServiceId(1011L);
		os11.setName("Mental Health Service");
		os11.setOrganizationId(6L);
		os11.setWorkerName("George");
		os11.setEmail("george@mhc.com");
		os11.setPassword("123");
		os11.setZoom("george@mhc.com");
		os11.setCategory("care");
		os11.setCreateTime(new Timestamp(System.currentTimeMillis()));
		organizationServiceRepository.save(os11);

		OrgService os12 = new OrgService();
		os12.setOrgServiceId(1012L);
		os12.setName("Veterinary care");
		os12.setOrganizationId(7L);
		os12.setWorkerName("Lynne");
		os12.setEmail("lynne@bv-spca.com");
		os12.setPassword("123");
		os12.setZoom("lynne@bv-spca.com");
		os12.setCategory("cabin");
		os12.setCreateTime(new Timestamp(System.currentTimeMillis()));
		organizationServiceRepository.save(os12);

	}

	@PostMapping("/add")
	public Long add(@RequestBody Participant participant) {

		participant.setCreateTime(new Timestamp(System.currentTimeMillis()));
		return ((Participant) participantRepository.save(participant)).getParticipantId();

	}

	@PostMapping("/delServices")
	public Map<String, Boolean> del(@RequestBody List<Long> serviceIds) {
		if(serviceIds != null){
			serviceIds.stream().forEach(id -> {
				serviceRepository.deleteById(id);});
			}
		Map<String, Boolean> result = new HashMap<>();
		result.put("Result", true);
		return result;
	}

	@PostMapping("/addServices")
	public Map<String, Boolean> add(@RequestBody List<Service> services) {
		Map<String, Boolean> result = new HashMap<>();
		if(services != null){
			for(Service service : services) {
				if(service.getServiceId() == null) {
					service.setCreateTime(new Timestamp(System.currentTimeMillis()));
				} else {
					Service old = serviceRepository.findById(service.getServiceId()).get();
					if(old == null) {
						result.put("Result", false);
						return result;
					}
					if("completed".equalsIgnoreCase(service.getStatus())) {
						service.setUpdateTime(new Timestamp(System.currentTimeMillis()));
					}
					service.setCreateTime(old.getCreateTime());
				}
				serviceRepository.save(service);
			}
		}

		result.put("Result", true);
		return result;
	}

	@GetMapping("/export")
	public void exportParticipants(HttpServletResponse response, @RequestParam(value = "organizationId", required = false) Long organizationId, @RequestParam(value = "participantId", required = false) Long participantId) throws IOException {
		List<ServiceInfo> servicesInfo = null;
		if(organizationId != null) {
			servicesInfo = participantRepository.queryByOrgId(organizationId);

		} else if(participantId != null){
			servicesInfo = participantRepository.queryByparticipantId(participantId);
		} else {
			servicesInfo = participantRepository.queryAll();
		}
		Workbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = (XSSFSheet) workbook.createSheet("Participants Details");
        Row row = sheet.createRow(0);
        Cell cell0 = row.createCell(0);
        cell0.setCellValue("First Name");
        
        Cell cell1 = row.createCell(1);
        cell1.setCellValue("Last Name");
        
        Cell cell2 = row.createCell(2);
        cell2.setCellValue("Status");
        
        Cell cell3 = row.createCell(3);
        cell3.setCellValue("Navigator");
        
        Cell cell4 = row.createCell(4);
        cell4.setCellValue("Service");
        
        Cell cell5 = row.createCell(5);
        cell5.setCellValue("Service Status");
        
        Cell cell6 = row.createCell(6);
        cell6.setCellValue("Case Worker");
        
        Cell cell7 = row.createCell(7);
        cell7.setCellValue("Organization");
        
        if (servicesInfo != null && servicesInfo.size() > 0) {
            int rownum = 1;
            for (ServiceInfo info : servicesInfo) {
                row = sheet.createRow(rownum++);
                cell0 = row.createCell(0);
                cell0.setCellValue(info.getFirstname());
                
                cell1 = row.createCell(1);
                cell1.setCellValue(info.getLastname());
                
                cell2 = row.createCell(2);
                cell2.setCellValue(info.getStatus());
                
                Optional<Navigator>  na = navigatorRepository.findById(info.getNavigatorId());
                cell3 = row.createCell(3);                
                cell3.setCellValue(na.isPresent() ? na.get().getName() : "");
                
                cell4 = row.createCell(4);
                cell4.setCellValue(info.getServiceName());
                
                cell5 = row.createCell(5);
                cell5.setCellValue(info.getServiceStatus());
                
                cell6 = row.createCell(6);
                cell6.setCellValue(info.getWorkerName());
                
                cell7 = row.createCell(7);
                cell7.setCellValue(info.getOrgName());
            }
        }
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=Participants_" + new Date() + ".xlsx";
        response.setHeader(headerKey, headerValue);
        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();
        outputStream.close();
		
	}
	
	 @PostMapping(value = "/import", produces = MediaType.APPLICATION_JSON_VALUE)
	 public Map importParticipant(@RequestParam("file") MultipartFile orgFile) {		
		 Map<String, Boolean> result = new HashMap<>();
	        try (XSSFWorkbook workbook = new XSSFWorkbook(orgFile.getInputStream())) {
	            XSSFSheet worksheet = workbook.getSheetAt(0);
	            for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) {
	            	XSSFRow row = worksheet.getRow(i);
	            	String firstName = row.getCell(0).getStringCellValue();
	            	String lastName = row.getCell(1).getStringCellValue();
	            	if (StringUtils.isEmpty(firstName) || StringUtils.isEmpty(lastName)) {
	            		continue;
	            	}
	            	Participant participant = new Participant();
	            	List<Participant> p = participantRepository.queryName(firstName, lastName);
	            	if(p != null && p.size() > 0) {
	            		continue;
	            	}
	            	participant.setFirstname(firstName);
	            	participant.setLastname(lastName);
	            	participant.setNavigatorId(new Double(row.getCell(2).getNumericCellValue()).longValue());
	            	participant.setGender(row.getCell(3).getStringCellValue());
	            	participant.setBirthday(row.getCell(4).getStringCellValue());
	            	participant.setEmail(row.getCell(5).getStringCellValue());
	            	participant.setPhone(row.getCell(6).getStringCellValue());
	            	participant.setNeeds(row.getCell(7).getStringCellValue());

	            	participant.setBankCardOpen(row.getCell(8).getStringCellValue());
	            	participant.setTags(row.getCell(9).getStringCellValue());
	            	participant.setCreateTime(new Timestamp(System.currentTimeMillis()));
	            	participantRepository.save(participant);
	              
	            }
	        } catch (Exception e) {
	        	result.put("Result", false);
	           e.printStackTrace();
	        }
	        result.put("Result", true);
	        return result;
	 }

	@GetMapping("/lists")
	public List<ParticipantVo> getParticipants(@RequestParam(value = "organizationId", required = false) Long organizationId, @RequestParam(value = "participantId", required = false) Long participantId) {
		List<ParticipantVo> vos = new ArrayList<>();
		List<ServiceInfo> servicesInfo = null;
		if(organizationId != null) {
			servicesInfo = participantRepository.queryByOrgId(organizationId);

		} else if(participantId != null){
			servicesInfo = participantRepository.queryByparticipantId(participantId);
		} else {
			servicesInfo = participantRepository.queryAll();
		}
		Map<Long, List<ServiceVo>> participantIds = new HashMap<>();
		if(servicesInfo != null && servicesInfo.size() != 0) {
			for(ServiceInfo info : servicesInfo) {
				participantId = info.getParticipantId();
				if(!participantIds.containsKey(participantId)) {
					ParticipantVo pVo = new ParticipantVo();
					pVo.setParticipantId(participantId);
					pVo.setFirstname(info.getFirstname());
					pVo.setLastname(info.getLastname());
					pVo.setStatus(info.getStatus());
					pVo.setNavigatorId(info.getNavigatorId());
					pVo.setBirthday(info.getBirthday());
					pVo.setEmail(info.getEmail());
					pVo.setPhone(info.getPhone());
					pVo.setTags(info.getTags());
					pVo.setNeeds(info.getNeeds());
					pVo.setRegisterTime(info.getRegisterTime());
					pVo.setGender(info.getGender());
					pVo.setBankCardOpen(info.getBankCardOpen());
					pVo.setCabin(info.getCabin());
					pVo.setExit("Y".equalsIgnoreCase(info.getExit())? "Y":"N");
					pVo.setAchievement("Y".equalsIgnoreCase(info.getAchievement())? "Y":"N");
					pVo.setAchieveReason(info.getAchieveReason());
					pVo.setExitReason(info.getExitReason());

					List<ServiceVo> services = new ArrayList<>();
					pVo.setServices(services);

					participantIds.put(participantId, services);

					if(!StringUtils.isEmpty(info.getServiceName())) {

						ServiceVo svo = new ServiceVo();
						svo.setServiceName(info.getServiceName());
						svo.setCaseWorker(info.getWorkerName());
						svo.setOrganizationName(info.getOrgName());
						svo.setDescription(info.getDescription());
						svo.setServiceStatus(info.getServiceStatus());
						svo.setStartTime(info.getStartTime());
						svo.setEndTime(info.getEndTime());
						svo.setComments(info.getDescription());
						svo.setCaseWorkerEmail(info.getWorkerEmail());
						svo.setCaseWorkerZoom(info.getWorkerZoom());
						svo.setServiceId(info.getServiceId());
						svo.setOrganizationId(info.getOrganizationId());
						svo.setServiceCategory(info.getServiceCategory());
						svo.setOrgServiceId(info.getOrgServiceId());
						services.add(svo);

					}
					vos.add(pVo);

				} else {
					List<ServiceVo> services = participantIds.get(participantId);
					ServiceVo svo = new ServiceVo();
					svo.setServiceName(info.getServiceName());
					svo.setCaseWorker(info.getWorkerName());
					svo.setOrganizationName(info.getOrgName());
					svo.setDescription(info.getDescription());
					svo.setServiceStatus(info.getServiceStatus());
					svo.setStartTime(info.getStartTime());
					svo.setEndTime(info.getEndTime());
					svo.setComments(info.getDescription());
					svo.setCaseWorkerEmail(info.getWorkerEmail());
					svo.setCaseWorkerZoom(info.getWorkerZoom());
					svo.setServiceId(info.getServiceId());
					svo.setOrganizationId(info.getOrganizationId());
					svo.setServiceCategory(info.getServiceCategory());
					svo.setOrgServiceId(info.getOrgServiceId());
					services.add(svo);
				}

			}

		}
		
		vos.stream().forEach( vo -> {
			if ("Y".equalsIgnoreCase(vo.getExit())) {
				vo.setStatus("Exited");
			} else if ("Y".equalsIgnoreCase(vo.getAchievement())) {
				vo.setStatus("Completed");
			} else if(CollectionUtils.isEmpty(vo.getServices())) {
				vo.setStatus("Registered");
			} else {
				List<ServiceVo> services = vo.getServices();
				if(services.stream().allMatch(s -> "Open".equalsIgnoreCase(s.getServiceStatus()))) {
					vo.setStatus("Open");
				} else {
					vo.setStatus("In Progress");
				}
			}
				
		});

		return vos;
	}



	@PostMapping("/updateComments")
	public Map<String, Boolean> add(@RequestBody Comment comment) {
		comment.setCreateTime(new Timestamp(System.currentTimeMillis()));
		commentRepository.save(comment);
		Map<String, Boolean> result = new HashMap<>();
		result.put("Result", true);
		return result;
	}



	@GetMapping("/listComments")
	public List<Comment> list(@RequestParam(value = "participantId") Long participantId) {
		return commentRepository.findByParticipantId(participantId);
	}
}