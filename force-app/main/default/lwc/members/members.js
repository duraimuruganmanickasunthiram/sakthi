import { LightningElement, track } from 'lwc';
import sivuanna from '@salesforce/resourceUrl/sivuanna';
import sathishanna from '@salesforce/resourceUrl/sathishanna';
import rajanna from '@salesforce/resourceUrl/rajanna';
import anandannat from '@salesforce/resourceUrl/anandannat';
import durai from '@salesforce/resourceUrl/durai';
import kavinanna from '@salesforce/resourceUrl/kavinanna';
import person from '@salesforce/resourceUrl/person';


export default class Home extends LightningElement {
    @track teamMembers = [
        { id: 1, imageUrl: `${sivuanna}`, name: 'Sivakumar'},
        { id: 2, imageUrl: `${person}`, name: 'Anandakumar', linkedinUrl: 'https://www.linkedin.com/in/member7' },
        { id: 3, imageUrl: `${sathishanna}`, name: 'Sahtish', linkedinUrl: 'https://www.linkedin.com/in/member2' },
        { id: 4, imageUrl: `${person}`, name: 'Vinoth', linkedinUrl: 'https://www.linkedin.com/in/member9' },
        { id: 5, imageUrl: `${person}`, name: 'Jayakumar', linkedinUrl: 'https://www.linkedin.com/in/member8' },
        { id: 6, imageUrl: `${anandannat}`, name: 'Anand', linkedinUrl: 'https://www.linkedin.com/in/member4' },
        { id: 7, imageUrl: `${kavinanna}`, name: 'Kavin', linkedinUrl: 'https://www.linkedin.com/in/member5' },
        { id: 8, imageUrl: `${rajanna}`, name: 'Rajkumar', linkedinUrl: 'https://www.linkedin.com/in/member3' },
        { id: 9, imageUrl: `${durai}`, name: 'Duraimurugan', linkedinUrl: 'https://www.linkedin.com/in/member6' },
        { id: 10, imageUrl: `${person}`, name: 'Vinobalan', linkedinUrl: 'https://www.linkedin.com/in/member10' },
        { id: 11, imageUrl: `${person}`, name: 'Member 11', linkedinUrl: 'https://www.linkedin.com/in/member10' },
        { id: 12, imageUrl: `${person}`, name: 'Member 12', linkedinUrl: 'https://www.linkedin.com/in/member10' },
    ];

    handleItemClick(event) {
        const linkedinUrl = event.currentTarget.dataset.linkedinUrl;
        if(linkedinUrl != undefined){
        window.open(linkedinUrl, '_blank');
        }
    }
}