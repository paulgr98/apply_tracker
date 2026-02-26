package pl.paulgr98.applytracker.config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import pl.paulgr98.applytracker.config.Converters.StringToApplicationStatusDtoConverter;
import pl.paulgr98.applytracker.config.Converters.StringToDateConverter;

@Configuration
@AllArgsConstructor
public class WebConfig implements WebMvcConfigurer {
    private final StringToApplicationStatusDtoConverter converterStringToStatus;
    private final StringToDateConverter converterStringToDate;

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(converterStringToStatus);
        registry.addConverter(converterStringToDate);
    }
}