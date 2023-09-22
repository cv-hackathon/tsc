package org.springboard.tsc.entity;


import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

/**
 * TSC admin user
 */

@Entity
@Data
public class Navigator {
    @Id
    private Long navigatorId;
    private String name;
    private String password;
    private String email;
    private String zoom;
    private String status;
    private Timestamp createTime;


    public Navigator() {

    }


}
