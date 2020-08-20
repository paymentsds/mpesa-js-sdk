import { Client } from '../src/client.js'
import chai from 'chai'
import sinon from 'sinon'
import dotenv from 'dotenv'

dotenv.config();

const expect = chai.expect;

const client = new Client({
    apiKey: process.env.API_KEY,                                // API Key
    publicKey: process.env.PUBLIC_KEY,                          // Public Key
    serviceProviderCode: process.env.SERVICE_PROVIDER_CODE      // input_ServiceProviderCode
 });

 const clientRevert = new Client({
    apiKey: process.env.API_KEY,                                // API Key
    publicKey: process.env.PUBLIC_KEY,                          // Public Key
    serviceProviderCode: process.env.SERVICE_PROVIDER_CODE,     // input_ServiceProviderCode,
    initiatorIdentifier: process.env.INITIATOR_IDENTIFIER,      // input_InitiatorIdentifier,
    securityCredential: process.env.SECURITY_CREDENTIAL         // input_SecurityCredential
 });
 
const paymentDataReceive = {
   from: process.env.PHONE_NUMBER,                              // input_CustomerMSISDN
   reference: '11114' +  Math.floor(Math.random()*100),         // input_ThirdPartyReference
   transaction: 'T12344CC',                                     // input_TransactionReference
   amount: '10'                                                 // input_Amount
};

const paymentDataSend = {
    to: process.env.PHONE_NUMBER,                               // input_CustomerMSISDN
    reference: '11114' + Math.floor(Math.random()*100),         // input_ThirdPartyReference
    transaction: 'T12344CC',                                    // input_TransactionReference
    amount: '10'                                                // input_Amount
};

const reversionData = {
    reference: '11114' + Math.floor(Math.random()*100),         // input_ThirdPartyReference
    transaction: 'T12344CC',                                    // input_TransactionID
    amount: '10'                                                // input_ReversalAmount
 };

 const paymentDataBusiness = {
    to: '979797',                                               // input_ReceiverPartyCode
    reference: '11114' + Math.floor(Math.random()*100),         // input_ThirdPartyReference
    transaction: 'T12344CC',                                    // input_TransactionReference
    amount: '10'                                                // input_Amount
 };

describe("Receive Money from a Mobile Account", function(){
    this.timeout(30000);
    it("Receive Money successful", function(done){
        client.receive(paymentDataReceive).then(r => {
            expect(r.response.status).to.be.within(200, 201);
            done();
         }).catch(e =>{
             done(new Error("test case failed: " + e.response.status));
         });
    });
});

describe("Send Money to a Mobile Account", function(){
    this.timeout(30000);
    it("Send Money successful", function(done){
        client.send(paymentDataSend).then(r => {
            expect(r.response.status).to.be.within(200, 201);
            done();
         }).catch(e =>{
            done(new Error("test case failed: " + e.response.outputError));
         });
    });
});


describe("Send Money to a Business Account ", function(done){
    this.timeout(30000);
    it("Send Money successful", function(done){
        client.send(paymentDataBusiness).then(r => {
            expect(r.response.status).to.be.within(200, 201);
            done();
        }).catch(e =>{
            done(new Error("test case failed: " + e.response.outputError));
        });
    });
});

describe("Revert a Transaction ", function(){
    it("Revert a Transaction successful", function(done){
        clientRevert.revert(reversionData).then(function(r) {
            expect(r.response.status).to.be.within(200, 201);
            done();
         }).catch(function(e) {
            done(new Error("test case failed: " + e.response.outputError));
         });
    });
});
