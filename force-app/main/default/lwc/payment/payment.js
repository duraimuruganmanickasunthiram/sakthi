import { LightningElement } from 'lwc';

export default class RazorpayCheckout extends LightningElement {
    razorpayLoaded = false;

    connectedCallback() {
        this.loadRazorpayScript();
    }

    loadRazorpayScript() {
        if (!this.razorpayLoaded) {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                this.razorpayLoaded = true;
                console.log('Razorpay script loaded');
            };
            script.onerror = () => {
                console.error('Razorpay script could not be loaded');
            };
            this.template.appendChild(script);
        }
    }

    handleClick() {
        if (this.razorpayLoaded) {
            const options = {
                "key": "rzp_live_vtZrAdXznmyD96", // Enter the Key ID generated from the Dashboard
                "amount": "1000",
                "currency": "INR",
                "description": "Acme Corp",
                "image": "example.com/image/rzp.jpg",
                "prefill": {
                    "email": "gaurav.kumar@example.com",
                    "contact": "+919900000000"
                },
                config: {
                    display: {
                        blocks: {
                            utib: { //name for Axis block
                                name: "Pay using Axis Bank",
                                instruments: [
                                    {
                                        method: "card",
                                        issuers: ["UTIB"]
                                    },
                                    {
                                        method: "netbanking",
                                        banks: ["UTIB"]
                                    }
                                ]
                            },
                            other: { //  name for other block
                                name: "Other Payment modes",
                                instruments: [
                                    {
                                        method: "card",
                                        issuers: ["ICIC"]
                                    },
                                    {
                                        method: 'netbanking'
                                    },
                                    {
                                        method: "upi" // Added UPI method
                                    }
                                ]
                            }
                        },
                        hide: [], // No methods are hidden now
                        sequence: ["block.utib", "block.other"],
                        preferences: {
                            show_default_blocks: false // Should Checkout show its default blocks?
                        }
                    }
                },
                "handler": response => {
                    console.log('Payment successful', response);
                    alert('Payment successful. Payment ID: ' + response.razorpay_payment_id);
                },
                "modal": {
                    "ondismiss": () => {
                        if (confirm("Are you sure, you want to close the form?")) {
                            console.log("Checkout form closed by the user");
                        } else {
                            console.log("Complete the Payment");
                        }
                    }
                }
            };

            const rzp1 = new Razorpay(options);

            // Adding event listener for payment failures
            rzp1.on('payment.failed', response => {
                console.log('Payment failed', response.error);
                alert('Payment failed. Error: ' + response.error.description);
            });

            rzp1.open();
        } else {
            console.error('Razorpay script not loaded yet.');
        }
    }
}