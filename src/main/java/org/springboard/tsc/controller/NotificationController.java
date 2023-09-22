package org.springboard.tsc.controller;

import org.springboard.tsc.VO.NotificationVO;
import org.springboard.tsc.entity.Notification;
import org.springboard.tsc.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/send")
    public boolean sendNotification(@RequestBody NotificationVO notificationVO) {
        List<Long> receiverIdArr = notificationVO.getReceiverIds();
        for (long id : receiverIdArr) {
            Notification notification = new Notification();
            notification.setSenderId(notificationVO.getSenderId());
            notification.setSenderName(notificationVO.getSenderName());
            notification.setReceiverId(Long.valueOf(id));
            notification.setZoomCode(notificationVO.getZoomCode());
            notification.setZoomPassword(notificationVO.getZoomPassword());
            notification.setStatus("Unread");
            notification.setCreateTime(new Timestamp(new Date().getTime()));
            notification.setUpdateTime(new Timestamp(new Date().getTime()));
            notification.setId(new Date().getTime());
            notificationService.add(notification);
        }
        return true;
    }

    @GetMapping("/get/unread")
    public List<Notification> getUnread(@RequestParam long userId) {
        return notificationService.getUnread(userId);
    }

    @PostMapping("/read")
    public boolean read(@RequestParam long notificationId) {
        notificationService.markRead(notificationId);
        return true;
    }
}
