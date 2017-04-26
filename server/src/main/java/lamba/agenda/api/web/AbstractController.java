package lamba.agenda.api.web;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lamba.agenda.api.web.entity.PK;

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
public abstract class AbstractController<T extends PK<ID>, ID extends Serializable, R extends CrudRepository<T, ID>> {

	@Autowired
	protected R repository;

	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> create(@RequestBody T entity) {
		repository.save(entity);

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<T> retrieve(@PathVariable("id") ID id) {
		T entity = repository.findOne(id);

		if (entity == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);

		return new ResponseEntity<>(entity, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Iterable<T>> retrieveAll() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<T> update(@PathVariable("id") ID id, @RequestBody T entity) {
		T old = repository.findOne(id);
		
		if (old == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		
		old.setId(id);
		repository.save(entity);

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<T> delete(@PathVariable("id") ID id) {
		repository.delete(id);

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<T> deleteAll() {
		repository.deleteAll();

		return new ResponseEntity<>(HttpStatus.OK);
	}

}
