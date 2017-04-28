var express              = require('express'),
    passport             = require('passport'),
    mongo                = require('mongodb'),
    mongoose             = require('mongoose'),
    bodyParser           = require('body-parser'),
    cookieParser         = require('cookie-parser'),
    cookieSession        = require('cookie-session'),
    session              = require('express-session'),
    morgan               = require('morgan'),
    cors                 = require('cors'),
    serverConfig         = require('./config/serverConfig.js'),
    serverPathConfig     = require('./config/serverPath.config.js'),
    dataBaseConfig       = require('./config/dataBaseConfig.js'),
    passportConfig       = require('./config/passportConfig.js'),
    loginRoutes          = require('./routes/loginRoutes.js'),
    bookmarksRoutes      = require('./routes/bookmarksRoutes.js'),
    app;

app = express();

app.engine('html', require('ejs').renderFile);

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept');
  res.setHeader("Access-Control-Max-Age", "86400"); // 24 hours
  next();
});

mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.path);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(session({
  secret: 'leprecon',
  resave: true,
  saveUninitialized: true,
  cookie : { secure : false, maxAge : (86400) }
}));

passportConfig();
app.use(passport.initialize());
app.use(passport.session());

app = serverConfig(app);
app = serverPathConfig(app);
app = loginRoutes(app);
app = bookmarksRoutes(app);

app.listen(app.get('port'), function() {
  console.log('Server started on port 5555. Press Ctrl-C to terminate...');
});
