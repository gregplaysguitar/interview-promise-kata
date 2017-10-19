class Promise {
  constructor (func) {
    this.state = 'pending'
    this.fulfillmentQueue = []
    this.rejectQueue = []

    const resolve = (value) => {
      this.state = 'fulfilled'
      this.value = value
      this.fulfillmentQueue.forEach((func) => {
        func(value)
      })
    }
    const reject = (value) => {
      this.state = 'rejected'
      this.value = value
      this.rejectQueue.forEach((func) => {
        func(value)
      })
    }
    func(resolve, reject)
  }

  then (onFulfill, onReject) {
    let resolve
    let reject

    const promise = new Promise((res, rej) => {
      resolve = res
      reject = rej
    })

    const fulfill = (value) => {
      try {
        resolve(onFulfill(value))
      } catch(error) {
        reject(error)
      }
    }

    const rejectWrap = (value) => {
      try {
        resolve(onReject(value))
      } catch(error) {
        reject(error)
      }
    }

    if (this.state === 'pending') {
      if (onFulfill) {
        this.fulfillmentQueue.push(fulfill)
      }
      if (onReject) {
        this.rejectQueue.push(rejectWrap)
      }
    } else if (onFulfill && this.state === 'fulfilled') {
      fulfill(this.value)
    } else if (onReject && this.state === 'rejected') {
      rejectWrap(this.value)
    }

    return promise
  }

  catch (onReject) {
    return this.then(null, onReject)
  }
}

export default Promise
