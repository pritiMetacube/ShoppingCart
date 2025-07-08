public class PurchaseOrderRequest {
    @AuraEnabled public Integer pageNumber {get; set; }
    @AuraEnabled public Integer pageSize {get; set;}
    @AuraEnabled public String sortBy {get; set;}
    @AuraEnabled public String sortDirection {get; set;}
}