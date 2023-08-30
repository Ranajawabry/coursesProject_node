

import mongoose, {Schema,Types,model} from 'mongoose';
const superviserSchema = new Schema ({
    userName:{
        type:String,
        required:[true,'userName is required'],
        min:[2],
        max:[20]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        ref:'User'
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
        courseId:{ type:Types.ObjectId , ref : 'Course'}
    }     
    ]}
   

},
{
    timestamps:true
})
const SuperviserModel = mongoose.models.Superviser ||  model('Superviser', superviserSchema);
export default SuperviserModel;