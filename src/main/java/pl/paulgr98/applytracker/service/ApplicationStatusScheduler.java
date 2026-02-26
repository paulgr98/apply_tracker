package pl.paulgr98.applytracker.service;

import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pl.paulgr98.applytracker.entity.Application;
import pl.paulgr98.applytracker.entity.ApplicationStatus;
import pl.paulgr98.applytracker.repository.ApplicationRepository;

import java.util.Date;
import java.util.List;

@Component
@AllArgsConstructor
public class ApplicationStatusScheduler {

    private ApplicationRepository applicationRepository;
    private static final long ONE_HOUR = 3600000L;

    @Scheduled(fixedDelay = ONE_HOUR)
    public void updateAppliedToWaiting() {

        int threeDays = 3 * 24 * 60 * 60 * 1000;
        Date threeDaysAgo = new Date(System.currentTimeMillis() - threeDays);

        List<Application> applications = applicationRepository
                .findByStatusAndApplicationDateBefore(ApplicationStatus.APPLIED, threeDaysAgo);

        applications.forEach(app -> app.setStatus(ApplicationStatus.WAITING));
        applicationRepository.saveAll(applications);
    }

    @Scheduled(fixedDelay = ONE_HOUR)
    public void updateWaitingToNoResponse() {

        int twoWeeks = 14 * 24 * 60 * 60 * 1000;
        Date twoWeeksAgo = new Date(System.currentTimeMillis() - twoWeeks);

        List<Application> applications = applicationRepository
                .findByStatusAndApplicationDateBefore(ApplicationStatus.WAITING, twoWeeksAgo);

        applications.forEach(app -> app.setStatus(ApplicationStatus.NO_RESPONSE));
        applicationRepository.saveAll(applications);
    }

}
