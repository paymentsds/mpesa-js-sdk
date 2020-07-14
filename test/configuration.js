import assert from 'assert'
import { Configuration } from '../src/configuration.js'

describe('Configuration', function () {
  describe('#toURL()', function () {
    const config = new Configuration({
      apiKey: '123456789',
      publicKey: '123456789',
      origin: '*',
      userAgent: 'MPesa',
      host: 'api.mpesa.vm.co.mz'
    })

    it('should auto-complete scheme', function () {
      assert.equal(config.environment.toURL(), 'https://api.mpesa.vm.co.mz')
    })
  })
})
