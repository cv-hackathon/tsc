package org.springboard.tsc.controller;

import org.springboard.tsc.entity.Navigator;
import org.springboard.tsc.service.NavigatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@RestController
public class NavigatorController {

    @Autowired
    private NavigatorService navigatorService;

    @PostMapping("/navigator/add")
    public void createUser(@RequestBody Navigator navigator) {
        navigatorService.add(navigator);
    }

    @GetMapping("/navigator")
    public List<Navigator> organization(@RequestParam(required = false) String name) {
        return navigatorService.get();
    }

    @GetMapping("/navigator/{id}")
    public List<Navigator> organization(@PathVariable long id) {
        return navigatorService.get();
    }


    @GetMapping("/navigator/add/test")
    public void add() {
        Navigator navigator = new Navigator();
        navigator.setNavigatorId(new Date().getTime());
        navigator.setName("Navigator A");
        navigator.setPassword("test1234");
        navigator.setStatus("active");
        navigator.setCreateTime(new Timestamp(new Date().getTime()));
        navigator.setZoom("123456");
        navigator.setEmail("test@test.com");

        navigatorService.add(navigator);
    }
}
