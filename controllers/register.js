// REGISTER ROUTE
// Takes the email name and password from the front end form
// And registers the user on the postgres database.
// The password is encrypted with bcrypt and stored as a hash

const handleRegister = (req, res, pool) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }
  const newLogin = pool.query(
    "INSERT INTO login(hash,email,entries) VALUES ($1,$2,0) RETURNING *",
    [password, email]
  );

  res.json({ Success: `User ${name} with email ${email} created!` });
};

module.exports = {
  handleRegister: handleRegister,
};
