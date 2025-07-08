public with sharing class PurchaseOrderLineItemController {
    @AuraEnabled
    public static void createPurchaseOrderLineItems(Id poId, List<Product2> cartProducts)
    {
        try{
            PurchaseOrderLineItemService.createPurchaseOrderLineItems(poId, cartProducts);            
        } catch(Exception ex){
                throw new AuraHandledException(ex.getMessage());
        }                          
    }    
}