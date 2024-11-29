const bcrypt = require('bcrypt');
const db = require('../Models/db');

// Register User
registerUser = (req, res) => {
  const {User_Id, Name, Email, Password } = req.body;

  //try {
    //const hashedPassword = bcrypt.hash(Password, 10);
    const query = 'INSERT INTO users (User_Id, Name, Email, Password) VALUES (?, ?, ?, ?)';

    db.query(query, [User_Id, Name, Email, Password], (err, results) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Email already exists' });
        }
        return res.status(500).json({ message: 'Database error', error: err });
      }

      return res.status(201).json({ message: 'User registered successfully' });
    });
  }; //catch (err) {
    //return res.status(500).json({ message: 'Server error', error: err });
  //}
//};

// Login User
loginUser = (req, res) => {
  const { Email, Password } = req.body;

  //try {
    const query = 'SELECT * FROM USERS WHERE email = ?';

    db.query(query, [Email, Password], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }else {
        if (results[0].password === Password){return res.status(200).json({ message: 'Login successful' });
      }else{return res.status(401).json({message: "Login successful !!!"})}
      }

      //const user = results[0];
      //const isMatch = await bcrypt.compare(Password_Hash, user.Password_Hash);

      //if (!isMatch) {
       // return res.status(401).json({ message: 'Invalid email or password' });
      //}

      //res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
    });
  }; //catch (err) {
    //res.status(500).json({ message: 'Server error', error: err });
  //}
//};

module.exports = { registerUser, loginUser };