package org.springboard.tsc.controller;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CommonController {


    @PostMapping("/login")
    public boolean login(@RequestParam String email, @RequestParam String password, @RequestParam String type) {
        //TODO
        return true;
    }

    @RequestMapping("/search")
    public List topSearch(@RequestParam String name) {
        //TODO
        return new ArrayList();
    }
}
