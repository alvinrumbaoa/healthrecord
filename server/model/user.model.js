const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    companyName: {
        type: String,
        required: [true, "Company name is required"]
    },
    position: {
        type: String,
        required: [true, "Required"],
        enum: [
            "Administrator",
            "CEO",
            "Manager",
            "Staff",
        ]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
      },
    mobilePhone: {
        type: String,
        required: [true, "Mobile phone number is required"]
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long']
      },
}, { timestamps: true });

UserSchema.virtual("confirmPassword")
    .get(() => this.confirmPassword)
    .set((value) => this.confirmPassword = value);

UserSchema.pre("validate", function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Password and confirm password must match")
    }

    next();
})

UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
        .then((hashedPassword) => {
            this.password = hashedPassword;
            next();
        })
})

module.exports = mongoose.model("User", UserSchema);