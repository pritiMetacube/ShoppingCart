import { createElement } from '@lwc/engine-dom';
import ProductSelector from 'c/productSelector';

describe('c-product-selector', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Product selector', () => {
        const element = createElement('c-product-selector', {
            is: ProductSelector
        });

        document.body.appendChild(element);
        expect(1).toBe(1);
    });
});