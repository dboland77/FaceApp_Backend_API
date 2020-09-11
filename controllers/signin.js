// SIGNIN ROUTE
// Checks the user details entered against the database
// If the user is there returns their details
// If not then return a 400 with either unable to get user or wrong credentials
// Depending on the reason.

const handleSignin = (pool, bcrypt) => (request, response) => {
  const { email, password } = request.body;
  if (!email) {
    return response.status(400).json("Please enter your email.");
  }
  if (!password) {
    return response.status(400).json("Please enter your password.");
  }

  pool.connect((err, client, done) => {
    const shouldAbort = (err) => {
      if (err) {
        console.error("Error in transaction", err.stack);
        client.query("ROLLBACK", (err) => {
          if (err) {
            console.error("Error rolling back client", err.stack);
          }
          // release the client back to the pool
          done();
        });
      }
      return !!err;
    };
    client.query("BEGIN", (err) => {
      if (shouldAbort(err)) return;
      client.query(
        "SELECT * FROM login where email=$1",
        [email],
        (err, res) => {
          if (res.rows === undefined || res.rows == 0) {
            done();
            return response.status(404).json("Email not found");
          } 
            const passwordMatches = bcrypt.compareSync(
              request.body.password,
              res.rows[0].hash
            );
            if (!passwordMatches) {
              return response.status(400).json("Incorrect Password");
            }
            if (shouldAbort(err)) return;
            client.query(
              "SELECT * from users where email=$1",
              [email],
              (err, res) => {
                if (shouldAbort(err)) return;
                client.query("COMMIT", (err) => {
                  if (err) {
                    console.error("Error committing transaction", err.stack);
                  }
                  done();
                  return response.json(res.rows[0]);
                });
              }
            );
        }
      );
    });
  });
};

module.exports = {
  handleSignin: handleSignin,
};
