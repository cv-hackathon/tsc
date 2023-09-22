package org.springboard.tsc.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CommonController {


    @PostMapping("/login")
    public boolean login(@RequestParam String email, @RequestParam String password, @RequestParam String type) {
        //TODO
        return true;
    }

    @PostMapping("/search")
    public List topSearch(@RequestParam String name) {
        //TODO
        return new ArrayList();
    }
}
