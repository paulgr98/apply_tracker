package pl.paulgr98.applytracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import pl.paulgr98.applytracker.entity.Application;
import pl.paulgr98.applytracker.entity.ApplicationStatus;

import java.util.Date;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long>, JpaSpecificationExecutor<Application> {
    List<Application> findByStatusAndApplicationDateBefore(ApplicationStatus status, Date before);
    List<Application> findByCompanyName(String companyName);
}
