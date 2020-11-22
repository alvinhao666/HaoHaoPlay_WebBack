const req = require['context']('../../assets/icon', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys();

const re = /\.\/(.*)\.svg/;

const icons = requireAll(req).map(i => {
  return 'icon:' + i.match(re)[1];
});

export { icons };

