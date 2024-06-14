public without sharing class RazorpayController {
    public class MyWrapper {
        public String name { get; set; }
        public String email { get; set; }
        public String mobile { get; set; }
        public String address { get; set; }
        public String schoolName { get; set; }
        public String age { get; set; }
        public String gender { get; set; }
        public String parentName { get; set; }
        public Decimal amount { get; set; }
        public String totalAmount { get; set; }
    }
    
    @RemoteAction
    public static String createLead(String jsonData) {
        try {
            MyWrapper myArray = (MyWrapper) JSON.deserialize(jsonData, MyWrapper.class);
            List<Contact> ContactId = [SELECT Id,Registration_Id__c FROM Contact WHERE LastName LIKE : myArray.name AND Email =: myArray.email LIMIT 1];
            if(!ContactId.isEmpty() && ContactId.size()>0){
                return 'registered';
            }
            List<Lead> leadId = [SELECT Id,Registration_Id__c, Paid_Status__c FROM Lead WHERE LastName LIKE : myArray.name AND Email =: myArray.email AND IsConverted = false LIMIT 1];
            if(!leadId.isEmpty() && leadId.size()>0){
                return leadId[0].Registration_Id__c;
            }else{
                Lead newLead = new Lead();
                newLead.LastName = myArray.name;
                newLead.Company = myArray.schoolName;
                newLead.School_Name__c = myArray.schoolName;
                newLead.Email = myArray.email;
                newLead.DOB__c = myArray.age;
                newLead.Gender__c = myArray.gender;
                newLead.MobilePhone = myArray.mobile;
                newLead.parent_name__c = myArray.parentName;
                newLead.Amount__c = myArray.amount;
                newLead.Status = 'Initiated';
                newLead.City = myArray.address;
                newLead.RecordTypeId = '012dM0000014ZI4';
                insert newLead;
                Lead autoNumber = [SELECT Registration_Id__c FROM Lead WHERE Id =: newLead.Id];
                return autoNumber.Registration_Id__c;
            }
        } catch (Exception e) {
            return 'Error: ' + e.getMessage();
        }
    }
    @RemoteAction
    public static String updateLead(String leadId, String paymentId, String status) {
        Lead updateLead = [SELECT Id,Registration_Id__c, Status, Paid_Status__c, Description, Payment_Reference__c FROM Lead WHERE Registration_Id__c =: leadId LIMIT 1];
        updateLead.Payment_Reference__c = paymentId+' '+status;
        if(status == 'success'){
            updateLead.Paid_Status__c = true;
            updateLead.Status = 'Paid';
            update updateLead;
            convertLead(updateLead.Id);
        }else if(status == 'failed'){
            updateLead.Status = 'failed';
            update updateLead;
        }else if(status == 'canceled'){
            updateLead.Status = 'canceled';
            update updateLead;
        }
        return updateLead.Id;
    }
    @RemoteAction
    public static String getLead(String jsonData) {
        try {
            MyWrapper myArray = (MyWrapper) JSON.deserialize(jsonData, MyWrapper.class);
            List<Contact> ContactId = [SELECT Id,Registration_Id__c FROM Contact WHERE LastName LIKE : myArray.name AND Email =: myArray.email LIMIT 1];
            if(!ContactId.isEmpty() && ContactId.size()>0){
                return ContactId[0].Registration_Id__c;
            }
            return 'nolead';
        }catch (Exception e) {
            return 'Error: ' + e.getMessage();
        }
    }
    
    @RemoteAction
    public static String updateContact(String leadId, String paymentId, String status, Decimal amount) {
        Contact con = [SELECT Id,Registration_Id__c, Description FROM Contact WHERE Registration_Id__c =: leadId LIMIT 1];
        Invoice__c inv = new Invoice__c();
        inv.Amount__c = amount;
        inv.Payment_Reference__c = paymentId+' '+status;
        inv.Payment_Mode__c = 'UPI';
        inv.contact__c = con.Id;
        if(status == 'success'){
            inv.Paid_Status__c = 'Success';
        }else if(status == 'failed'){
            inv.Paid_Status__c = 'Failed';
        }else if(status == 'canceled'){
            inv.Paid_Status__c = 'Canceled';
        }
        insert inv;
        return inv.Id;
    }
    
    public static void convertLead(Id leadId) {
        Invoice__c inv = new Invoice__c();
        // Query the lead record
        Lead leadToConvert = [SELECT Id, Amount__c, Payment_Reference__c, Company FROM Lead WHERE Id = :leadId LIMIT 1];
        inv.Amount__c = leadToConvert.Amount__c;
        inv.Payment_Reference__c = leadToConvert.Payment_Reference__c;
        inv.Payment_Mode__c = 'UPI';
        inv.Paid_Status__c = 'Success';
        
        // Find the existing account by the company name of the lead
        Account existingAccount = [SELECT Id FROM Account WHERE Name = 'Sakthi' LIMIT 1];
        
        // Create a new LeadConvert object
        Database.LeadConvert leadConvert = new Database.LeadConvert();
        leadConvert.setLeadId(leadToConvert.Id);
        leadConvert.setAccountId(existingAccount.Id);
        leadConvert.setDoNotCreateOpportunity(true);
        
        // Optionally, set converted status if you have a specific status for converted leads
        LeadStatus convertStatus = [SELECT Id, MasterLabel FROM LeadStatus WHERE IsConverted = true LIMIT 1];
        leadConvert.setConvertedStatus(convertStatus.MasterLabel);
        
        // Perform the lead conversion
        Database.LeadConvertResult result = Database.convertLead(leadConvert);
        
        // Check the result
        if (result.isSuccess()) {
            Id contactId = result.getContactId();
            inv.contact__c = contactId;
            insert inv;
            System.debug('Lead converted successfully.');
        } else {
            System.debug('Lead conversion failed: ' + result.getErrors()[0].getMessage());
        }
    }
    @RemoteAction
    public static List<Contact> getContacts(String searchText) {
        String searchQuery = '%' + searchText + '%';
        return [SELECT Id, Name, Email, MobilePhone FROM Contact WHERE Name LIKE :searchQuery OR MobilePhone LIKE :searchQuery LIMIT 10];
    }
}