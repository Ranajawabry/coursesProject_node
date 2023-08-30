import mongoose, {Schema,Types,model} from 'mongoose';
const offerSchema = new Schema ({
   
    Name:{
        type:String,
        required:true,
        unique:true
    },
    amount:{
        type: Number,
        default:1,

    },

    expireDate:{
        type:String,
        required:true
    },
    
    usedBy:[{type:Types.ObjectId , ref:'User'}],
   
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    updatedBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    }
},
{
    timestamps:true,

})
const offerModel = mongoose.models.Offer||  model('Coupon', offerSchema);
export default offerModel;