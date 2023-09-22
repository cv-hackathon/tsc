package org.springboard.tsc.service;

import org.springboard.tsc.VO.LoginVO;
import org.springboard.tsc.entity.Navigator;

import java.util.List;

public interface NavigatorService {

    LoginVO login(String name, String password);

    void add(Navigator navigator);

    List<Navigator> get();

    Navigator get(long id);
}
