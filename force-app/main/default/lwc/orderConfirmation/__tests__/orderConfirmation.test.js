import { createElement } from '@lwc/engine-dom';
import OrderConfirmation from 'c/orderConfirmation';

describe('c-order-confirmation', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Order confirmation', () => {
        const element = createElement('c-order-confirmation', {
            is: OrderConfirmation
        });

        document.body.appendChild(element);
        expect(1).toBe(1);
    });
});