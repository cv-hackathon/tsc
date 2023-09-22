package org.springboard.tsc.service.impl;

import org.springboard.tsc.entity.Notification;
import org.springboard.tsc.repository.NotificationRepository;
import org.springboard.tsc.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public void add(Notification notification) {
        
        notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getUnread(long id) {
        return notificationRepository.findByReceiverIdAndStatus(id, "Unread");
    }

    @Override
    public void markRead(long id) {
        Notification notification = notificationRepository.getReferenceById(id);
        notification.setStatus("Read");
        notification.setUpdateTime(new Timestamp(new Date().getTime()));
        notificationRepository.save(notification);
    }
}
