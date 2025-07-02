import { LightningElement ,api} from 'lwc';

const columns =[
    {label: 'Name', fieldName: 'Name'},
    {label: 'Price', fieldName: 'Price__c', type:'currency'},
    {label: 'Product Code', fieldName: 'ProductCode', type: 'text'},
    {label: 'Units', fieldName: 'Quantity__c', type: 'number'},
    {label: 'Total', fieldName: '', type: 'currency'},
];

export default class OrderConfirmation extends LightningElement {
    @api cartProducts;
    columns = columns;

    handleBack(){
        const backEvent = new CustomEvent("back");
        this.dispatchEvent(backEvent);
    }
}