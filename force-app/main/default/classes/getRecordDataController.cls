public without sharing class getRecordDataController {
 
 @AuraEnabled(cacheable=true)
  public static List<Lead> getAccounts() {
  return [SELECT Id, Name, Phone FROM Lead];
  }
}