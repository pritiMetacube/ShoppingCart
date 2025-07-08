public with sharing class PurchaseOrderLineItemService {
    public static void createPurchaseOrderLineItems(Id poId, List<Product2> cartProducts)
    {
        List<PurchaseOrderLineItem__c> purchaseOrderLineItems = new List<PurchaseOrderLineItem__c>();
            for(Product2 cartItem: cartProducts)
            {
                PurchaseOrderLineItem__c newPurchaseOrderLineItem = PurchaseOrderLineItemDomain.generatePurchaseOrderLineItem(poId, cartItem);                
                purchaseOrderLineItems.add(newPurchaseOrderLineItem);
            }
            insert purchaseOrderLineItems;
    }
}