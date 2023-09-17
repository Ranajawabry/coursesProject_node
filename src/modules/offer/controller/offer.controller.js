
import offerModel from "../../../../Db/model/offer.model.js";

export const creatOffer= async(req,res,next)=>{

    const offer = await offerModel.findOne({Name:req.body.Name});
   
    if(offer){
        return next(new Error("this offer name is already exist",{cause:400}));
    }

  let date = Date.parse(req.body.expireDate);
  const convertDate= new Date(date);

  req.body.expireDate=convertDate.toLocaleDateString();
  let now = new Date().getTime();
  
  if(now > convertDate.getTime()){

      return next(new Error("invalird expire date",{cause:400}));

    }
    
   

    req.body.createdBy=req.user.id;
    req.body.updatedBy=req.user.id;

    const newoffer= await offerModel.create(req.body)
    return res.status(201).json({message:"success",newoffer});
}

export const updateOffer=async(req,res,next)=>{
    const {offerId}= req.params;
    
    if(req.body.expireDate){
       
        let date = Date.parse(req.body.expireDate);
        const convertDate= new Date(date);
         req.body.expireDate=convertDate.toLocaleDateString();
        
         let now = new Date().getTime();
  
        if(now > convertDate.getTime()){

             return next(new Error("invalird expire date",{cause:400}));

          }
    
    }
    req.body.updatedBy= req.user.id;
    const offer =await offerModel.findByIdAndUpdate({_id:offerId},req.body,{new:true});
    return res.status(201).json({message:"success",offer});
}

export const getOffer= async(req,res,next)=>{
    const {offerId}= req.params;
    const offer = await offerModel.findById(offerId);
    if(!offer){
        return next(new Error("invalid id ,this offer is not exist",{cause:400}));
    }
    return res.status(200).json({message:"success",offer});
}
export const getAllOffer= async(req,res,next)=>{
    
    const offers = await offerModel.find();
  
    return res.status(200).json({message:"success",offers});
}
export const deleteOffer = async(req,res,body)=>{
    
   const {offerId} = req.params;
   const deleteOffer = await offerModel.findByIdAndDelete(offerId);
   if(!deleteOffer){
    return next (new Error("invalied id,this offer is not exist",{cause:400}));
   }
   return res.status(200).json({message:"success"});
}