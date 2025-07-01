public with sharing class PurchaseOrderController {
    @AuraEnabled(cacheable=true)
    public static List<PurchaseOrder__c> getpurchaseOrders()
    {
        try{
            List<PurchaseOrder__c> purchaseOrders = [SELECT Id, Name, Order_Date__c, Status__c, Total_Amount__c FROM PurchaseOrder__c LIMIT 500];
            return purchaseOrders;
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
}