package lamba.agenda.api;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lamba.agenda.api.web.entity.Event;
import lamba.agenda.api.web.entity.Note;
import lamba.agenda.api.web.repository.EventRepository;
import lamba.agenda.api.web.repository.NoteRepository;

/**
 * 
 * 
 * @author Leonardo Carmona da Silva
 *         <ul>
 *         <li><a href="https://br.linkedin.com/in/l3ocarmona">https://br.linkedin.com/in/l3ocarmona</a></li>
 *         <li><a href="https://github.com/LeoCarmona">https://github.com/LeoCarmona</a></li>
 *         </ul>
 *
 */
@Component
public class Mock {

	@Autowired
	private EventRepository eventRepository;
	
	@Autowired	
	private NoteRepository noteRepository;
	
	@PostConstruct
	public void init() {
		List<Event> events = new ArrayList<>();
		List<Note> notes = new ArrayList<>();
		
		LocalDateTime tomorrow = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
		
		for (int i = 1; i < 11; i++) {
			tomorrow = tomorrow.plusDays(1L);
			
			Event event = new Event();
			
			event.setTitle("Event " + i);
			event.setDescription("Description " + 1);
			event.setDate(tomorrow);
			
			events.add(event);
			
			Note note = new Note();
			
			note.setTitle("Note " + i);
			note.setDescription("Description " + i);
			note.setEnd(tomorrow);
			
			notes.add(note);
		}
		
		eventRepository.save(events);
		noteRepository.save(notes);
	}
	
}
