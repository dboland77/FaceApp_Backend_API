// SIGNIN ROUTE
// Checks the user details entered against the database
// If the user is there returns their details
// If not then return a 400 with either unable to get user or wrong credentials
// Depending on the reason.

const handleSignin = (pool) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  pool.connect().then((client) => {
    return client
      .query("SELECT * FROM login where email=$1", [email])
      .then((pgresponse) => {
        client.release();
        console.log(pgresponse.rows[0]);
        res.json(pgresponse.rows[0]);
      })
      .catch((err) => {
        client.release();
        console.log(err.stack);
      });
  });
};

module.exports = {
  handleSignin: handleSignin,
};
