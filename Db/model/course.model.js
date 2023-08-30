

import mongoose, {Schema,Types,model} from 'mongoose';
const courseSchema = new Schema ({
    Name:{
        type:String,
        required:[true,'userName is required'],
        unique:true
    },
    sluge:{
        type:String,
        required:true
    },
    superviser:{
        type:Types.ObjectId,
        ref:'Superviser',
        
    },
    numberofSeat:{
        type:Number,
        required:true
    },
    numberofHours:{
        type:Number,
        required:true
    },
    timeOfLecture:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    deleted : {
        type : Boolean,
        default : false
    },
    addedBy:{
        type:Types.ObjectId,
        ref : 'Superviser'
    },
    updatedBy:{
        type:Types.ObjectId,
        ref : 'Superviser'
    }
   

},
{
    timestamps:true
})
const courseModel = mongoose.models.Course ||  model('Course',courseSchema);
export default courseModel;