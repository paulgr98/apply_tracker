package pl.paulgr98.applytracker.service;

import pl.paulgr98.applytracker.dto.ApplicationDto;
import pl.paulgr98.applytracker.dto.ApplicationStatusDto;

import java.util.Date;
import java.util.List;

public interface ApplicationService {
    ApplicationDto addApplication(ApplicationDto applicationDto);

    ApplicationDto getApplication(Long id);

    List<ApplicationDto> getAllApplications();

    List<ApplicationDto> filterApplications(ApplicationStatusDto statusDto, Date fromDate, Date toDate);

    List<ApplicationDto> searchApplicationsByCompanyName(String companyName);

    List<String> getApplicationStatuses();

    ApplicationDto updateApplication(Long id, ApplicationDto applicationDto);

    ApplicationDto changeApplicationStatus(Long id, ApplicationStatusDto statusDto);

    void deleteApplication(Long id);
}
