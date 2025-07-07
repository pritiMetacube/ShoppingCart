public with sharing class PurchaseOrderController {
    @AuraEnabled(cacheable=true)
    public static List<PurchaseOrder__c> getpurchaseOrders(PurchaseOrderRequest request)
    {
        try{
            Integer offset = (request.pageNumber-1)*request.pageSize;
            String orderBy = ' ORDER BY ' + request.sortBy + ' ' + request.sortDirection;
            String limitClause = ' LIMIT '+request.pageSize + ' OFFSET '+offset;
            String query = 'SELECT Id, Name, Order_Date__c, Status__c, Total_Amount__c FROM PurchaseOrder__c' + orderBy + limitClause;
            List<PurchaseOrder__c> purchaseOrders = Database.query(query);
            return purchaseOrders;
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
    
    @AuraEnabled(cacheable=true)    
    public static Integer getTotalPurchaseOrderCount(){
        try {
            return [SELECT Count() FROM PurchaseOrder__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
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