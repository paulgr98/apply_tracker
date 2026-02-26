package pl.paulgr98.applytracker.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.paulgr98.applytracker.entity.ApplicationStatus;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationStatusDto {
    private ApplicationStatus status;
}
