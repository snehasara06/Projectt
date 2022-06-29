const sendToken = (user, statusCode, res, message) => {
    const token = user.getJwtToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 60 * 1000
        ),
        httpOnly: true,
    };

    return res.status(statusCode).cookie("token", token, options).json({
        success: message,
        user:{ 
            first_name: user.first_name,
            last_name: user.last_name,
            employeeId: user.employeeId,
            emailId: user.emailId,
            department: user.department,
            role: user.role
        },
        token
    });
  };

module.exports = sendToken;