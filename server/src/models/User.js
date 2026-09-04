import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'business'],
      default: 'user',
    },
    // Business Specific Fields
    companyName: {
      type: String,
      trim: true,
      required: [
        function () {
          return this.role === 'business';
        },
        'Company name is required for business accounts',
      ],
    },
    description: {
      type: String,
      trim: true,
      required: [
        function () {
          return this.role === 'business';
        },
        'Description is required for business accounts',
      ],
    },
    category: {
      type: String,
      trim: true,
      enum: {
        values: ['restaurant', 'hotel', 'tour_guide', 'retail', 'other'],
        message: '{VALUE} is not a valid business category',
      },
      required: [
        function () {
          return this.role === 'business';
        },
        'Category is required for business accounts',
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save Middleware: Hashes the password automatically before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance Method: Helper to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;