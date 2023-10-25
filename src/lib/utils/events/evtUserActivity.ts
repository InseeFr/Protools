export const evtUserActivity = () => {
  const activityEvents = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];
  return new Promise<void>(resolve => {
    const listener = () => {
      resolve();
    };
    activityEvents.forEach(function (eventName) {
      window.addEventListener(eventName, listener, { once: true });
    });
  });
};