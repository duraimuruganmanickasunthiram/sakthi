import { LightningElement, track } from 'lwc';
import myResource from '@salesforce/resourceUrl/mission';

export default class Gallery extends LightningElement {
    @track images = [
        { id: 1, url: 'https://i.ibb.co/gdq1H0h/20231015-182856.jpg', title: 'Image 1' },
        { id: 2, url: 'https://i.ibb.co/P9CGqms/IMG-20231019-180030.jpg', title: 'Image 2' },
        { id: 3, url: 'https://i.ibb.co/5MwLzzV/IMG-20240326-WA0032.jpg', title: 'Image 3' },
        { id: 4, url: 'https://i.ibb.co/BGRhNfN/IMG-20240326-WA0026-1.jpg', title: 'Image 4' },
        { id: 5, url: 'https://i.ibb.co/VvYGrnT/20231017-171411.jpg', title: 'Image 5' },
        { id: 6, url: 'https://i.ibb.co/Qv1sQ09/20231017-173756-1.jpg', title: 'Image 6' },
        { id: 7, url: 'https://i.ibb.co/85SyL4g/IMG-3754.jpg', title: 'Image 7' },
        { id: 8, url: 'https://i.ibb.co/LDwxCqG/IMG-3749-1.jpg', title: 'Image 8' },
        { id: 9, url: 'https://i.ibb.co/k3n7Nwm/IMG-3703.jpg', title: 'Image 9' },
        { id: 10, url: 'https://i.ibb.co/YTJnhkC/IMG-3693.jpg', title: 'Image 10' },
        { id: 11, url: 'https://i.ibb.co/1R5rDTL/20231207-230437.jpg', title: 'Image 11' },
        { id: 12, url: 'https://i.ibb.co/7YbqF0V/20231207-230042.jpg', title: 'Image 12' }
    ];

    @track isModalOpen = false;
    @track selectedImageUrl = '';

    handleImageClick(event) {
        const imageId = event.currentTarget.dataset.id;
        const selectedImage = this.images.find(image => image.id == imageId);
        this.selectedImageUrl = selectedImage.url;
        this.isModalOpen = true;
    }

    handleModalClose() {
        this.isModalOpen = false;
        this.selectedImageUrl = '';
    }
}