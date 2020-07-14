import assert from 'assert'
import { Environment } from '../src/index.js'

describe('Environment', function () {
  describe('#fromURL()', function () {
    it('should parse url without error', function () {
      const environment = Environment.fromURL('example.com')
      assert.equal(environment.scheme, 'https')
      assert.equal(environment.domain, 'example.com')
    })
  })
  describe('#toURL()', function () {
    it('should complete scheme', function () {
      const environment = Environment.fromURL('example.com')
      assert.equal(environment.toURL(), 'https://example.com')
    })
  })
})
