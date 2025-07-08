public with sharing class ProductSelector {
    public static List<Product2> selectProducts(ProductRequest request)
    {
        Integer offset = (request.pageNumber-1)*request.pageSize;
        String orderBy = ' ORDER BY ' + request.sortBy + ' ' + request.sortDirection;
        String limitClause = ' LIMIT '+request.pageSize + ' OFFSET '+offset;
        
        String query = 'SELECT Id, Name, Price__c, ProductCode, Quantity__c FROM Product2' + orderBy + limitClause;
        
        List<Product2> products = Database.query(query);
        return products;
    }

    public static Integer getTotalProductCount(){
        return [SELECT Count() FROM Product2]; 
    }

    public static Map<Id,Product2> getProductsByIds(Set<Id> ids)
    {
        return new Map<Id, Product2> (
            [SELECT Id, Quantity__c FROM Product2 WHERE Id IN :ids]
        );
    }
}