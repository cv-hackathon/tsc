package org.springboard.tsc.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Comment implements Serializable {
    private static final long serialVersionUID = 1L;

	@Id
    private Long participantId;
	@Column(length = 1000000000)
    private String comment;
    private Timestamp createTime;

}
