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
  if (currentUser && currentUser.band) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper('ifPostIsNotClosed', function(isClosed, options) {
  if (isClosed === false) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper('ifMaxForumComplete', function(assistans, maxForum, options) {
  if (assistans.length >= maxForum) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper('formatDate', function(date) {
  // Lógica para formatear la fecha
  return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
  }).replace(/\//g, '-');
});

hbs.registerHelper('ifNoCurrentUser', function(currentUser, options) {
  if (!currentUser) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
