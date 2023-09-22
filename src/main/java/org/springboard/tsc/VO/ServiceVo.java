package org.springboard.tsc.VO;

import java.io.Serializable;
import java.sql.Timestamp;

import lombok.Data;

@Data
public class ServiceVo implements Serializable  {
	
	private static final long serialVersionUID = 1L;
	private String serviceName;
	private Long serviceId;
	private Long organizationId;
	private String caseWorker;
	private String caseWorkerEmail;
	private String caseWorkerZoom;
	private String organizationName;
	private String description;
	private String serviceStatus;
	private Timestamp startTime;
	private Timestamp endTime;
	private String comments;
	private String serviceCategory;
	private Long orgServiceId;
}
