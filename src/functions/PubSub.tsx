function createPubSub() {
  const subscribers: any = {};

  function subscribe(event, callback) {
    if (!subscribers[event]) {
      subscribers[event] = [];
    }

    subscribers[event].push(callback);
  }

  function publish(event, data) {
    if (subscribers[event]) {
      subscribers[event].forEach((callback) => {
        callback(data);
      });
    }
  }

  function unsubscribe(event, callback) {
    if (subscribers[event]) {
      subscribers[event] = subscribers[event].filter(
        (subscriber) => subscriber !== callback
      );
    }
  }

  return {
    subscribe,
    publish,
    unsubscribe,
  };
}
