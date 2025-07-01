import { LightningElement, api } from 'lwc';

const columns =[
    {label: 'Name', fieldName: 'Name'},
    {label: 'Price', fieldName: 'Price__c', type:'currency'},
    {label: 'Product Code', fieldName: 'ProductCode', type: 'text'},
    {label: 'Units', fieldName: 'Quantity__c', type: 'number'},
    {label: 'Delete'},
];

export default class PurchaseOrderCart extends LightningElement {
    showInvoiceSection = false;

    //this property is public and can be set by a parent component.
    @api cartProducts;
    cartColumns = columns;

    handleCheckOutClick(){
        this.showInvoiceSection = true;
    }
}