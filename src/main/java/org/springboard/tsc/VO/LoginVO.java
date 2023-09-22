package org.springboard.tsc.VO;

import lombok.Data;

@Data
public class LoginVO {
    private boolean success;
    private long id;
    private String name;
    private String email;
    private String type;

    public LoginVO(long id, String name, String email, String type) {
        this.success = true;
        this.id = id;
        this.name = name;
        this.email = email;
        this.type = type;
    }

    public LoginVO() {
        this.success = false;
    }
}
