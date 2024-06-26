import User from "../models/user.model.js";
import genrateTokenAndSave from "../utils/genrateToken.js";
import bcryptjs from "bcryptjs";

// export const Login = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       return res.status(400).json({
//         success: false,
//         error: "Please provide username and password",
//       });
//     }
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ success: false, error: "User not found" });
//     }
//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect) {
//       return res.status(400).json({ success: false, error: "Wrong password" });
//     }
//     genrateTokenAndSave(user._id, res);
//     return res.status(200).json({
//       _id: user._id,
//       fullName: user.fullName,
//       username: user.username,
//       profilePic: user.profilePic,
//     });
//   } catch (error) {
//     console.log("Error in Login controller: ", error.message);
//     return res.status(500).json({ success: false, error: error.message });
//   }
// };
// export const SignUp = async (req, res) => {
//   try {
//     const { username, password, confirmPassword, fullName, gender } = req.body;

//     if (password !== confirmPassword) {
//       return res
//         .status(400)
//         .json({ success: false, error: "Passwords don't match" });
//     }

//     const oldUser = await User.findOne({ username });
//     if (oldUser) {
//       return res
//         .status(400)
//         .json({ success: false, error: "User already exists" });
//     }
//     //hash password
//     const hashPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       username,
//       email
//       password: hashPassword,
//       profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
//     });
//     if (newUser) {
//       genrateTokenAndSave(newUser._id, res);
//       await newUser.save();
//       res.status(201).json({
//         success: true,
//         message: "User created successfully",
//         _id: newUser._id,
//         username: newUser.username,
//         fullName: newUser.fullname,
//         profilePic: newUser.profilePic,
//       });
//     } else {
//       res.status(400).json({ success: false, error: "Invalid user data" });
//     }
//   } catch (error) {
//     console.log("Error in SignUp Controller: ", error.message);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };
export const Logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
    });
    res.status(200).json({ success: true, message: "Logout success" });
  } catch (error) {
    console.log("Error in Logout Controller: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const google = async (req, res) => {
  const { email, name, photoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      genrateTokenAndSave(user._id, res);
      return res.status(200).json({
        success: true,
        user,
      });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePic: photoUrl,
      });
      await newUser.save();
      genrateTokenAndSave(newUser._id, res);
      return res.status(200).json({
        success: true,
        user:newUser,
      });
    }
  } catch (error) {
   res.status(500).json({success:false,message:error.message})
  }
};
