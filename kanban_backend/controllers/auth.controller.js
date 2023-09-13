const User = require("../models/user.model");
const CryptoJs = require("crypto-js");

module.exports = {
  /* ----------------------------------------- */
  /**
   * @Desc : register a new user with username and password
   * @Method : Post /auth/register
   */
  /* ----------------------------------------- */

  registerUser: async (req, res) => {
    const {email, username, password } = req.body;

    const newUser = new User({
      email,
      username,
      password: CryptoJs.AES.encrypt(
        password,
        process.env.SECRET_KEY
      ).toString(),
    });

    const userExist = await User.findOne({ username });

    if (userExist) {
      return res.status(400).json({ message: "username already exists" });
    }

    const savedUser = await newUser.save();

    return res.status(201).json(savedUser);
  },
  /* ----------------------------------------- */

  /**
   * @Desc : Login user with username and password
   * @Method : Post /auth/login
   */
  /* ----------------------------------------- */

  loginUser: async (req, res) => {
    const { email, username, password } = req.body;
  
    // Check if either the username or email exists
    const userExist = await User.findOne({ username, email });
  
    if (userExist) {
            //passe 2 params to decrypt the password(the password and the)

      const decryptedPassword = CryptoJs.AES.decrypt(
        userExist.password,
        process.env.SECRET_KEY
      );
  
      const sPassword = decryptedPassword.toString(CryptoJs.enc.Utf8);
  
      if (password === sPassword) {
        // Passwords match, return user data
        return res.status(200).json(userExist);
      }
    }
  
    // No user found or incorrect password
    return res.status(400).json({ message: "Invalid Credential" });
  },
  
};
