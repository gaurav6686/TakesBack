const User = require("../model/user")

// ==============================REGISTER============================================================================
exports.register = async (req, res) => {
    const { username, password,names } = req.body;

  if (password.length < 6) {
    return res.status(400).json({ message: "Password should be at least 6 characters long" });
  }


  try {
    const user = await User.create({ username, password,names });
    return res.redirect("/home");
  } catch (error) {
    return res.status(401).json({ message: "User not successfully created", error: error.message });
  }

};

// ==============================LOGIN============================================================================

exports.login = async (req,res)=>{
    const { username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({
            message: "Username or Password not present", 
        })
    }

    try {
        const user = await User.findOne({username,password});
        if(!user){
            res.status(401).json({
                message: "Login not successful",
                error: "User not found",
              })
            } else {
            return res.redirect("/home");
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
          })
        }  
     
};

// ==============================delete============================================================================

exports.deleteUser = async (req, res, next) => {
    const { id } = req.body
    await User.findById(id)
      .then(user => user.remove())
      .then(user =>
        res.status(201).json({ message: "User successfully deleted", user })
      )
      .catch(error =>
        res
          .status(400)
          .json({ message: "An error occurred", error: error.message })
      )
  }
