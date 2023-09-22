package org.springboard.tsc.VO;

import java.sql.Timestamp;

public interface ServiceInfo {

	Long getParticipantId();
	
	String getFirstname();
	String getLastname();
	String getOrgName();
	
	String getServiceName();
	
	String getServiceCategory();
	
	String getWorkerName();
	String getWorkerZoom();
	String getWorkerEmail();
	String getServiceStatus();
	String getStatus();
	
	Timestamp getRegisterTime();
	
	Timestamp getStartTime();
	
	Timestamp getEndTime();
	
	String getGender();
	
	String getEmail();
	
	String getBirthday();
	
	String getNeeds();
	
	String getPhone();
	
	String getTags();
	
	String getDescription();
	
	Long getNavigatorId(); 
	
	Long getServiceId();
	
	Long getOrganizationId();
	
	Long getOrgServiceId();
	
	String getBankCardOpen();
	
	String getExit();
	
	String getExitReason();
	
	String getCabin();
	
	String getAchievement();
	
	String getAchieveReason();
	
	
}
