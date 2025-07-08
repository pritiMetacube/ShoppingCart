public with sharing class ProductController {    
    @AuraEnabled(cacheable=true)
    public static List<Product2> getProducts(ProductRequest request)
    {
        try{
            return ProductService.getProducts(request);
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)    
    public static Integer getTotalProductCount(){
        try {            
            return ProductService.getTotalProductCount();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void updateProducts(List<Product2> cartProducts)
    {
        try{
            ProductService.updateProducts(cartProducts);            
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
}