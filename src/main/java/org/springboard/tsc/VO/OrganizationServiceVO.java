package org.springboard.tsc.VO;

import lombok.Data;

@Data
public class OrganizationServiceVO {
    private long id;
    private String name;
    private String workerName;
    private String email;
    private String serviceCategory;
    private String zoom;
    private String password;
    private String description;
}