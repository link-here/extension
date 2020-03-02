declare var window: any;

export default (): void => {
  window.browser = (function () {
    return window.msBrowser ||
    window.browser ||
    window.chrome;
  })();
};
