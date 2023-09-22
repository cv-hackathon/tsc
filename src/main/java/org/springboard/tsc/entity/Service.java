package org.springboard.tsc.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * This is for the service that participant received
 */
@Entity
@Data
public class Service implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long serviceId;
    private Long participantId;
    private Long navigatorId;
    private Long orgServiceId;
    private String description;
    private String status;

    private Timestamp updateTime;

    private Timestamp createTime;


    public Service() {

    }

}
