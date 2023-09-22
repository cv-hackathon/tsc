package org.springboard.tsc.VO;

import lombok.Data;

import java.util.List;

@Data
public class NotificationVO {
    private long senderId;
    private String senderName;
    private List<Long> receiverIds;
    private String zoomCode;
    private String zoomPassword;
}
