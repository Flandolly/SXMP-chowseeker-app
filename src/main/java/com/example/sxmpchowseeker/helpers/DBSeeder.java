package com.example.sxmpchowseeker.helpers;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class DBSeeder {

    public List<String[]> convertCSVData() {
        try (CSVReader reader = new CSVReader(new FileReader("C:\\Users\\fland\\IdeaProjects\\SXMP-chowseeker-app\\src\\main\\resources\\db\\seed\\seed_data.csv"))) {
            List<String[]> result = reader.readAll();
            result.forEach(line -> System.out.println(Arrays.toString(line)));
            return result;
        }
        catch(IOException | CsvException e) {
            e.printStackTrace();
            return null;
        }
    }

}
