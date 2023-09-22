package org.springboard.tsc.VO;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

import lombok.Data;

@Data
public class ParticipantVo implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long participantId;
	private String firstname;
	private String lastname;
	private String status;
	private Long navigatorId;
	private String email;
	private String birthday;
	private String gender;
	private String phone;
	private String tags;
	private String needs;
	private String bankCardOpen;
	private String exit;
	private String exitReason;
	private String cabin;
	private String achievement;
	private List<ServiceVo> services;
	private Timestamp registerTime;
	private String achieveReason;
	
	

}
