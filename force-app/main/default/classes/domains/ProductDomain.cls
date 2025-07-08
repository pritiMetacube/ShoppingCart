public with sharing class ProductDomain {
    public static List<Product2> modifyProductQuantity(List<Product2> cartProducts, Map<Id,Product2> productMap)
    {
        List<Product2> result = new List<Product2>();

        for(Product2 cartItem: cartProducts)
        {
            Product2 existingProduct = productMap.get(cartItem.Id);
            if(existingProduct != null && existingProduct.Quantity__c != null)
            {
                existingProduct.Quantity__c -= cartItem.Quantity__c;
                result.add(existingProduct);
            }
        }
        return result;
    }
}