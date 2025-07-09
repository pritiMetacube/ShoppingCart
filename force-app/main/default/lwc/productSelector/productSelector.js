import { LightningElement, wire } from 'lwc';
import getProducts from '@salesforce/apex/ProductController.getProducts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getTotalProductCount from '@salesforce/apex/ProductController.getTotalProductCount';

const columns = [
    { label: 'Name', fieldName: 'Name', sortable:true },
    { label: 'Price', fieldName: 'Price__c', type: 'currency', sortable:true },
    { label: 'Product Code', fieldName: 'ProductCode', type: 'text', sortable:true },
    { label: 'Available Units', fieldName: 'Quantity__c', type: 'number', sortable:true },
];

export default class ProductSelector extends LightningElement {
    productRequest = {
        pageNumber: 1,
        pageSize: 10,
        sortBy: 'Name',
        sortDirection: 'asc',
    };
    totalNumberOfProducts = 0;
    productsData = [];
    columns = columns;
    searchKey = '';
    filteredData = [];
    debounceTimeout;
    showCartSection = false;
    cartProducts = [];

    @wire(getProducts, {request: '$productRequest'})
    wiredProducts({data, error}){
        if(data){
            this.productsData = data;
            this.filteredData = [...data];
        }else if(error){
            console.error('Eror in fetching products' + error);
        }
    }

    @wire(getTotalProductCount)
    wireTotalProductCount({data,error}) {
        if(data) {
            this.totalNumberOfProducts = data;
            console.log(`Total number of products: ${this.totalNumberOfProducts}`);
        } else if(error){
            console.error('Error in fetching total number of products' + error);
        }
    }

    handleSort(event) {
        const { fieldName, sortDirection } = event.detail;
        this.productRequest = {
            ...this.productRequest,
            sortBy: fieldName,
            sortDirection: sortDirection
        };
    }

    handleFirstPage(){
        this.productRequest = {
            ...this.productRequest,
            pageNumber: 1
        };
        console.log(`First pageNumber: ${this.productRequest.pageNumber}`);
    }

    handleLastPage(){
        const lastPageNumber = Math.ceil(this.totalNumberOfProducts/this.productRequest.pageSize);
        this.productRequest = {
            ...this.productRequest,
            pageNumber: lastPageNumber
        };
        console.log(`Last pageNumber: ${this.productRequest.pageNumber}`);
    }

    handleNextPage(){
        this.productRequest = {
            ...this.productRequest,
            pageNumber: this.productRequest.pageNumber + 1
        };
        console.log(`Next pageNumber: ${this.productRequest.pageNumber}`);
    }

    handlePreviousPage(){
        this.productRequest = {
            ...this.productRequest,
            pageNumber: this.productRequest.pageNumber - 1
        };
        console.log(`Previous pageNumber: ${this.productRequest.pageNumber}`);
    }
    
    handleProductSearch(event) {
        this.searchKey = event.target.value.trim().toLowerCase();
        clearTimeout(this.debounceTimeout);
        if (this.searchKey) {
            this.filteredData = this.productsData.filter(row =>
                row.Name?.toLowerCase().includes(this.searchKey)
            );
        } else {
            this.filteredData = [...this.productsData];
        }
    }

    handleAddToCartClick() {
        const selectedRecords = this.template.querySelector('lightning-datatable').getSelectedRows();
        if (selectedRecords.length === 0) return;

        const unavailable = selectedRecords.filter(row => !row.Quantity__c || row.Quantity__c <= 0);
        const validRecords = selectedRecords.filter(row => row.Quantity__c > 0);

        if (unavailable.length > 0) {
            const toastEvent = new ShowToastEvent({
                title: 'Some products are unavailable',
                message: 'One or more selected products are out of stock and were skipped.',
                variant: 'warning'

            });
            this.dispatchEvent(toastEvent);
        }

        validRecords.forEach(row => {
            const existingCartItem = this.cartProducts.find(item => item.Id === row.Id);

            if (existingCartItem) {
                existingCartItem.Quantity__c += 1;
                existingCartItem.TotalPrice = existingCartItem.Quantity__c * existingCartItem.Price__c;
            } else {
                this.cartProducts.push({ ...row, Quantity__c: 1, TotalPrice: row.Price__c });
            }

            this.filteredData = this.filteredData.map(item => {
                if (item.Id === row.Id && item.Quantity__c > 0) {
                    return { ...item, Quantity__c: item.Quantity__c - 1 };
                }
                return item;
            });

            this.productsData = this.productsData.map(item => {
                if (item.Id === row.Id && item.Quantity__c > 0) {
                    return { ...item, Quantity__c: item.Quantity__c - 1 };
                }
                return item;
            });
        });

        if (validRecords.length > 0 && unavailable.length === 0) {
            const toastEvent = new ShowToastEvent({
                title: 'Success!',
                message: 'Products added successfully to the cart',
                variant: 'success'
            });
            this.dispatchEvent(toastEvent);
        }       
    }

    handleGoToCartClick() {
        if (this.cartProducts.length === 0) {
            const toastEvent = new ShowToastEvent({
                title: 'Your cart is empty',
                message: 'Please add products before proceeding to the cart.',
                variant: 'info'
            });
            this.dispatchEvent(toastEvent);
        } else {
            this.showCartSection = true;
        }
    }

    handleBackFromChild() {
        this.showCartSection = false;
    }

    handleBack() {
        const backEvent = new CustomEvent("back");
        this.dispatchEvent(backEvent);
    }

    handleSaveFromChild(event){
        const updatedRows = event.detail.updatedRows;

        updatedRows.forEach(updated => {
            const existingProduct = this.productsData.find(item => item.Id === updated.Id);
            const existingCartProduct = this.cartProducts.find(item => item.Id === updated.Id);

            const unitsRequired = updated.Quantity__c - existingCartProduct.Quantity__c;

            if(updated.Quantity__c > 0 && existingProduct && existingProduct.Quantity__c >= unitsRequired)
            {
                this.cartProducts = this.cartProducts.map(item => {
                    if(item.Id === updated.Id){
                        return {...item, Quantity__c: updated.Quantity__c};
                    }
                    return item;
                });

                this.productsData = this.productsData.map(item => {
                    if(item.Id === updated.Id){
                        return {...item, Quantity__c: item.Quantity__c - unitsRequired};
                    }
                    return item;
                });

                this.filteredData = this.filteredData.map(item => {
                    if(item.Id === updated.Id){
                        return {...item, Quantity__c: item.Quantity__c - unitsRequired};
                    }
                    return item;
                });
            }
        });

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Updated',
                message: 'Records Updated Successfully',
                variant: 'success'
            })
        );
    }

    handleDeleteFromChild(event) {
        const deletedRow = event.detail.deletedRow;

        this.cartProducts = this.cartProducts.filter(item => item.Id !== deletedRow.Id);

        this.productsData = this.productsData.map(item => {
            if (item.Id === deletedRow.Id) {
                return { ...item, Quantity__c: item.Quantity__c + deletedRow.Quantity__c };
            }
            return item;
        });

        this.filteredData = this.filteredData.map(item => {
            if (item.Id === deletedRow.Id) {
                return { ...item, Quantity__c: item.Quantity__c + deletedRow.Quantity__c };
            }
            return item;
        });

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Deleted',
                message: 'Record Deleted Successfully',
                variant: 'success'
            })
        );
    }
}