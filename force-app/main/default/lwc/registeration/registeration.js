import { LightningElement } from 'lwc';
export default class Registeration extends LightningElement {
showNewRegistrationForm() {
        window.location.href = '/sakthi/s/new-registration';
    }

    showRegisteredUserForm() {
        window.location.href = '/sakthi/s/registered';
    }
}