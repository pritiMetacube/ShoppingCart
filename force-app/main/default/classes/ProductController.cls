public with sharing class ProductController {
    @AuraEnabled(cacheable=true)
    public static List<Product2> getproducts()
    {
        List<Product2> products = [SELECT Name, Price__c, ProductCode, Quantity__c FROM Product2];
        return products;
    }
}