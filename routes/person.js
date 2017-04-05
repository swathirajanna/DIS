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


/////
// Query the oracle database, and call output_actors on the results
//
// res = HTTP result object sent back to the client
// name = Name to query for

function query_db(res, login) {
	console.log('Hello!');
	query = "select id from Album";
	// if (login) query = query + " WHERE login='" + login + "'";
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
    console.log(query);
	connection.execute(query, function(err, rows) {
		if (err) console.log(err);
		else {
			console.log('Hello12!');
			console.log(rows.rows);
			console.log('Hello12gfcfv!');
			output_persons(res, login, rows.rows);
		}
	});

    //connection.close(
      // function(err)
      // {
      //   if (err) {
      //     console.error(err.message);
      //     return;
      //   }
      // });
  });
	}

// ///
// Given a set of query results, output a table
//
// res = HTTP result object sent back to the client
// name = Name to query for
// results = List object of query results
function output_persons(res,login,results) {
	console.log('Hello11!');
	res.render('person.jade',
		   { title: "Person with login " + login,
		     results: results }
	  );
}

/////
// This is what's called by the main app 
exports.do_work = function(req, res){
	query_db(res,'');
};
