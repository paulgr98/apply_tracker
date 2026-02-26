package pl.paulgr98.applytracker.entity;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ApplicationStatus {
    APPLIED("Applied"),
    WAITING("Waiting"),
    RECRUITMENT("Recruitment"),
    REJECTED("Rejected"),
    NO_RESPONSE("No Response"),
    JOB_OFFER("Job Offer");

    @JsonValue
    private final String displayName;
}
