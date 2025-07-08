public with sharing class PurchaseOrderLineItemDomain {
    public static PurchaseOrderLineItem__c generatePurchaseOrderLineItem(Id poId, Product2 cartItem)
    {
        return new PurchaseOrderLineItem__c(
            Name= generateName(),
            PurchaseOrder__c = poId,
            Product__c = cartItem.Id,
            Quantity__c = cartItem.Quantity__c
        );
    }

    private static String generateName(){
        return 'POLI-' + DateTime.now().getTime();
    }
}