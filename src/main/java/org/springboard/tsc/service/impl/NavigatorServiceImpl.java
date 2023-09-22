package org.springboard.tsc.service.impl;

import org.springboard.tsc.VO.LoginVO;
import org.springboard.tsc.entity.Navigator;
import org.springboard.tsc.repository.NavigatorRepository;
import org.springboard.tsc.service.NavigatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NavigatorServiceImpl implements NavigatorService {

    @Autowired
    private NavigatorRepository navigatorRepository;

    @Override
    public LoginVO login(String email, String password) {
        List<Navigator> navigatorList = navigatorRepository.findByEmailAndPassword(email, password);
        if (navigatorList != null && navigatorList.size() == 1) {
            return new LoginVO(navigatorList.get(0).getNavigatorId(), navigatorList.get(0).getName(), navigatorList.get(0).getEmail(), "Navigator");
        } else {
            return new LoginVO();
        }
    }

    @Override
    public void add(Navigator navigator) {
        List<Navigator> navList = navigatorRepository.findByName(navigator.getName());
        if (navList == null || navList.size() == 0) {
            navigatorRepository.save(navigator);
        }
    }

    @Override
    public List<Navigator> get() {
        return navigatorRepository.findAll();
    }

    @Override
    public Navigator get(long id) {
        return navigatorRepository.getReferenceById(id);
    }
}
