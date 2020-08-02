import assert from 'assert'
import { Service } from '../src/index.js'

describe('Service', function () {
  const service = new Service();

  describe('#handleSend', function () {})
  describe('#handleReceive', function () {})
  describe('#handleRevert', function () {})
  describe('#handleQuery', function () {})
  describe('#normalizePhoneNumber', function() {
    
    const phoneNumber1 = '841234567';
    const phoneNumber2 = '00258841234567';
    const phoneNumber3 = '+258841234567';
    const phoneNumber4 = '0258841234567';
    
    it('Should append `258` prefix to phone number', function() {
      assert.equal('258841234567', service.normalizePhoneNumber(phoneNumber1));
    });

    it('Should remove `00` prefix to phone number', function() {
      assert.equal('258841234567', service.normalizePhoneNumber(phoneNumber2));
    });

    it('Should remove `+` prefix to phone number', function() {
      assert.equal('258841234567', service.normalizePhoneNumber(phoneNumber3));
    });

    it('Should remove `0` prefix to phone number', function() {
      assert.equal('258841234567', service.normalizePhoneNumber(phoneNumber4));
    });
  })
})
