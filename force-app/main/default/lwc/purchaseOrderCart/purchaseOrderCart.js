import { LightningElement, api } from 'lwc';

const columns =[
    {label: 'Name', fieldName: 'Name'},
    {label: 'Price', fieldName: 'Price__c', type:'currency'},
    {label: 'Product Code', fieldName: 'ProductCode', type: 'text'},
    {label: 'Units', fieldName: 'Quantity__c', type: 'number', editable: true},
    {
        label: 'Delete',
        type: 'button',
        typeAttributes: {
            iconName: 'utility:delete',
            name: 'delete', 
        }
    }
];

export default class PurchaseOrderCart extends LightningElement {
    showInvoiceSection = false;

    @api cartProducts;
    cartColumns = columns;
    saveDraftValues = [];

    handleCheckOutClick(){
        this.showInvoiceSection = true;
    }

    handleBackFromChild(){
        this.showInvoiceSection = false;
    }

    handleBack(){
        const backEvent = new CustomEvent("back");
        this.dispatchEvent(backEvent);
    }

    handleSave(event) {
        this.saveDraftValues = event.detail.draftValues;

        // REVISIT
        const saveEvent = new CustomEvent("save", {
            detail: { updatedRows: this.saveDraftValues }
        });
        this.dispatchEvent(saveEvent);

        this.saveDraftValues = [];
    }

    handleRowAction(event){
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if(actionName === "delete"){
            const deleteEvent = new CustomEvent("delete", {
                detail: {deletedRow: row }
            });
            this.dispatchEvent(deleteEvent);
        }        
    }
}