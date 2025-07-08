public with sharing class PurchaseOrderController {
    @AuraEnabled(cacheable=true)
    public static List<PurchaseOrder__c> getPurchaseOrders(PurchaseOrderRequest request)
    {
        try{
            return PurchaseOrderService.getPurchaseOrders(request);            
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
    
    @AuraEnabled(cacheable=true)    
    public static Integer getTotalPurchaseOrderCount(){
        try {
            return PurchaseOrderService.getTotalPurchaseOrderCount();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Id createPurchaseOrder()
    {
        try{            
            return PurchaseOrderService.createPurchaseOrder();
        } catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }    
}