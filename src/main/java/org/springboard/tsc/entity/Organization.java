package org.springboard.tsc.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
@Data
public class Organization {
    @Id
    private Long organizationId;
    private String name;
    private String email;
    private String password;
    private String status;
    private Timestamp createTime;
    private String location;
    private String phone;


    public Organization() {

    }


}
