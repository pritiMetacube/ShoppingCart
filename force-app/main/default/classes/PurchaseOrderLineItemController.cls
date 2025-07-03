public with sharing class PurchaseOrderLineItemController {
    @AuraEnabled
    public static void addPurchaseOrderLineItems(Id poId, List<Product2> cartProducts)
    {
        try{
            List<PurchaseOrderLineItem__c> purchaseOrderLineItems = new List<PurchaseOrderLineItem__c>();
            for(Product2 cartItem: cartProducts)
            {
                PurchaseOrderLineItem__c newPurchaseOrderLineItem = new PurchaseOrderLineItem__c(
                    Name = generateName(),
                    PurchaseOrder__c = poId,
                    Product__c = cartItem.Id,
                    Quantity__c = cartItem.Quantity__c
                );
                purchaseOrderLineItems.add(newPurchaseOrderLineItem);
            }
            insert purchaseOrderLineItems;
        } catch(Exception ex){
                throw new AuraHandledException(ex.getMessage());
        }                        
    }

    public static String generateName(){
        Integer randomNumber = Math.round(Math.random() * 100000);
        return 'POLI-'+String.valueOf(randomNumber);
    }
}