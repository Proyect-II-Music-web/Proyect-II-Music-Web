const hbs = require('hbs');

// Define el helper
hbs.registerHelper('ifRoleIsPromoter', function(currentUser, options) {
  if (currentUser && currentUser.role === 'promoter') {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
hbs.registerHelper('ifRoleIsUser', function(currentUser, options) {
  if (currentUser && currentUser.role === 'user') {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
hbs.registerHelper('ifUserHasBand', function(currentUser, options) {
  if (currentUser && currentUser.bands) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});