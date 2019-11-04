const { EventEmitter } = require('./EventEmitter')

let emitter = new EventEmitter()

let respondsToMsg = msg => console.log(msg)
let capitalizesMsg = msg => {
  let capitalized = msg.toUpperCase()
  console.log(capitalized)
}
let onlyLogsOnceFn = msg => console.log('Run once: ' + msg)
let logSum3 = (a, b, c) => console.log(a + b + c)
let logProduct5 = (a, b, c, d, e) => console.log(1, 2, 3, 4, 5)

/**
 * first set
 * emitter.on binds a string to a function that can be later called with emitter.emit
 * emitter.on should respond to
 * @param {string} event - name of the bound event
 * @param {function} listener - a function reference to run
 * emitter.on should allow a user to bind multiple functions to an event
 *
 * emitter.emit calls a function by it's event binding along with arguments to pass into the function
 * emitter.emit should be called with
 * @param {string} event - the name of the bound event
 * @param {*} argument - the argument passed into the bound function
 * emitter.emit should call every function bound with
 */

// console.log('---- First set of tests ----')
// emitter.on('submit', respondsToMsg)
// emitter.emit('submit', 'has been logged')
// emitter.on('submit', capitalizesMsg)
// emitter.emit('submit', 'logs all capitals')

/**
 * second set
 * emitter.remove will unbind a specific function from an event
 * emitter.remove should respond to
 * @param {string} event - the name of the bound event
 * @param {function} listener - the function that should be removed
 * @returns {boolean} - true if found and deleted, false if not
 *
 * emitter.removeEvent will get rid of all bindings to a given event name
 * emitter.removeEvent should respond to
 * @param {string} event - the name of the bound event
 * @returns {boolean} - true if found and deleted, false if not
 */

// console.log('---- Second set of tests ----')
// emitter.remove('submit', capitalizesMsg)
// emitter.emit('submit', 'only should see one log')
// emitter.removeEvent('submit')
// emitter.emit('submit', 'should not see anything logged')

/**
 * third set
 * emitter.emit should take multiple arguments
 */

// console.log('---- third set of tests ----')
// emitter.on('sumTest', logSum3)
// emitter.emit('sumTest', 1, 2, 3) // logs 6
// emitter.on('productTest', logProduct5)
// emitter.emit('productTest', 1, 2, 3, 4, 5) //logs 120
// emitter.removeEvent('sumTest')
// emitter.removeEvent('productTest')
// emitter.emit('sumTest', 999, 999)
// emitter.emit('productTest', 555, 555)

/**
 * fourth set
 * emitter.once is a function that takes an event name and a function
 * when the event is emit, that function will be run only if it's never been run before
 * emitter.once should respond to
 * @param {string} event - the name of the bound event
 * @param {function} event - the function to run
 */

// console.log('---- Fourth set of tests ----')
// emitter.on('testOnce', respondsToMsg)
// emitter.once('testOnce', capitalizesMsg)
// emitter.emit('testOnce', 'should see two')
// emitter.emit('testOnce', 'should see one')
