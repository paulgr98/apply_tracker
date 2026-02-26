package pl.paulgr98.applytracker.config.Converters;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class StringToDateConverter implements Converter<String, Date> {
    @Override
    public Date convert(String source) {
        try {
            return new SimpleDateFormat("yyy-MM-dd").parse(source);
        } catch (ParseException exc) {
            throw new IllegalArgumentException("Invalid date format. Use yyyy-MM-dd", exc);
        }
    }
}
