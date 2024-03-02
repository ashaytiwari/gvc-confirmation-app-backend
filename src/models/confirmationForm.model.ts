import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const confirmationSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    personCount: {
      type: Number,
      required: true
    },
    remark: String,
    addedBy: String
  },
  {
    timestamps: true
  }
);

const confirmationFormSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    confirmations: {
      type: [confirmationSchema],
      validate: {
        validator: (array: any) => {
          // Check for duplicate ObjectIds
          const objectIds = array.map((obj: any) => obj._id);
          return new Set(objectIds).size === objectIds.length;
        },
        message: 'Confirmations array must contain unique ObjectIds'
      }
    }
  },
  {
    timestamps: true,
  }
);

export const ConfirmationForm = mongoose.model('confirmationModel', confirmationFormSchema);