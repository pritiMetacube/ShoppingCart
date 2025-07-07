public with sharing class ProductController {    
    @AuraEnabled(cacheable=true)
    public static List<Product2> getproducts(ProductRequest request)
    {
        try{
            Integer offset = (request.pageNumber-1)*request.pageSize;
            String orderBy = ' ORDER BY ' + request.sortBy + ' ' + request.sortDirection;
            String limitClause = ' LIMIT '+request.pageSize + ' OFFSET '+offset;
            String query = 'SELECT Id, Name, Price__c, ProductCode, Quantity__c FROM Product2' + orderBy + limitClause;
            List<Product2> products = Database.query(query);
            return products;
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)    
    public static Integer getTotalProductCount(){
        try {
            return [SELECT Count() FROM Product2];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void updateProducts(List<Product2> cartProducts)
    {
        try{
            List<Product2> updatedProducts = new List<Product2>();

            for(Product2 cartItem: cartProducts)
            {
                Product2 product = [SELECT Id, Quantity__c FROM Product2 WHERE Id = :cartItem.Id];
                product.Quantity__c -= cartItem.Quantity__c;
                updatedProducts.add(product);
            }
            update updatedProducts;
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
}