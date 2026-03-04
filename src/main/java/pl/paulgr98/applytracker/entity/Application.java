package pl.paulgr98.applytracker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "application_date", nullable = false)
    private Date applicationDate;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "position_name", nullable = false)
    private String positionName;

    @Column(name = "offer_link", nullable = false)
    private String offerLink;

    @Column(nullable = false, length = 20, options = "CHECK (status IN ('APPLIED', 'WAITING', 'RECRUITMENT', 'REJECTED', 'NO_RESPONSE', 'JOB_OFFER'))")
    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    private String comment;

    @Column(name = "cv_file_name")
    private String cvFileName;
}
