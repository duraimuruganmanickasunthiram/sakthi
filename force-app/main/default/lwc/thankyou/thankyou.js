import { LightningElement } from 'lwc';

export default class thankyou extends LightningElement {
    countdown = 6;

    connectedCallback() {
        this.startCountdown();
    }

    startCountdown() {
        const interval = setInterval(() => {
            this.countdown -= 1;
            if (this.countdown === 0) {
                clearInterval(interval);
                this.redirect();
            }
        }, 1000);
    }

    redirect() {
        // Change the URL to the desired redirection path
        window.location.href = 'https://sreesakthinarpanimandram-dev-ed.develop.my.site.com/sakthi/s'; // Replace with your desired URL
    }
}