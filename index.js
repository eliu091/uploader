var express   =   require( 'express' );
var multer    =   require( 'multer' );
var sizeOf    =   require( 'image-size' );
var exphbs    =   require( 'express-handlebars' );
require( 'string.prototype.startswith' );

var app = express();

app.use( express.static( __dirname + '/bower_components' ) );
app.use( express.static(__dirname + '/public') );

app.engine( '.hbs', exphbs( { extname: '.hbs' } ) );
app.set('view engine', '.hbs');

app.get( '/', function( req, res, next ){
  return res.render( 'index' );
});

var storage = multer.diskStorage(
    {
        destination: './uploads/',
        fileSize: 100,
        filename: function ( req, file, cb ) {
            cb( null, file.originalname);
        }
    }
);


var upload = multer( { storage: storage } );

app.post( '/upload', upload.single( 'file' ), function( req, res, next ) {

  return res.status( 200 ).send( req.file );
});

app.listen( 8080, function() {
  console.log( 'Express server listening on port 8080' );
});
