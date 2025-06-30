import { LightningElement, track } from 'lwc';
import getpurchaseOrders from '@salesforce/apex/PurchaseOrderController.getpurchaseOrders';

const columns =[
    {label: 'PO Id', fieldName: 'Id'},
    {label: 'Status', fieldName: 'Status__c', type:'type'},
    {label: 'Order Total', fieldName: 'Total_Amount__c', type: 'currency'},
];

export default class PurchaseOrdersView extends LightningElement {
    @track showProductSection = false;

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