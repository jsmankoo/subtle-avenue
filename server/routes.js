/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');




module.exports = function(app) {

  // Insert routes below
  app.use('/api/uber', require('./api/uber'));

// catch all index.html
    // app.get('/*', function response(req, res) {
    //   res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../../dist/index.html')));
    //   res.end();
    // });


  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '../dist/index.html'));
    });

};
