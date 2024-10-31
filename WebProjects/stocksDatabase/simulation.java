package db;

import java.sql.*;
import java.util.ArrayList;
import java.util.Scanner;

public class simulation {
    static String dbdriver = "com.mysql.jdbc.Driver";
    static String dburl = "jdbc:mysql://localhost";
    static String dbname = "data_analytics_2017";
    static Connection connection = null;

    private static double[] handle(String stocksInput, String allocationInput) {
        String[] stocks = stocksInput.split(" ");
        String[] allocationsStrings = allocationInput.split(" ");
        double[] allocations = new double[allocationsStrings.length];
        double sum = 0.0;

        for (int i=0; i<allocationsStrings.length; i++) {
            double value = Double.parseDouble(allocationsStrings[i]);
            allocations[i] = value;
            sum += value;
        }

        if (Math.abs(sum - 1.0d) > 0.000001d) {
            System.out.println("Allocations must sum to 1.");
            System.exit(0);
        }

        double celgAllocation = 0.0;
        double fbAllocation = 0.0;
        double googAllocation = 0.0;
        double nvdaAllocation = 0.0;

        for (int i=0; i<stocks.length; i++) {
            String stock = stocks[i].toUpperCase();
            switch (stock) {
                case "CELG" -> celgAllocation = allocations[i];
                case "FB" -> fbAllocation = allocations[i];
                case "GOOG" -> googAllocation = allocations[i];
                case "NVDA" -> nvdaAllocation = allocations[i];
            }
        }

        ArrayList<java.sql.Date> dates = new ArrayList<>();
        ArrayList<Double> celgStockValues = new ArrayList<>();
        ArrayList<Double> fbStockValues = new ArrayList<>();
        ArrayList<Double> googStockValues = new ArrayList<>();
        ArrayList<Double> nvdaStockValues = new ArrayList<>();
        ArrayList<Double> spyStockValues = new ArrayList<>();
        ArrayList<Double> portfolioStockValues = new ArrayList<>();
        ArrayList<Double> portfolioCumulativeReturns = new ArrayList<>();
        ArrayList<Double> differences = new ArrayList<>();

        String query = "select `date`, " +
                "`CELG Cumulative Return`, " +
                "`FB Cumulative Return`, " +
                "`GOOG Cumulative Return`, " +
                "`NVDA Cumulative Return`, " +
                "`SPY Cumulative Return`\n" +
                "from portfolio;";

        ResultSet results = null;
        Statement statement = null;
        try {
            statement = connection.createStatement();
            results = statement.executeQuery(query);
            com.mysql.jdbc.ResultSetMetaData resultSetMetaData = (com.mysql.jdbc.ResultSetMetaData) results
                    .getMetaData();
            while (results.next()) {
                java.sql.Date date = results.getDate(1);
                dates.add(date);
                double celgCumulativeReturn = results.getDouble(2);
                double fbCumulativeReturn = results.getDouble(3);
                double googCumulativeReturn = results.getDouble(4);
                double nvdaCumulativeReturn = results.getDouble(5);
                double spyCumulativeReturn = results.getDouble(6);

                double celgStockValue = celgAllocation * celgCumulativeReturn;
                celgStockValues.add(celgStockValue);
                double fbStockValue = fbAllocation * fbCumulativeReturn;
                fbStockValues.add(fbStockValue);
                double googStockValue = googAllocation * googCumulativeReturn;
                googStockValues.add(googStockValue);
                double nvdaStockValue = nvdaAllocation * nvdaCumulativeReturn;
                nvdaStockValues.add(nvdaStockValue);

                double valueSum = celgStockValue + fbStockValue + googStockValue + nvdaStockValue;
                portfolioStockValues.add(valueSum);

                double cumulativePortfolioReturn = valueSum / portfolioStockValues.get(0);
                portfolioCumulativeReturns.add(cumulativePortfolioReturn);

                spyStockValues.add(spyCumulativeReturn);

                differences.add(cumulativePortfolioReturn - spyCumulativeReturn);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            System.exit(0);
        } finally {
            try {
                results.close();
                statement.close();
            } catch (SQLException e) {
                e.printStackTrace();
                System.exit(0);
            }
        }

        for (int i = 0; i < dates.size(); i++) {
            String updateQuery = "update portfolio set " +
                    "`CELG Value` = " + celgStockValues.get(i) + ", " +
                    "`FB Value` = " + fbStockValues.get(i) + ", " +
                    "`GOOG Value` = " + googStockValues.get(i) + ", " +
                    "`NVDA Value` = " + nvdaStockValues.get(i) + ", " +
                    "`SPY Value` = " + spyStockValues.get(i) + ", " +
                    "`Portfolio Cumulative Return` = " + portfolioCumulativeReturns.get(i) + ", " +
                    "`Portfolio Value` = " + portfolioStockValues.get(i) + "\n" +
                    "where `date` = '" + dates.get(i) + "';";
            Statement updateStatement = null;
            try {
                updateStatement = connection.createStatement();
                updateStatement.execute(updateQuery);
            } catch (SQLException e) {
                e.printStackTrace();
                System.exit(0);
            } finally {
                try {
                    updateStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                    System.exit(0);
                }
            }
        }


        double average = 0.0;
        for (double difference : differences) {
            average += difference;
        }
        average /= differences.size();

        double standardDeviation = 0.0;
        for (double difference : differences) {
            standardDeviation += Math.pow((difference - average),2);
        }
        standardDeviation /= (differences.size()-1);
        standardDeviation = Math.sqrt(standardDeviation);

        double sharpeRatio = (Math.sqrt(differences.size()) * average) / standardDeviation;

        double overallCumulativeReturn = (portfolioCumulativeReturns.get(portfolioCumulativeReturns.size() - 1) -
                portfolioCumulativeReturns.get(0)) / portfolioCumulativeReturns.get(0);

        double[] resultsArray = new double[4];
        resultsArray[0] = standardDeviation;
        resultsArray[1] = average;
        resultsArray[2] = sharpeRatio;
        resultsArray[3] = overallCumulativeReturn;
        return resultsArray;
    }

    private static void simulation(Scanner scanner) {
        System.out.print("Enter list of stocks (separated by a single space): ");
        String stocksInput = scanner.nextLine();

        System.out.println();

        System.out.print("Enter portfolio allocation (separated by a single space): ");
        String allocationInput = scanner.nextLine();

        double[] results = handle(stocksInput, allocationInput);

        System.out.println("Standard deviation: " + results[0]);
        System.out.println("Average: " + results[1]);
        System.out.println("Sharpe Ratio: " + results[2]);
        System.out.println("Cumulative Return: " + results[3]);
    }

    private static void optimization() {
        String stocksInput = "GOOG CELG NVDA FB";
        double bestSharpeRatio = 0.0;
        double standardDeviation = 0.0;
        double average = 0.0;
        double cumulativeReturn = 0.0;
        String bestAllocation = "";
        for (double googAllocation = 0.0; googAllocation <= 1.0; googAllocation += 0.1) {
            for (double celgAllocation = 0.0; celgAllocation <= 1.0; celgAllocation += 0.1) {
                for (double nvdaAllocation = 0.0; nvdaAllocation <= 1.0; nvdaAllocation += 0.1) {
                    for (double fbAllocation = 0.0; fbAllocation <= 1.0; fbAllocation += 0.1) {
                        double sum = googAllocation + celgAllocation + nvdaAllocation + fbAllocation;
                        if (Math.abs(sum - 1.0d) <= 0.000001d) {
                            googAllocation = (double) Math.round(googAllocation * 10.0) / 10.0;
                            celgAllocation = (double) Math.round(celgAllocation * 10.0) / 10.0;
                            nvdaAllocation = (double) Math.round(nvdaAllocation * 10.0) / 10.0;
                            fbAllocation = (double) Math.round(fbAllocation * 10.0) / 10.0;
                            String allocationInput = googAllocation + " " +  celgAllocation + " " + nvdaAllocation + " " + fbAllocation;
                            double[] results = handle(stocksInput, allocationInput);
                            if (results[2] > bestSharpeRatio) {
                                bestSharpeRatio = results[2];
                                standardDeviation = results[0];
                                average = results[1];
                                cumulativeReturn = results[3];
                                bestAllocation = allocationInput;
                            }
                        }
                    }
                }
            }
        }

        handle(stocksInput, bestAllocation);

        System.out.println(stocksInput);
        System.out.println(bestAllocation);
        System.out.println("Standard deviation: " + standardDeviation);
        System.out.println("Average: " + average);
        System.out.println("Sharpe Ratio: " + bestSharpeRatio);
        System.out.println("Cumulative Return: " + cumulativeReturn);
    }

    /**
     * @param args
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String login = "root";

        System.out.print("Enter password: ");
        String password = scanner.nextLine();

        System.out.println("Connecting as user '" + login + "' . . .");

        try {
            Class.forName(dbdriver);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            System.exit(0);
        }

        try {
            connection = DriverManager.getConnection((dburl + "/" + dbname+"?useSSL=false"),
                    login, password);
            connection.setClientInfo("autoReconnect", "true");
        } catch (SQLException e) {
            e.printStackTrace();
            System.exit(0);
        }

        //simulation(scanner);
        optimization();
    }
}
