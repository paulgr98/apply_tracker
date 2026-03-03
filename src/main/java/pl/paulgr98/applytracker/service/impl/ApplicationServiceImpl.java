package pl.paulgr98.applytracker.service.impl;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import pl.paulgr98.applytracker.dto.ApplicationDto;
import pl.paulgr98.applytracker.dto.ApplicationStatusDto;
import pl.paulgr98.applytracker.entity.Application;
import pl.paulgr98.applytracker.entity.ApplicationStatus;
import pl.paulgr98.applytracker.exception.ResourceNotFoundException;
import pl.paulgr98.applytracker.repository.ApplicationRepository;
import pl.paulgr98.applytracker.service.ApplicationService;

import java.beans.PropertyDescriptor;
import java.util.*;

@Service
@AllArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private ApplicationRepository applicationRepository;
    private ModelMapper modelMapper;

    @Override
    public ApplicationDto addApplication(ApplicationDto applicationDto) {
        Application application = modelMapper.map(applicationDto, Application.class);
        Application saved = applicationRepository.save(application);

        return modelMapper.map(saved, ApplicationDto.class);
    }

    @Override
    public ApplicationDto getApplication(Long id) {
        Application application = findApplicationByIdOrThrowException(id);

        return modelMapper.map(application, ApplicationDto.class);
    }

    @Override
    public List<ApplicationDto> getAllApplications() {
        List<Application> applications = applicationRepository.findAll();

        return applications.stream()
                .map(application -> modelMapper.map(application, ApplicationDto.class))
                .toList();
    }

    @Override
    public List<ApplicationDto> filterApplications(ApplicationStatusDto statusDto, Date fromDate, Date toDate) {
        Specification<Application> specification = ((root, query, criteriaBuilder) ->
                criteriaBuilder.conjunction());

        if (statusDto != null && statusDto.getStatus() != null) {
            specification = specification
                    .and((root, query, criteriaBuilder) ->
                            criteriaBuilder.equal(root.get("status"), statusDto.getStatus()));
        }

        if (fromDate != null && toDate != null) {
            specification = specification
                    .and((root, query, criteriaBuilder) ->
                            criteriaBuilder.between(root.get("applicationDate"), fromDate, toDate));
        }


        List<Application> applications = applicationRepository.findAll(specification);
        return applications.stream()
                .map(application -> modelMapper.map(application, ApplicationDto.class))
                .toList();
    }

    @Override
    public List<ApplicationDto> searchApplicationsByCompanyName(String companyName) {
        List<Application> applications = applicationRepository.findByCompanyName(companyName);

        return applications.stream()
                .map(application -> modelMapper.map(application, ApplicationDto.class))
                .toList();
    }

    @Override
    public List<String> getApplicationStatuses() {
        return Arrays.stream(ApplicationStatus.values())
                .map(ApplicationStatus::getDisplayName)
                .toList();
    }

    @Override
    public ApplicationDto updateApplication(Long id, ApplicationDto applicationDto) {
        Application toUpdate = findApplicationByIdOrThrowException(id);

        BeanUtils.copyProperties(applicationDto, toUpdate, getNullPropertyNames(applicationDto));
        Application saved = applicationRepository.save(toUpdate);

        return modelMapper.map(saved, ApplicationDto.class);
    }

    private String[] getNullPropertyNames(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        PropertyDescriptor[] descriptors = src.getPropertyDescriptors();

        Set<String> emptyProperties = new HashSet<>();
        for (PropertyDescriptor descriptor : descriptors) {
            Object srcValue = src.getPropertyValue(descriptor.getName());
            if (srcValue == null) {
                emptyProperties.add(descriptor.getName());
            }
        }

        return emptyProperties.toArray(new String[0]);
    }

    @Override
    public ApplicationDto changeApplicationStatus(Long id, ApplicationStatusDto statusDto) {
        Application toChange = findApplicationByIdOrThrowException(id);

        toChange.setStatus(statusDto.getStatus());
        Application saved = applicationRepository.save(toChange);

        return modelMapper.map(saved, ApplicationDto.class);
    }

    @Override
    public void deleteApplication(Long id) {
        Application toDelete = findApplicationByIdOrThrowException(id);

        applicationRepository.delete(toDelete);
    }

    private Application findApplicationByIdOrThrowException(Long id) {
        return applicationRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No job application with ID " + id + " was found."));
    }
}
