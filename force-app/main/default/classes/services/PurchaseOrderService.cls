public with sharing class PurchaseOrderService {
    public static List<PurchaseOrder__c> getPurchaseOrders(PurchaseOrderRequest request)
    {
        return PurchaseOrderSelector.selectPurchaseOrders(request);
    }

    public static Integer getTotalPurchaseOrderCount(){
        return PurchaseOrderSelector.getTotalPurchaseOrderCount();
    }

    public static Id createPurchaseOrder()
    {
        PurchaseOrder__c purchaseOrder = PurchaseOrderDomain.generatePurchaseOrderInstance();
        insert purchaseOrder;
        return purchaseOrder.Id;
    }    
}