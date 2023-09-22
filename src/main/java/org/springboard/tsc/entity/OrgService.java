package org.springboard.tsc.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
@Data
public class OrgService {
    @Id
    private Long orgServiceId;
    private String name;
    private String category;
    private Long organizationId;
    private String workerName;
    private String email;
    private String password;
    private String zoom;
    private String description;

    private Timestamp createTime;


    public OrgService() {

    }
}
