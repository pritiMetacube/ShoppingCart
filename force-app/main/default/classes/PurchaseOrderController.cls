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

    @AuraEnabled
    public static Id createPurchaseOrder()
    {
        try{
            PurchaseOrder__c purchaseOrder = new PurchaseOrder__c(
                Name= generateName(),
                Order_Date__c = Date.Today(),
                Status__c = 'Submitted'
            );
            insert purchaseOrder;
            return purchaseOrder.Id;
        } catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }

    public static String generateName(){
        Integer randomNumber = Math.round(Math.random() * 100000);
        return 'PO-'+String.valueOf(randomNumber);
    }
}