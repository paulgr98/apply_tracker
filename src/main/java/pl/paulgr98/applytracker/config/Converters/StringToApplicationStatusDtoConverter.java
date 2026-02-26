package pl.paulgr98.applytracker.config.Converters;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import pl.paulgr98.applytracker.dto.ApplicationStatusDto;
import pl.paulgr98.applytracker.entity.ApplicationStatus;

import java.util.Arrays;

@Component
public class StringToApplicationStatusDtoConverter implements Converter<String, ApplicationStatusDto> {
    @Override
    public ApplicationStatusDto convert(String source) {
        ApplicationStatus status = Arrays.stream(ApplicationStatus.values())
                .filter(s -> s.getDisplayName().equalsIgnoreCase(source))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid status: " + source));
        return new ApplicationStatusDto(status);
    }
}