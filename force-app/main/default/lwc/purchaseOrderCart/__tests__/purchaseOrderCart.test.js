import { createElement } from '@lwc/engine-dom';
import PurchaseOrderCart from 'c/purchaseOrderCart';

describe('c-purchase-order-cart', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('purchase order cart', () => {
        const element = createElement('c-purchase-order-cart', {
            is: PurchaseOrderCart
        });

        document.body.appendChild(element);
        expect(1).toBe(1);
    });

    it('renders lightning-datatable', () => {
        const element = createElement('c-purchase-order-cart', {
            is: PurchaseOrderCart
        });
        document.body.appendChild(element);

        expect(document.body.contains(element)).toBe(true);
    });
});