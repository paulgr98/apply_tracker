package pl.paulgr98.applytracker.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.paulgr98.applytracker.entity.ApplicationStatus;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationDto {
    private Long id;
    private Date applicationDate;
    private String companyName;
    private String positionName;
    private String offerLink;
    private ApplicationStatus status;
    private String comment;
    private String cvFileName;
}
