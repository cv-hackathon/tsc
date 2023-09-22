package org.springboard.tsc.service.impl;

import org.springboard.tsc.entity.Participant;
import org.springboard.tsc.repository.ParticipantRepository;
import org.springboard.tsc.service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParticipantServiceImpl implements ParticipantService {

    @Autowired
    private ParticipantRepository participantRepository;

    @Override
    public List<Participant> getParticipants(String name) {
        return participantRepository.findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(name, name);
    }

    @Override
    public Participant getParticipant(long id) {
        return participantRepository.getReferenceById(id);
    }
}
