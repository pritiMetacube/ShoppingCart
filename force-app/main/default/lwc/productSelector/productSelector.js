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
    searchKey = '';
    filteredData = [];
    debounceTimeout;
    showCartSection = false;
    selectedProducts;

    cartProducts = [];

    connectedCallback(){
        this.fetchProducts();
    }

    fetchProducts(){
        getproducts()
        .then(result => {
            if(result){
                this.productsData = result;
                this.filteredData = [...result]
            }
        }).catch(error => {
            console.error('Eror in fetching products' + error);
        });
    }

    handleProductSearch(event){
        this.searchKey = event.target.value.trim().toLowerCase();
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
            if(this.searchKey) {
                this.filteredData = this.productsData.filter(row =>
                    row.Name?.toLowerCase().includes(this.searchKey)
                );
            }else{
                this.filteredData = [...this.productsData];
            }
        }, 300);
    }

    handleAddToCartClick(){
        const selectedRecords = this.template.querySelector('lightning-datatable').getSelectedRows();
        if(!selectedRecords.length) return;

        /*
        this.cartProducts = selectedRecords.map(row => ({
            ...row,
            Quantity__c: 1
        }));
        */
        for (let index = 0; index < selectedRecords.length; index++) {
            const row = selectedRecords[index];
            this.cartProducts.push({
                ...row,
                Quantity__c: 1
            });
        }
    }

    handleGoToCartClick(){
        this.showCartSection = true;
    }
}