import axios from 'axios'

import { Configuration } from './configuration.js'
import { Errors } from './error.js'
import { PaymentDirection } from './payment-direction.js'

export class Client {
  constructor (args) {
    this.configuration = new Configuration({})

    if (args !== null && args !== undefined) {
      this.initializeConfiguration(args)
    }

    this.initializeHttpClient()
  }

  initializeHttpClient () {
    if (this.configuration.isValid()) {
      const headers = this.configuration.generateHeaders()
      this.httpClient = axios.create({
        timeout: this.configuration.timeout,
        headers: headers
      })
    }
  }

  configure (args) {
    this.initializeConfiguration(args)
    this.initializeHttpClient()
    return this
  }

  initializeConfiguration (args) {
    for (const key of Configuration.defaultProperties) {
      if (Object.prototype.hasOwnProperty.call(args, key)) {
        this.configuration[key] = args[key]
      }
    }
  }

  handlePayment (data, direction) {
    const requiredProperties = ['reference', 'amount', 'mode']

    const optionalProperties = []
    let defaultOptional

    if (direction === PaymentDirection.OUTGOING) {
      defaultOptional = 'from'
      requiredProperties.push('to')
      optionalProperties.push(defaultOptional)
    } else {
      defaultOptional = 'to'
      requiredProperties.push('from')
      optionalProperties.push(defaultOptional)
    }

    const hasProperties = requiredProperties.filter((e) => {
      return Object.keys(data).includes(e)
    })

    const hasOptionalProperties = optionalProperties.filter((e) => {
      return Object.keys(data).includes(e)
    })

    if (hasProperties.length === requiredProperties.length) {
      if (!hasOptionalProperties.includes(defaultOptional)) {
        if (this.configuration.serviceProviderCode !== undefined) {
          data[defaultOptional] = this.configuration.serviceProviderCode
          return data
        } else {
          return Promise.reject(Errors.INVALID_MODE)
        }
      }

      return data
    } else {
      return Promise.reject(Errors.INVALID_CONFIGURATION)
    }
  }

  send (data) {
    if (this.configuration.isValid()) {
      if (Object.prototype.hasOwnProperty.call(data, 'mode')) {
        const enrichedData = this.handlePayment(
          data,
          PaymentDirection.OUTGOING
        )
        if (data.mode === 'b2b') {
          return this.handleRequest(
            this.configuration.defaultOperations.B2C_PAYMENT,
            enrichedData
          )
        }

        if (data.mode === 'b2c') {
          return this.handleRequest(
            this.configuration.defaultOperations.B2B_PAYMENT,
            enrichedData
          )
        }

        return Promise.reject(Errors.INVALID_MODE)
      }

      return Promise.reject(Errors.INVALID_MODE)
    }

    return Promise.reject(Errors.INVALID_CONFIGURATION)
  }

  receive (data) {
    const enrichedData = this.handlePayment(data, PaymentDirection.INCOMING)

    if (this.configuration.isValid()) {
      return this.handleRequest(
        this.configuration.defaultOperations.C2B_PAYMENT,
        enrichedData
      )
    }

    return Promise.reject(Errors.INVALID_CONFIURATION)
  }

  revert (data) {
    if (this.configuration.isValid()) {
      return this.handleRequest(this.configuration.defaultOperations.REVERSAL, data)
    }

    return Promise.reject(Errors.INVALID_CONFIURATION)
  }

  query (data) {
    if (this.configuration.isValid()) {
      return this.handleRequest(
        this.configuration.defaultOperations.QUERY_TRANSACTION_STATUS,
        data
      )
    }

    return Promise.reject(Errors.INVALID_CONFIURATION)
  }

  refund (data) {
    return this.revert(data)
  }

  handleResponse (r) {
    const data = this.parseResponse(r)

    if (r.status === 200 || r.status === 201) {
      const result = this.parseResponse(data)

      return Promise.resolve(result)
    } else {
      const error = this.handleUnsuccessfulError(data)

      return Promise.reject(error)
    }
  }

  parseResponse (r) {
    const output = {}

    const mapping = {
      conversation: 'output_ConversationID',
      transaction: 'output_TransactionID',
      description: 'output_ResponseDesc',
      code: 'output_ResponseCode',
      reference: 'output_ThirdPartyReference',
      status: 'output_ResponseTransactionStatus'
    }

    for (const key in mapping) {
      if (Object.prototype.hasOwnProperty.call(r.data, mapping[key])) {
        if (key === 'responseDesc') {
          if (output.response === undefined) output.response = {}
          output.response[key] = r.data[mapping[key]]
        }
        if ((key === 'responseCode') === undefined) {
          if (output.response) output.response = {}
          output.response[key] = r.data[mapping[key]]
        } else {
          output[key] = r.data[mapping[key]]
        }
      }
    }

    return output
  }

  handleRequest (operation, data) {
    const formatedData = this.formatBody(data)

    const errors = this.validateRequest(operation, formatedData)

    if (!errors.length) {
      const requestData = this.buildRequest(operation, formatedData)

      this.httpClient
        .request(requestData)
        .then((r) => {
          return this.handleResponse(r)
        })
        .catch((e) => {
          return this.handleResponse(e)
        })
    }

    return Promise.reject(errors)
  }

  buildRequest (operation, data) {
    const body = this.serializeBody(operation, data)
    const requestConfig = {
      baseURL: this.configuration.generateBaseURL(operation),
      url: operation.path,
      method: operation.method.toLowerCase(),
      responseType: 'json',
      headers: this.configuration.generateHeaders()
    }

    if (operation.input.type === 'body') {
      requestConfig.body = body
    } else {
      requestConfig.params = body
    }

    return requestConfig
  }

  serializeBody (operation, data) {
    return this.parseRequest(operation, data)
  }

  parseRequest (operation, data) {
    const output = {}

    for (const key in operation.input.mapping) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        output[operation.input.mapping[key]] = data[key]
      }
    }

    return output
  }

  validateRequest (operation, data) {
    const errors = []
    for (const key in data) {
      if (!operation.input.validation[key].test(data[key])) {
        errors.push(key)
      }
    }

    return errors
  }

  formatBody (data) {
    const output = {}
    for (const key in data) {
      output[key] = String(data[key])
    }

    return output
  }
}
