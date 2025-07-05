public with sharing class ProductController {    
    @AuraEnabled(cacheable=true)
    public static List<Product2> getproducts()
    {
        try{
            List<Product2> products = [SELECT Id, Name, Price__c, ProductCode, Quantity__c FROM Product2 LIMIT 500];
            return products;
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }

    @AuraEnabled
    public static void updateProducts(List<CartItemWrapper> cartProducts)
    {
        try{
            List<Product2> updatedProducts = new List<Product2>();

            for(CartItemWrapper cartItem: cartProducts)
            {
                Product2 product = [SELECT Id, Quantity__c FROM Product2 WHERE Id = :cartItem.Id];
                product.Quantity__c -= cartItem.quantity;
                updatedProducts.add(product);
            }
            update updatedProducts;
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
}