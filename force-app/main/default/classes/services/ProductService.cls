public with sharing class ProductService {
    public static List<Product2> getProducts(ProductRequest request)
    {
        return ProductSelector.selectProducts(request);        
    }

    public static Integer getTotalProductCount(){
        return ProductSelector.getTotalProductCount(); 
    }

    public static void updateProducts(List<Product2> cartProducts)
    {
        Set<Id> productIds = new Set<Id>();
        for(Product2 cartItem: cartProducts){
            productIds.add(cartItem.Id);
        }

        Map<Id, Product2> productMap = ProductSelector.getProductsByIds(productIds);
       
        List<Product2> updatedProducts = ProductDomain.modifyProductQuantity(cartProducts, productMap);
        
        if(!updatedProducts.isEmpty())
            update updatedProducts;
    }
}