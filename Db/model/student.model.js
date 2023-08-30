

import mongoose, {Schema,Types,model} from 'mongoose';
const studentSchema = new Schema ({
    userName:{
        type:String,
        required:[true,'userName is required'],
        min:[2],
        max:[20]
    },
    email:{
        type:String,
        ref : 'User'
    },
    phone:{
        type:String
    },
    status:{
        type:String,
        default:'Active',
        enum:['Active','Not-Active']
    },
    gender:{
        type:String,
        enum:['Male','Female']
    },
    address:{
        type:String
    
    },
    courses:{
       type: [{
        type:Types.ObjectId,
        ref : 'Course'
    }     
    ]},
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
const StudentModel = mongoose.models.Student ||  model('Student', studentSchema);
export default StudentModel;