package org.springboard.tsc.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.sql.Timestamp;

@Data
@Entity
public class Notification implements Serializable {

    @Id
    private long id;
    private long senderId;
    private String senderName;
    private long receiverId;
    private String zoomCode;
    private String zoomPassword;
    private String status;
    private Timestamp createTime;
    private Timestamp updateTime;

}
