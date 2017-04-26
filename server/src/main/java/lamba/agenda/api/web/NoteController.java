package lamba.agenda.api.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lamba.agenda.api.web.entity.Note;
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
@RestController
@RequestMapping(path = "api/note")
public class NoteController extends AbstractController<Note, Long, NoteRepository> {

}
