public with sharing class PurchaseOrderDomain {
    public static PurchaseOrder__c generatePurchaseOrderInstance()
    {
        return new PurchaseOrder__c(
            Name= generateName(),
            Order_Date__c = Date.Today(),
            Status__c = 'Submitted'
        );
    }

    private static String generateName(){
        return 'PO-' + DateTime.now().getTime();
    }
}