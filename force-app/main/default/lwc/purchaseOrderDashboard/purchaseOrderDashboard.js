import { LightningElement } from 'lwc';
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

    connectedCallback(){
        this.fetchPurchaseOrders();
    }

    fetchPurchaseOrders(){
        getpurchaseOrders()
        .then(result => {
            if(result){
                this.purchaseOrdersData = result;
            }
        }).catch(error => {
            console.error('Eror in fetching purchase orders ' + error);
        });
    }

    handleAddNewPOClick(){
        this.showProductSection = true;
    }
}