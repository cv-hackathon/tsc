package org.springboard.tsc.service;

import org.springboard.tsc.entity.Notification;

import java.util.List;

public interface NotificationService {


    void add(Notification notification);

    List<Notification> getUnread(long id);

    void markRead(long id);
}
