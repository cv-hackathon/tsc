package org.springboard.tsc.VO;

import lombok.Data;

import java.util.List;

@Data
public class OrganizationVO {
    private long id;
    private String name;
    private String email;
    private String password;
    private String location;
    private String phone;
    private List<OrganizationServiceVO> services;

}


