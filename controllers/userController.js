const DataSource = require("../lib/dataSource")
const path = require("path")
const UserClass = require("../lib/userClass")
const idGenerate = require("../lib/idGenerator")
const ResponseData = require("../lib/responseData")


const usersDatabasePath = path.join(__dirname, "../database/users.json")
const usersData = new DataSource(usersDatabasePath)


//@route                GET /users
//@desc                 Get Users 
//@access               Public
const getAllUsers = async (req, res) => {
    const users = usersData.read()
    res.status(200).json(users);
}

//@route                GET /users/:id
//@desc                 Get Users 
//@access               Public
const getUserById = async(req, res) => {
    const users = usersData.read();
    const userId = req.params.id
    console.log(typeof req.params.id);

    const foundUser = users.find((user) => user.id === Number(userId));

    if (foundUser) {
      res.status(200).json(new ResponseData("User found!", foundUser, null))
    } else {
      res.status(404).json(new ResponseData("User not found!", null, null))
    }
}

//@route                POST /users
//@desc                 POST Users 
//@access               Public
const createUser = async (req, res) => {
    const users = usersData.read()
    const body = req.body

    if (!body.fullName || !body.login || isNaN(body.age)) {
        const response = new ResponseData("fullName, login, age must be required", null, null)
        return res.status(400).json(response)
    }

    const foundUserByLogin = users.find((user) => user.login === body.login);
    if (foundUserByLogin) {
        const response = new ResponseData("This login already exist!", null, null)
        return res.status(400).json(response)
    }

    const newId = idGenerate(users)
    const newUser = new UserClass(newId, body.fullName, body.login, body.age)
    users.push(newUser)
    usersData.write(users)
    const response = new ResponseData("User created sucessfully!", newUser, null)
    res.status(201).json(response)
}

//@route                PUT /users/:id
//@desc                 PUT Users 
//@access               Public
const updateUser = async (req, res) => {
    const body = req.body
    

    if (!body.fullName || !body.login || isNaN(body.age)) {
      return res.status(400).json(new ResponseData("fullName, login, age must be required", null, null))
    }

    const users = usersData.read();
    const userId = Number(req.params.id)

    const foundUserIndex = users.findIndex((user) => user.id === userId);

    const foundUserByLogin = users.find((user) => user.login === body.login);

    if (foundUserIndex === -1) {
      res.status(404).json(new ResponseData("User Not Found!", null, null))
    }

    const [foundUser] = users.splice(foundUserIndex, 1);

    if (foundUserByLogin && foundUser.login !== body.login) {
      res.status(400).json(new ResponseData("This login already exist!", null, null))
    }

    foundUser.full_name = body.fullName
    foundUser.login = body.login
    foundUser.age = body.age

    users.push(foundUser);

    usersData.write(users);

    return res.status(201).json(new ResponseData("User successfully updated!", foundUser, null));
}

//@route                DELETE /users/:id
//@desc                 DELETE Users
//@access               Public
const deleteUser = (req, res) => {
    const users = usersData.read();
    const foundUserIndex = users.findIndex((user) => user.id === Number(req.params.id));


    if (foundUserIndex === -1) {
      res.status(404).json(new ResponseData("User Not Found", null, null))
    }
    

    const [deletedUser] = users.splice(foundUserIndex, 1);
    usersData.write(users);
    res.status(200).json(new ResponseData("User deleted successfully!", deletedUser, null));
}

// Export All Functions
module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};
