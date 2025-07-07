import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createPurchaseOrder from '@salesforce/apex/PurchaseOrderController.createPurchaseOrder';
import addPurchaseOrderLineItems from '@salesforce/apex/PurchaseOrderLineItemController.addPurchaseOrderLineItems';
import updateProducts from '@salesforce/apex/ProductController.updateProducts';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Price', fieldName: 'Price__c', type: 'currency' },
    { label: 'Product Code', fieldName: 'ProductCode', type: 'text' },
    { label: 'Units', fieldName: 'Quantity__c', type: 'number' },
    { label: 'Total', fieldName: '', type: 'currency' },
];

export default class OrderConfirmation extends LightningElement {
    @api cartProducts;
    columns = columns;
    invoiceNumber = Math.floor(Math.random() * 1000000);
    orderDate = new Date().toLocaleDateString();
    poId = '';

    handleBack() {
        const backEvent = new CustomEvent("back");
        this.dispatchEvent(backEvent);
    }

    handlePlaceOrderClick() {
        createPurchaseOrder()
            .then((poId) => {
                console.log(`Purchase Order Id: ${poId} type: (${typeof poId})`);

                console.log(JSON.stringify(this.cartProducts));
                return addPurchaseOrderLineItems({ poId: poId, cartProducts: this.cartProducts });
            })
            .then(() => {
                console.log("Purchase Order Line items added successfully.");

                return updateProducts({ cartProducts: this.cartProducts });
            })
            .then(() => {
                console.log("Products quantity updated successfully.");
                this.cartProducts = [];

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Confirmation',
                        message: 'Your order is placed successfully.',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                console.error('Error occurred:', JSON.stringify(error));
            });        
    }
}