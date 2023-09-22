package org.springboard.tsc.service;

import org.springboard.tsc.VO.LoginVO;
import org.springboard.tsc.VO.OrganizationVO;
import org.springboard.tsc.entity.Organization;

import java.util.List;

public interface OrganizationService {
    List<Organization> getByName(String name);

    void add(OrganizationVO org);

    LoginVO login(String email, String password);

    List<OrganizationVO> getOrganizations(String name);

    OrganizationVO getOrganization(long id);
}
