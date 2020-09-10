// PROFILE ROUTE
// Can have any number as id.
// This will GET the user for their homepage.
const handleProfileGet = (req, res, pool) => {
  const { id } = req.params; // <- gets the id

    pool.connect()
    .then(client => {
        return client
        .query('SELECT * from login WHERE id = $1',[id])
        .then(pgresponse => {
            client.release()
            res.json(pgresponse.rows[0])
        })
        .catch(err => {
            client.release()
            console.log(err.stack)
        })
    })
};

module.exports = {
  handleProfileGet,
};
