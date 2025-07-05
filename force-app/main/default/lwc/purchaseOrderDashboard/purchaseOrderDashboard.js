import { LightningElement, wire } from 'lwc';
import getpurchaseOrders from '@salesforce/apex/PurchaseOrderController.getpurchaseOrders';

const columns =[
    {label: 'PO Id', fieldName: 'Id'},
    {label: 'Name', fieldName: 'Name', type:'text'},
    {label: 'Status', fieldName: 'Status__c', type:'text'},
    {label: 'Order Total', fieldName: 'Total_Amount__c', type: 'currency'},
    {label: 'Order Date', fieldName: 'Order_Date__c', type: 'date'},
];

export default class purchaseOrderDashboard extends LightningElement {
    showProductSection = false;

    purchaseOrdersData = [];
    columns = columns;

    @wire(getpurchaseOrders)
    wiredPurchaseOrders({data, error}){
        if(data){
            this.purchaseOrdersData = data;
        }
        else if(error){
            console.error('Eror in fetching purchase orders ' + error);
        }
    }

    handleAddNewPOClick(){
        this.showProductSection = true;
    }

    handleBackFromChild(){
        this.showProductSection = false;
    }
}