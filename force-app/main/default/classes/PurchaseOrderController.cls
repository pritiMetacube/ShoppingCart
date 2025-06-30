public with sharing class PurchaseOrderController {
    @AuraEnabled(cacheable=true)
    public static List<PurchaseOrder__c> getpurchaseOrders()
    {
        List<PurchaseOrder__c> purchaseOrders = [SELECT Id, Status__c, Total_Amount__c FROM PurchaseOrder__c];
        return purchaseOrders;
    }
}