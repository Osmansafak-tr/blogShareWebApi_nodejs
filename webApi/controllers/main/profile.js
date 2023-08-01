exports.GetMyProfile = async (req,res) => {
    const user = req.user;
    if(user == null)
        throw new Error("User is not logged in.");

    const viewModel = {
        user:{
            _id: user._id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            dateOfBirth: user.dateOfBirth,
        }
    }

    return res.status(200).json(viewModel);
};