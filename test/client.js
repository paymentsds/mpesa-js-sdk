import { Client } from '../src/client.js'
import chai from 'chai'
import sinon from 'sinon'

const expect = chai.expect;

const client = new Client({
    apiKey: '<REPLACE>',             // API Key
    publicKey: '<REPLACE>',          // Public Key
    serviceProviderCode: '<REPLACE>' // input_ServiceProviderCode
 });

 const clientRevert = new Client({
    apiKey: '<REPLACE>',              // API Key
    publicKey: '<REPLACE>',           // Public Key
    serviceProviderCode: '<REPLACE>', // input_ServiceProviderCode,
    initiatorIdentifier: '<REPLACE>', // input_InitiatorIdentifier,
    securityIdentifier: '<REPLACE>'   // input_SecurityCredential
 });
 
const paymentDataReceive = {
   from: '258850669801',                                                    // input_CustomerMSISDN
   reference: '11114' +  Math.floor(Math.random()*100),                     // input_ThirdPartyReference
   transation: 'T12344CC',                                                  // input_TransactionReference
   amount: '10'                                                             // input_Amount
};

const paymentDataSend = {
    to: "258850669801",                                                     // input_CustomerMSISDN
    reference: '11114' + Math.floor(Math.random()*100),                     // input_ThirdPartyReference
    transation: 'T12344CC',                                                 // input_TransactionReference
    amount: '10'                                                            // input_Amount
};

const reversionData = {
    reference: '11114' + Math.floor(Math.random()*100),                     // input_ThirdPartyReference
    transation: 'T12344CC',                                                 // input_TransactionID
    amount: '10'                                                            // input_ReversalAmount
 };

 const paymentDataBusiness = {
    to: '979797',                                                           // input_ReceiverPartyCode
    reference: '11114' + Math.floor(Math.random()*100),                     // input_ThirdPartyReference
    transation: 'T12344CC',                                                 // input_TransactionReference
    amount: '10'                                                            // input_Amount
 };

describe("Receive Money from a Mobile Account", function(){
    it("Receive Money successful", function(done){
        client.receive(paymentDataReceive).then(r => {
            expect(r.response.status).to.be.within(200, 201);
            done();
         }).catch(e =>{
             done(new Error("test case failed: " + e));
         });
    });
});

describe("Send Money to a Mobile Account", function(){
    it("Send Money successful", function(done){
        client.send(paymentDataSend).then(r => {
            expect(r.response.status).to.be.within(200, 201);
            done();
         }).catch(e =>{
            done(new Error("test case failed: " + e));
         });
    });
});

describe("Send Money to a Mobile Account", function(){
    it("Send Money successful", function(done){
        client.send(paymentDataSend).then(r => {
            expect(r.response.status).to.be.within(200, 201);
            done();
         }).catch(e =>{
            done(new Error("test case failed: " + e));
         });
    });
});

describe("Send Money to a Business Account ", function(done){
    it("Send Money successful", function(done){
        client.send(paymentDataBusiness).then(r => {
            expect(r.response.status).to.be.within(200, 201);
            done();
        }).catch(e =>{
            done(new Error("test case failed: " + e));
        });
    });
});

describe("Revert a Transaction ", function(){
    it("Revert a Transaction successful", function(done){
        clientRevert.revert(reversionData).then(function(r) {
            expect(r.response.status).to.be.within(200, 201);
            done();
         }).catch(function(e) {
            done(new Error("test case failed: " + e));
         });
    });
});
