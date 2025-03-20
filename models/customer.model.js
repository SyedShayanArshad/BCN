import mongoose, { Schema } from "mongoose";
const customerSchema = new Schema(
  {
    CustomerName: {
      InEnglish: {
        type: String,
        required: [true, "Please provide customer name in English"],
        trim: true,
      },
      InUrdu: {
        type: String,
        required: [true, "Please provide customer name in Urdu"],
        trim: true,
      },
    },
    area: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Area",
      required: [true, "Area is required"],
    },
    PhoneNumber: {
      type: String,
      required: [true, "Please provide a phone number"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^03[0-9]{2}-[0-9]{7}$/.test(v); 
        },
        message: (props) =>
          `${props.value} is not a valid Pakistani phone number!`,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Customer = mongoose.model("Customer", customerSchema);
