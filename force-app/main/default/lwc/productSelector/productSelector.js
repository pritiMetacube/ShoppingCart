import { LightningElement } from 'lwc';
import getproducts from '@salesforce/apex/ProductController.getproducts';

const columns =[
    {label: 'Name', fieldName: 'Name'},
    {label: 'Price', fieldName: 'Price__c', type:'currency'},
    {label: 'Product Code', fieldName: 'ProductCode', type: 'text'},
    {label: 'Available Units', fieldName: 'Quantity__c', type: 'number'},
];

export default class ProductSelector extends LightningElement {
    productsData = [];
    columns = columns;

    connectedCallback(){
        this.fetchProducts();
    }

    fetchProducts(){
            getproducts()
            .then(result => {
                if(result){
                    this.productsData = result;
                }
            }).catch(error => {
                console.error('Eror in fetching products' + error);
            });
        }
}