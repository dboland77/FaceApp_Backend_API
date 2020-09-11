// REGISTER ROUTE
// Takes the email name and password from the front end form
// And registers the user on the postgres database.
// The password is encrypted with bcrypt and stored as a hash

const handleRegister = (request, response, pool,bcrypt) => {
  const { email, name, password } = request.body;
  const hash = bcrypt.hashSync(password);
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }
  pool.connect((err, client, done) => {
    const shouldAbort = err => {
      if (err) {
        console.error('Error in transaction', err.stack)
        client.query('ROLLBACK', err => {
          if (err) {
            console.error('Error rolling back client', err.stack)
          }
          // release the client back to the pool
          done()
        })
      }
      return !!err
    }
    client.query('BEGIN', err => {
      if (shouldAbort(err)) return
      const queryText = 'INSERT INTO login(hash, email) VALUES($1,$2) RETURNING email'
      client.query(queryText, [hash,email], (err, res) => {
        if (shouldAbort(err)) return
        const insertUserText = 'INSERT INTO users(name,email,joined) VALUES ($1, $2,$3) RETURNING *'
        const insertUserValues = [name,email,new Date()]
        client.query(insertUserText, insertUserValues, (err, res) => {
          if (shouldAbort(err)) return
          client.query('COMMIT', err => {
            if (err) {
              console.error('Error committing transaction', err.stack)
            }
            done()
            response.json(res.rows[0])
          })
        })
      })
    })
  })
  
};

module.exports = {
  handleRegister: handleRegister,
};
