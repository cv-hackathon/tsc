package org.springboard.tsc.service;

import org.springboard.tsc.entity.Participant;

import java.util.List;

public interface ParticipantService {

    List<Participant> getParticipants(String name);

    Participant getParticipant(long id);
}
