package org.springboard.tsc.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Participant implements Serializable {
    private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long participantId;
    private Long navigatorId;
    private String birthday;
    private String firstname;
    private String lastname;
    private String gender;
    private String email;
    private String phone;
    private String needs;
    private String bankCardOpen;
    private String tags;
    private String status;
    private String exit;
    private String exitReason;
    private String cabin;
    private String achievement;
    private String achieveReason;
    private Timestamp createTime;

    public Participant() {

    }
}
