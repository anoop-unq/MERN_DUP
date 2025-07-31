// models/Guest.js
import mongoose from 'mongoose';


const guestSchema = new mongoose.Schema({
  guestId: { type: String,  unique: true },
  name : {
    type:String,

  },
  isGuest:{
    type:Boolean,
  },
   taskList: [
          {
              type: mongoose.Schema.ObjectId,
              ref: "task",
          },
      ],
});



const Guest = mongoose.model('Guest', guestSchema);
export default Guest;
