// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Authentication {
    struct UserDetail {
        address wallet; // stores the wallet address
        string user_name;
        string password;
        string ipfs_image_hash; // for storing the profile image
        bool login_status;
    }

    mapping(address => UserDetail) user; // responsible for storing the user details

    // User registration
    function registerUser(
        address _wallet,
        string memory _user_name,
        string memory _password,
        string memory _ipfs_image_hash
    ) public returns (bool) {
        require(user[_wallet].wallet != msg.sender, "User already registered");
        
        user[_wallet] = UserDetail({
            wallet: _wallet,
            user_name: _user_name,
            password: _password,
            ipfs_image_hash: _ipfs_image_hash,
            login_status: false
        });

        return true;
    }

    // User login
    function loginUser(address _wallet, string memory _user_name) public returns (bool) {
        require(user[_wallet].wallet == msg.sender, "User not registered");

        if (keccak256(bytes(user[_wallet].user_name)) == keccak256(bytes(_user_name))) {
            user[_wallet].login_status = true;
            return true;
        } else {
            return false;
        }
    }

    // Check if the user is logged in
    function checkUserLogin(address _wallet) public view returns (bool, string memory) {
        return (user[_wallet].login_status, user[_wallet].ipfs_image_hash);
    }

    // Logout the user
    function logoutUser(address _wallet) public {
        user[_wallet].login_status = false;
    }
}
