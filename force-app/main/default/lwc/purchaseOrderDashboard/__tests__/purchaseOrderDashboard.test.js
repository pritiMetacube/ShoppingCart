import { createElement } from 'lwc';
import PurchaseOrderDashboard from 'c/purchaseOrderDashboard';


describe('c-purchase-order-dashboard', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders lightning-datatable', () => {
        const element = createElement('c-purchase-order-dashboard', {
            is: PurchaseOrderDashboard
        });
        document.body.appendChild(element);

        expect(document.body.contains(element)).toBe(true);
    });
});
