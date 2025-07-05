import { LightningElement ,api} from 'lwc';
import createPurchaseOrder from '@salesforce/apex/PurchaseOrderController.createPurchaseOrder';
import addPurchaseOrderLineItems from '@salesforce/apex/PurchaseOrderLineItemController.addPurchaseOrderLineItems';
import updateProducts from '@salesforce/apex/ProductController.updateProducts';

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
    invoiceNumber = Math.floor(Math.random()*1000000);
    orderDate = new Date().toLocaleDateString(); 

    handleBack(){
        const backEvent = new CustomEvent("back");
        this.dispatchEvent(backEvent);
    }

    async handlePlaceOrderClick() {
        try {
            const poId = await createPurchaseOrder();
            console.log(`PO: ${poId} type: (${typeof poId})`);

            console.log(JSON.stringify(this.cartProducts));

            const lightweightCart = this.cartProducts.map(p => ({
                Id: p.Id,
                quantity: p.Quantity__c
            }));
            await addPurchaseOrderLineItems(poId, lightweightCart);
            console.log("PO Line items added");
            await updateProducts(lightweightCart);
            console.log("Products updated");

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Confirmation',
                    message: `Your order is placed successfully with Id: ${poId}`,
                    variant: 'success'
                })
            );
        } catch (error) {
            console.error(JSON.stringify(error));
        }
    }
}