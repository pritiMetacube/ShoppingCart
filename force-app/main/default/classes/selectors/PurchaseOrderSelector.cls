public with sharing class PurchaseOrderSelector {
    public static List<PurchaseOrder__c> selectPurchaseOrders(PurchaseOrderRequest request)
    {
        Integer offset = (request.pageNumber-1)*request.pageSize;
        String orderBy = ' ORDER BY ' + request.sortBy + ' ' + request.sortDirection;
        String limitClause = ' LIMIT '+request.pageSize + ' OFFSET '+offset;
        
        String query = 'SELECT Id, Name, Order_Date__c, Status__c, Total_Amount__c FROM PurchaseOrder__c' + orderBy + limitClause;
        
        List<PurchaseOrder__c> purchaseOrders = Database.query(query);
        return purchaseOrders;
    }

    public static Integer getTotalPurchaseOrderCount(){
        return [SELECT Count() FROM PurchaseOrder__c];
    }
}