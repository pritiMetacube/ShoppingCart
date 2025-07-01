public with sharing class ProductController {
    @AuraEnabled(cacheable=true)
    public static List<Product2> getproducts()
    {
        try{
            List<Product2> products = [SELECT Name, Price__c, ProductCode, Quantity__c FROM Product2 LIMIT 500];
            return products;
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
}