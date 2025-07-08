import { LightningElement, wire } from 'lwc';
import getPurchaseOrders from '@salesforce/apex/PurchaseOrderController.getPurchaseOrders';
import getTotalPurchaseOrderCount from '@salesforce/apex/PurchaseOrderController.getTotalPurchaseOrderCount';

const columns =[
    {label: 'PO Id', fieldName: 'Id', sortable: true},
    {label: 'Name', fieldName: 'Name', type:'text', sortable: true},
    {label: 'Status', fieldName: 'Status__c', type:'text', sortable: true},
    {label: 'Order Total', fieldName: 'Total_Amount__c', type: 'currency', sortable: true},
    {label: 'Order Date', fieldName: 'Order_Date__c', type: 'date', sortable: true},
];

export default class purchaseOrderDashboard extends LightningElement {
    purchaseOrderRequest = {
        pageNumber: 1,
        pageSize: 10,
        sortBy: 'Name',
        sortDirection: 'asc',
    };
    
    totalNumberOfPurchaseOrders = 0;
    showProductSection = false;

    purchaseOrdersData = [];
    columns = columns;

    @wire(getPurchaseOrders,{request: '$purchaseOrderRequest'})
    wiredPurchaseOrders({data, error}){
        if(data){
            this.purchaseOrdersData = data;
        }
        else if(error){
            console.error('Eror in fetching purchase orders ' + error);
        }
    }

    @wire(getTotalPurchaseOrderCount)
    wireTotalPurchaseOrderCount({ data, error }) {
        if (data) {
            this.totalNumberOfPurchaseOrders = data;
            console.log(`Total number of purchase orders: ${this.totalNumberOfPurchaseOrders}`);
        } else if (error) {
            console.error('Error in fetching total number of purchase orders' + error);
        }
    }

    handleSort(event) {
        const { fieldName, sortDirection } = event.detail;
        this.purchaseOrderRequest = {
            ...this.purchaseOrderRequest,
            sortBy: fieldName,
            sortDirection: sortDirection
        };
    }

    handleFirstPage(){
        this.purchaseOrderRequest = {
            ...this.purchaseOrderRequest,
            pageNumber: 1
        };
        console.log(`First pageNumber: ${this.purchaseOrderRequest.pageNumber}`);
    }

    handleLastPage(){
        const lastPageNumber = Math.ceil(this.totalNumberOfPurchaseOrders/this.purchaseOrderRequest.pageSize);
        this.purchaseOrderRequest = {
            ...this.purchaseOrderRequest,
            pageNumber: lastPageNumber
        };
        console.log(`Last pageNumber: ${this.purchaseOrderRequest.pageNumber}`);
    }

    handleNextPage(){
        this.purchaseOrderRequest = {
            ...this.purchaseOrderRequest,
            pageNumber: this.purchaseOrderRequest.pageNumber + 1
        };
        console.log(`Next pageNumber: ${this.purchaseOrderRequest.pageNumber}`);
    }

    handlePreviousPage(){
        this.purchaseOrderRequest = {
            ...this.purchaseOrderRequest,
            pageNumber: this.purchaseOrderRequest.pageNumber - 1
        };
        console.log(`Previous pageNumber: ${this.purchaseOrderRequest.pageNumber}`);
    }

    handleAddNewPOClick(){
        this.showProductSection = true;
    }

    handleBackFromChild(){
        this.showProductSection = false;
    }
}