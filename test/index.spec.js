import test from 'ava'

import Promise from '../src/index'

test('Can create a new Promise', (t) => {
  const promise = new Promise(() => {})
  t.truthy(promise)
})

test('New Promise is pending', (t) => {
  const promise = new Promise(() => {})
  t.true(promise.state === 'pending')
})

test('Resolved Promise is fulfilled', (t) => {
  const promise = new Promise((resolve, reject) => {
    resolve()
  })
  t.true(promise.state === 'fulfilled')
})

test('Rejected Promise is rejected', (t) => {
  const promise = new Promise((resolve, reject) => {
    reject()
  })
  t.true(promise.state === 'rejected')
})

test('Resolved Promise has a value', (t) => {
  const value = 'hello world'
  const promise = new Promise((resolve, reject) => {
    resolve(value)
  })
  t.true(promise.value === value)
})

test('Rejected Promise has a value', (t) => {
  const value = 'hello world'
  const promise = new Promise((resolve, reject) => {
    reject(value)
  })
  t.true(promise.value === value)
})

test('onFulfill function receives a value', (t) => {
  const expected = 'hello world'
  t.plan(1)
  new Promise((resolve, reject) => {
    resolve(expected)
  }).then((value) => {
    t.true(value === expected)
  }, () => {
    throw new Error('onReject called')
  })
})

test('onReject function receives a value', (t) => {
  const expected = 'hello world'
  t.plan(1)
  new Promise((resolve, reject) => {
    reject(expected)
  }).then(() => {
    throw new Error('onFulfill called')
  }, (value) => {
    t.true(value === expected)
  })
})

test.cb('onFulfill function receives a value asynchronously', (t) => {
  const expected = 'hello world'
  t.plan(1)
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(expected)
    }, 100)
  }).then((value) => {
    t.true(value === expected)
    t.end()
  }, () => {
    throw new Error('onReject called')
  })
})

test.cb('onReject function receives a value asynchronously', (t) => {
  const expected = 'hello world'
  t.plan(1)
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(expected)
    }, 100)
  }).then(() => {
    throw new Error('onFulfill called')
  }, (value) => {
    t.true(value === expected)
    t.end()
  })
})

test.cb('catch method is called on error', (t) => {
  const expected = 'hello world'
  t.plan(1)
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(expected)
    }, 100)
  }).catch((value) => {
    t.true(value === expected)
    t.end()
  })
})

test.cb('Promises can be chained', (t) => {
  const expected = 'hello world'
  t.plan(1)
  new Promise((resolve, reject) => {
    resolve()
  }).then(() => {
    return expected
  }).then((value) => {
    t.true(value === expected)
    t.end()
  })
})

test.cb('Promises can be chained asynchronously', (t) => {
  const expected = 'hello world'
  t.plan(1)
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 100)
  }).then(() => {
    return expected
  }).then((value) => {
    t.true(value === expected)
    t.end()
  })
})

test.cb('Promises reject when chained asynchronously', (t) => {
  const expected = 'hello world'
  t.plan(1)
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject()
    }, 100)
  }).catch((value) => {
    return expected
  }).then((value) => {
    t.true(value === expected)
    t.end()
  })
})

test.cb('Error in onFulfill can be caught when chained', (t) => {
  const expected = Error('Error')
  t.plan(1)
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 100)
  }).then(() => {
    throw expected
  }).catch((value) => {
    t.true(value === expected)
    t.end()
  })
})

test.cb('Error in onReject can be caught when chained', (t) => {
  const expected = Error('Error')
  t.plan(1)
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject()
    }, 100)
  }).catch(() => {
    throw expected
  }).catch((value) => {
    t.true(value === expected)
    t.end()
  })
})

test('Error in onReject can be caught when chained', (t) => {
  const expected = Error('Error')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
      t.pass()
    }, 100)
  })
})
