package pl.paulgr98.applytracker.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.paulgr98.applytracker.dto.ApplicationDto;
import pl.paulgr98.applytracker.dto.ApplicationStatusDto;
import pl.paulgr98.applytracker.service.ApplicationService;

import java.util.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/applications")
@AllArgsConstructor
public class ApplicationController {

    private ApplicationService applicationService;

    @PostMapping
    public ResponseEntity<ApplicationDto> addApplication(@RequestBody ApplicationDto applicationDto) {
        ApplicationDto saved = applicationService.addApplication(applicationDto);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationDto> getApplication(@PathVariable Long id) {
        ApplicationDto found = applicationService.getApplication(id);
        return ResponseEntity.ok(found);
    }

    @GetMapping
    public ResponseEntity<List<ApplicationDto>> getAllApplications() {
        List<ApplicationDto> found = applicationService.getAllApplications();
        return ResponseEntity.ok(found);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<ApplicationDto>> filterApplications(
            @RequestParam(value = "status", required = false) ApplicationStatusDto statusDto,
            @RequestParam(value = "From", required = false) Date fromDate,
            @RequestParam(value = "To", required = false) Date toDate
    ) {
        List<ApplicationDto> found = applicationService.filterApplications(statusDto, fromDate, toDate);
        return ResponseEntity.ok(found);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ApplicationDto>> searchApplicationsByCompanyName(
            @RequestParam(value = "companyName") String companyName
    ) {
        List<ApplicationDto> found = applicationService.searchApplicationsByCompanyName(companyName);
        return ResponseEntity.ok(found);
    }

    @GetMapping("/statuses")
    public ResponseEntity<List<String>> getAllApplicationStatuses() {
        List<String> statuses = applicationService.getApplicationStatuses();
        return ResponseEntity.ok(statuses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApplicationDto> updateApplication(@PathVariable Long id,
                                                            @RequestBody ApplicationDto applicationDto) {
        ApplicationDto saved = applicationService.updateApplication(id, applicationDto);
        return ResponseEntity.ok(saved);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApplicationDto> changeApplicationStatus(@PathVariable Long id,
                                                                  @RequestBody ApplicationStatusDto statusDto) {
        ApplicationDto saved = applicationService.changeApplicationStatus(id, statusDto);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.ok("Application with ID " + id + " deleted successfully.");
    }

}
