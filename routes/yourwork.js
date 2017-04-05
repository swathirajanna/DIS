// Connect string to MySQL
var oracledb = require('oracledb');

oracledb.getConnection(
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
    console.log('Connection was successful!');

    connection.close(
      function(err)
      {
        if (err) {
          console.error(err.message);
          return;
        }
      });
  });


// ///
// Given a set of query results, output a table
//
// res = HTTP result object sent back to the client
// name = Name to query for
// results = List object of query results
function output_persons(res,login,results) {
	res.render('yourwork.jade',
		   { title: "Person with Family " + login,
		     results: results }
	  );
}

/////
// This is what's called by the main app 
exports.do_work = function(req, res){
	query_db(res,req.query.name);
};
