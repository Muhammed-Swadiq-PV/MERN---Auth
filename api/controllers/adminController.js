import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'

export const test = (req, res) => {
    console.log('coming here')
    res.status(200).json('messagesucess ldkfjslkdj')
}

export const userlist = async (req, res) => {
    console.log('comin here');
    try {
        const userlist = await User.find();
        console.log('herer', userlist);
        res.status(200).json(userlist);
    } catch (error) {
        console.log(error);
    }
}

export const makeAdmin = async (req, res) => {
    console.log('coming at make admin')
    const { id } = req.params;
    console.log('id----', id)
    try {

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'user not found' })
        }
        user.role = user.role === 'Admin' ? 'User' : 'Admin';
        const updatedUser = await user.save();

        res.status(200).json({ success: true, updatedUser });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


export const blockUser = async (req, res) => {
    const { id } = req.params;
    // console.log('id here', id)
    try {
        const user = await User.findById(id);
        // console.log('tocheck blocked or not',user);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        user.isBlocked = user.isBlocked === 'Blocked' ? 'Unblocked' : 'Blocked';
        const updatedUser = await user.save();
        res.status(200).json({success:true})
    } catch (error) {

    }
}

export const addUser = async(req,res , next) =>{
    // console.log(req.body)
    const{username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 2);
    const newUser = new User({
        username,
        email, password: hashedPassword
    })
    try {
        await newUser.save();
        console.log('new user is', newUser )
        res.status(200).json({ success:true, message: 'User created succesfully' })

    } catch (error) {
        console.log(error.message)
        const message = 'Email already registered, Use new email for registering';
        if(error.code=== 11000){
        error.message = message
        }
        console.log(error.message);
        next(error);
    }
}