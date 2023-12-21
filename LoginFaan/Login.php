<?php
class UserLogin {
    private $username;
    private $password;

    public function __construct($username, $password) {
        $this->setUsername($username);
        $this->setPassword($password);
    }

    public function getUsername() {
        return $this->username;
    }

    public function setUsername($username) {
        $this->username = $username;
    }

    public function getPassword() {
        return $this->password;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    public function validateCredentials() {
        $allowedUsername = 'username_anda';
        $allowedPassword = 'password_anda';

        return ($this->getUsername() === $allowedUsername && $this->getPassword() === $allowedPassword);
    }
} 

class LoginForm extends UserLogin {
    public function __construct($username, $password) {
        parent::__construct($username, $password);
    }

    public function processFormSubmission() {
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $username = isset($_POST['username']) ? $_POST['username'] : '';
            $password = isset($_POST['password']) ? $_POST['password'] : '';

            if ($this->validateCredentials()) {
                session_start();
                $_SESSION['username'] = $username;
                header("Location: ../FannMusic/index.php"); 
                exit();
            } else {
                echo "<script>alert('Kredensial tidak valid. Silakan coba lagi.');</script>";
            }
        }

        session_start();
        if (isset($_SESSION['username'])) {
            header("Location: ../FannMusic/index.php"); 
            exit();
        }
    }
    
    public function validateCredentials() {
        $allowedUsername = 'custom_username';
        $allowedPassword = 'custom_password';

        return ($this->getUsername() === $allowedUsername && $this->getPassword() === $allowedPassword);
    }
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="Faan logo.jpg" href="images/Faan logo.jpg" type="image/x-icon"> 
    <title>Faan Login</title>

<style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background: #f1f1f1; 
    }

    video {
        position: fixed;
        right: 0;
        bottom: 0;
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        z-index: -1;
    }

    .login-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        padding: 20px;
        background-color: #transparan;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 1);
    }

    h2, label {
        color: #fff;
        text-align: center; 
    }

    input[type="text"], input[type="password"] {
        width: 100%;
        padding: 10px;
        margin: 8px 0;
        box-sizing: border-box;
        border: 1px solid #ccc; 
        border-radius: 4px;
    }

    input[type="submit"] {
        width: 100%;
        padding: 10px;
        background-color: #2ac3d1;
        color: #fff;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }

    input[type="submit"]:hover {
        background-color: #a5a8a5;
    }

</style>
</head>

<body>
    <!-- bacground  -->
    <video autoplay muted loop>
        <source src="background.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>

    <div class="login-container">
        <h2>FAANMusic Login</h2>

        <!-- nampilin forum pengisian -->
        <form action="../FannMusic/index.html" method="POST">
            <label for="username">Username:</label>
            <input required type="text" id="username" name="username">
            <label for="password">Password:</label>
            <input required type="password" id="password" name="password">
            <input type="submit" value="LOGIN">
        </form>
    </div>
</body>
</html>
