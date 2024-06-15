package app;

import services.PensionService;
import services.TaxService;

import java.util.Locale;
import java.util.Scanner;

public class Program {

    public static void main(String[] args) {
        Locale.setDefault(Locale.US);
        Scanner sc = new Scanner(System.in);

        TaxService taxService = new TaxService();
        PensionService pensionService =  new PensionService();

        System.out.println(taxService.tax(4000));
        System.out.println(pensionService.discount(4000));

        sc.close();
    }
}
