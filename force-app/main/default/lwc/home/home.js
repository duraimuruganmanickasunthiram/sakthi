import { LightningElement, track } from 'lwc';
import mission from '@salesforce/resourceUrl/mission';
import activities from '@salesforce/resourceUrl/activities';
import events from '@salesforce/resourceUrl/events';
import team from '@salesforce/resourceUrl/team';
import aboutus from '@salesforce/resourceUrl/aboutus';
import media from '@salesforce/resourceUrl/media';

export default class Home extends LightningElement {
    @track items = [
        { id: 1, imageUrl: mission, title: 'Mission' },
        { id: 2, imageUrl: activities, title: 'Activities' },
        { id: 3, imageUrl: events, title: 'Events' },
        { id: 4, imageUrl: team, title: 'Our Team' },
        { id: 5, imageUrl: media, title: 'Media' },
        { id: 6, imageUrl: aboutus, title: 'About us' },
    ];
    @track showModal = false;
    @track showEventModal = false;

    handleItemClick(event) {
        const itemId = event.currentTarget.dataset.itemId;

        if (itemId == 1) {
            this.showModal = true;
        } else if (itemId == 2) {
            window.location.href = '/sakthi/s/activities';
        } else if (itemId == 3) {
            this.showEventModal = true;
        } else if (itemId == 4) {
            window.location.href = '/sakthi/s/our-team';
        } else if (itemId == 5) {
            window.location.href = '/sakthi/s/gallery';
        } else if (itemId == 6) {
            window.location.href = '/sakthi/s/about-us';
        }
    }

    handleModalClose() {
        this.showModal = false;
        this.showEventModal = false;
    }
    handlerazClick(){
 window.location.href = '/sakthi/s/supportsakthi';
}
}