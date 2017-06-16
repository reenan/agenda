package lamba.agenda.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * 
 * 
 * @author Leonardo Carmona da Silva
 *         <ul>
 *         <li><a href= "https://br.linkedin.com/in/l3ocarmona">https://br.linkedin.com/in/l3ocarmona</a></li>
 *         <li><a href= "https://github.com/LeoCarmona">https://github.com/LeoCarmona</a></li>
 *         </ul>
 *
 */
@SpringBootApplication
@RestController
@RequestMapping("/")
public class AgendaApplication {

    public static void main(String[] args) {
        SpringApplication.run(AgendaApplication.class, args);
    }

    @RequestMapping(method = RequestMethod.GET)
    public String home() {
        return "ok";
    }

}
