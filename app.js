// var orcl = require('oracledb');

// var connection = orcl.getConnection({
//   host     : 'dbproj.cyjtpl2nvnjr.us-west-2.rds.amazonaws.com',
//   user     : 'g19',
//   password : 'sarveshsurana1311',
//   port     : '1521'
// });

var oracledb = require('oracledb');

var con=oracledb.getConnection(
  {
    user          : 'g19',
    password      : 'sarveshsurana1311',
    connectString : '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=dbproj.cyjtpl2nvnjr.us-west-2.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SID=g19)))',
    // connectString : 'localhost/orcl',
    port     : '1521'
  },
  function(err, connection)
  {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log('Connection was success!');
    
    connection.close(
      function(err)
      {
        if (err) {
          console.error(err.message);
          return;
        }
      });
  });


/**
 * Simple Homework 2 application for CIS 550
 */

/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , users = require('./routes/users');
  , person = require('./routes/person')
  , yourwork = require('./routes/yourwork')
  , yourwork_1 = require('./routes/yourwork_1')
  , http = require('http')
  , path = require('path')
  , stylus = require("stylus")
  , nib = require("nib")
;

// Initialize express
var app = express();
// .. and our app
init_app(app);

// When we get a request for {app}/ we should call routes/index.js
app.get('/', routes.do_work);
app.get('/reference', routes.do_ref);
app.get('/login',routes.do_login);
app.get('/user',routes.do_user);
app.get('/yourwork', yourwork.do_work);
app.get('/yourwork_1', yourwork_1.do_work);
// when we get a request for {app/person} we should call routes/person.js
app.get('/person', person.do_work);

// Listen on the port we specify
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

///////////////////
// This function compiles the stylus CSS files, etc.
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

//////
// This is app initialization code
function init_app() {
  // all environments
  app.set('port', process.env.PORT || 8080);
  
  // Use Jade to do views
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');\
  
  // BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

  app.use(express.favicon());
  // Set the express logger: log to the console in dev mode
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  // Use Stylus, which compiles .styl --> CSS
  app.use(stylus.middleware(
    { src: __dirname + '/public'
    , compile: compile
    }
  ));
  app.use(express.static(path.join(__dirname, 'public')));

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

}
