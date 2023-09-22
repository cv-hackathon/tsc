package org.springboard.tsc.service.impl;

import org.springboard.tsc.VO.LoginVO;
import org.springboard.tsc.VO.OrganizationServiceVO;
import org.springboard.tsc.VO.OrganizationVO;
import org.springboard.tsc.entity.OrgService;
import org.springboard.tsc.entity.Organization;
import org.springboard.tsc.repository.OrganizationRepository;
import org.springboard.tsc.repository.OrganizationServiceRepository;
import org.springboard.tsc.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrganizationServiceImpl implements OrganizationService {

    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private OrganizationServiceRepository organizationServiceRepository;

    @Override
    public List getByName(String name) {
        return organizationRepository.findByName(name);
    }

    @Override
    public void add(OrganizationVO org) {
        Organization organization = new Organization();
        organization.setOrganizationId(new Date().getTime());
        organization.setName(org.getName());
        organization.setEmail(org.getEmail());
        organization.setStatus("active");
        organization.setPhone(org.getPhone());
        organization.setLocation(org.getLocation());
        organization.setPassword(org.getPassword());
        organization.setCreateTime(new Timestamp(new Date().getTime()));
        organizationRepository.save(organization);
        for (OrganizationServiceVO service : org.getServices()) {
            OrgService orgService = new OrgService();
            orgService.setOrgServiceId(new Date().getTime());
            orgService.setName(service.getName());
            orgService.setOrganizationId(organization.getOrganizationId());
            orgService.setCreateTime(new Timestamp(new Date().getTime()));
            orgService.setEmail(service.getEmail());
            orgService.setPassword("test1234");
            orgService.setDescription(service.getDescription());
            orgService.setZoom(service.getZoom());
            orgService.setWorkerName(service.getWorkerName());
            orgService.setCategory(service.getServiceCategory());
            organizationServiceRepository.save(orgService);
        }
    }

    public LoginVO login(String email, String password) {
        List<OrgService> orgList = organizationServiceRepository.findByEmailAndPassword(email, password);
        if (orgList != null && orgList.size() >= 1) {
            return new LoginVO(orgList.get(0).getOrgServiceId(), orgList.get(0).getName(), orgList.get(0).getEmail(), "Organization");
        } else {
            return new LoginVO();
        }
    }

    public List<OrganizationVO> getOrganizations(String name) {
        List<OrganizationVO> organizationVOList = new ArrayList<>();
        List<Organization> organizationsList;
        if (name != null && !"".equals(name)) {
            organizationsList = organizationRepository.findByNameContainingIgnoreCase(name);
        } else {
            organizationsList = organizationRepository.findAll();
        }
        if (organizationsList != null && organizationsList.size() > 0) {
            for (Organization org : organizationsList) {
                List<OrgService> orgServicesList = organizationServiceRepository.findByOrganizationId(org.getOrganizationId());
                OrganizationVO organizationVO = new OrganizationVO();
                organizationVO.setId(org.getOrganizationId());
                organizationVO.setEmail(org.getEmail());
                organizationVO.setName(org.getName());
                organizationVO.setPhone(org.getPhone());
                organizationVO.setLocation(org.getLocation());
                List<OrganizationServiceVO> organizationServiceVOList = new ArrayList<>();
                for (OrgService orgService : orgServicesList) {
                    OrganizationServiceVO vo = new OrganizationServiceVO();
                    vo.setId(orgService.getOrgServiceId());
                    vo.setDescription(orgService.getDescription());
                    vo.setZoom(orgService.getZoom());
                    vo.setName(orgService.getName());
                    vo.setEmail(orgService.getEmail());
                    vo.setServiceCategory(orgService.getCategory());
                    vo.setWorkerName(orgService.getWorkerName());
                    organizationServiceVOList.add(vo);
                }
                organizationVO.setServices(organizationServiceVOList);
                organizationVOList.add(organizationVO);
            }
        }
        return organizationVOList;
    }

    @Override
    public OrganizationVO getOrganization(long id) {
        OrganizationVO vo = new OrganizationVO();
        Organization org = organizationRepository.getReferenceById(id);
        if (org.getName() != null && !org.getName().equals("")) {
            vo.setId(org.getOrganizationId());
            vo.setName(org.getName());
            List<OrgService> orgServicesList = organizationServiceRepository.findByOrganizationId(org.getOrganizationId());
            OrganizationVO organizationVO = new OrganizationVO();
            organizationVO.setId(org.getOrganizationId());
            organizationVO.setName(org.getName());
            List<OrganizationServiceVO> organizationServiceVOList = new ArrayList<>();
            for (OrgService orgService : orgServicesList) {
                OrganizationServiceVO orgServiceVO = new OrganizationServiceVO();
                orgServiceVO.setId(orgService.getOrgServiceId());
                orgServiceVO.setDescription(orgService.getDescription());
                orgServiceVO.setZoom(orgService.getZoom());
                orgServiceVO.setName(orgService.getName());
                orgServiceVO.setEmail(orgService.getEmail());
                orgServiceVO.setWorkerName(orgService.getWorkerName());
                orgServiceVO.setServiceCategory(orgService.getCategory());
                organizationServiceVOList.add(orgServiceVO);
            }
            vo.setServices(organizationServiceVOList);
        }
        return vo;
    }
}
