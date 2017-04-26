package lamba.agenda.api.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lamba.agenda.api.web.entity.Event;
import lamba.agenda.api.web.repository.EventRepository;

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
@RestController
@RequestMapping(path = "api/event")
public class EventController extends AbstractController<Event, Long, EventRepository> {
	
}
