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

    handleBack(){
        const backEvent = new CustomEvent("back");
        this.dispatchEvent(backEvent);
    }

    handlePlaceOrderClick() {
        console.log("button clicked");
        cartProducts.forEach((item, index) => {
            console.log(`Item ${index}: Id=${item.Id} (${typeof item.Id}), Quantity=${item.Quantity__c} (${typeof item.Quantity__c})`);
        });
        /*try {
        
            const poId = await createPurchaseOrder();
            console.log(`PO: ${poId}`);
            await addPurchaseOrderLineItems(poId, cartProducts);
            console.log("PO Line items added");
            await updateProducts(cartProducts);
            console.log("Products updated");

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Confirmation',
                    message: `Your order is placed successfully with Id: ${poId}`,
                    variant: 'success'
                })
            );
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
            */
    }
}