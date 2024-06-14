import { LightningElement, track } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import fontAwesome from '@salesforce/resourceUrl/fontAwesome';

export default class Footer extends LightningElement {
    @track showModal = false;

    showtc(){
        this.showModal = true;
    }
    handleModalClose(){
        this.showModal = false;
    }
}