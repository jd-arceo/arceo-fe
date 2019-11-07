const { EventEmitter } = require("./EventEmitter");

describe("EventEmitter", () => {
  /**
   *
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
  test("emit calls handler", () => {
    const emitter = new EventEmitter();
    const handler = jest.fn();

    emitter.on("submit", handler);
    emitter.emit("submit", "arg1", "arg2");

    expect(handler).toBeCalledWith("arg1", "arg2");
  });

  test("emit calls all handlers", () => {
    const emitter = new EventEmitter();
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    emitter.on("submit", handler1);
    emitter.on("submit", handler2);
    emitter.emit("submit", "arg1", "arg2");

    expect(handler1).toBeCalledWith("arg1", "arg2");
    expect(handler2).toBeCalledWith("arg1", "arg2");
  });

  test("emit passes all arguments to handlers", () => {
    const emitter = new EventEmitter();
    const handler = jest.fn();

    emitter.on("submit", handler);
    emitter.emit("submit", "arg1", "arg2");
    expect(handler).toBeCalledWith("arg1", "arg2");

    emitter.emit("submit", "arg1", "arg2", "arg3");
    expect(handler).toBeCalledWith("arg1", "arg2", "arg3");
  });

  /**
   * emitter.remove will unbind a specific function from an event
   * emitter.remove should respond to
   * @param {string} event - the name of the bound event
   * @param {function} listener - the function that should be removed
   * @returns {boolean} - true if found and deleted, false if not
   */
  test("remove removes a given function", () => {
    const emitter = new EventEmitter();
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    emitter.on("submit", handler1);
    emitter.on("submit", handler2);
    emitter.emit("submit", "arg1", "arg2");

    const success = emitter.remove("submit", handler1);
    expect(success).toBe(true);

    // test again and make sure we have removed the function
    emitter.emit("submit", "arg1", "arg2");

    expect(handler1).toBeCalledTimes(1);
    expect(handler2).toBeCalledTimes(2);

    const successAgain = emitter.remove(handler1);
    expect(successAgain).toBe(false);
  });

  /*
   * emitter.removeEvent will get rid of all bindings to a given event name
   * emitter.removeEvent should respond to
   * @param {string} event - the name of the bound event
   * @returns {boolean} - true if found and deleted, false if not
   */
  test("removeEvent removes all functions for the event", () => {
    const emitter = new EventEmitter();
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    emitter.on("submit", handler1);
    emitter.on("submit", handler2);

    const success = emitter.removeEvent("submit");
    expect(success).toBe(true);

    emitter.emit("submit", "arg1", "arg2");
    emitter.emit("submit", "arg1", "arg2");

    expect(handler1).not.toBeCalled();
    expect(handler2).not.toBeCalled();

    const successAgain = emitter.remove("submit");
    expect(successAgain).toBe(false);
  });

  /**
   * emitter.once is a function that takes an event name and a function
   * when the event is emit, that function will be run only if it's never been run before
   * emitter.once should respond to
   * @param {string} event - the name of the bound event
   * @param {function} event - the function to run
   */
  test("once adds a handler, and it is only called once", () => {
    const emitter = new EventEmitter();
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    emitter.on("submit", handler1);
    emitter.once("submit", handler2);

    emitter.emit("submit", "test1");
    emitter.emit("submit", "test2");
    emitter.emit("submit", "test3");

    expect(handler1).toBeCalledTimes(3);
    expect(handler2).toBeCalledTimes(1);
  });
});
