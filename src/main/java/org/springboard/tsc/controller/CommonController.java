package org.springboard.tsc.controller;

import org.springboard.tsc.VO.LoginVO;
import org.springboard.tsc.VO.OrganizationVO;
import org.springboard.tsc.VO.SearchResultVO;
import org.springboard.tsc.entity.Participant;
import org.springboard.tsc.service.NavigatorService;
import org.springboard.tsc.service.OrganizationService;
import org.springboard.tsc.service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CommonController {

    @Autowired
    private NavigatorService navigatorService;
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private ParticipantService participantService;

    @PostMapping("/login")
    public LoginVO login(@RequestParam String email, @RequestParam String password, @RequestParam String type) {

        if ("Navigator".equals(type)) {
            return navigatorService.login(email, password);
        } else {
            return organizationService.login(email, password);
        }
    }

    @PostMapping("/search")
    public List<SearchResultVO> topSearch(@RequestParam String name) {
        List<SearchResultVO> resultVOS = new ArrayList<>();
        List<OrganizationVO> orgList = organizationService.getOrganizations(name);
        if (orgList != null && orgList.size() > 0) {
            for (OrganizationVO organizationVO : orgList) {
                SearchResultVO vo = new SearchResultVO();
                vo.setType("Organization");
                vo.setId(organizationVO.getId());
                vo.setName(organizationVO.getName());
                resultVOS.add(vo);
            }
        }
        List<Participant> participantList = participantService.getParticipants(name);
        if (participantList != null && participantList.size() > 0) {
            for (Participant participant : participantList) {
                SearchResultVO vo = new SearchResultVO();
                vo.setType("Participant");
                vo.setId(participant.getParticipantId());
                vo.setName(participant.getFirstname() + " " + participant.getLastname());
                resultVOS.add(vo);
            }
        }
        return resultVOS;
    }
}
