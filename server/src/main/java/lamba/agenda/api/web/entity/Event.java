package lamba.agenda.api.web.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event implements PK<Long> {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_EVENT")
	@SequenceGenerator(name = "SEQ_EVENT", sequenceName = "S_EVENT", allocationSize = 1)
	private Long			id;
	
	@Column
	private String			title;
	
	@Column
	private String			description;
	
	@Column
	private LocalDateTime	date;

}
