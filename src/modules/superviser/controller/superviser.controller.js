import courseModel from "../../../../Db/model/course.model.js";
import SuperviserModel from "../../../../Db/model/superviser.model.js";

export const createSuperviser = async(req,res,next)=>{


const checkSuperviser= await SuperviserModel.findOne({email:req.body.email});

if(checkSuperviser){
    return next(new Error("this superviser ia alredy exist",{cause:400}))
}

const superviser = await SuperviserModel.create(req.body);

return res.status(201).json({message:"success",superviser});

}
export const updateSuperviser= async(req,res,next)=>{
     const {superviserId}= req.params;
     
     if(req.body.userName){
        const checkSuperviser = await SuperviserModel.findOne({userName:req.body.userName})
        if(checkSuperviser){
            return next(new Error(`this name "${req.body.userName}" already exist `))
        }
     }

     if(req.body.email){
        const checkSuperviser = await SuperviserModel.findOne({email:req.body.email})
        if(checkSuperviser){
            return next(new Error(`this email "${req.body.email}" already exist `))
        }


     }
    let {courses}=req.body;
    
    const superviser= await SuperviserModel.findById(superviserId);
    
         
    
     for(const course of courses){

         if(!await courseModel.findById(course.courseId)){

            return next(new Error(`this course ${course.courseId} is not avaliable`,{cause:400}));
         }

        if(superviser.courses.includes(course)){
            return next(new Error(`this course is already exist`,{cause:400}));

        }

        const checkSuperviser= await SuperviserModel.findOne({ "courses.courseId" : course.courseId});
        
         if(checkSuperviser){
          
        return next(new Error(`this course is already added to superviser ${checkSuperviser.userName}`,{cause:400}));
              }
              

   }
   
   const updateSuperviser = await SuperviserModel.findOneAndUpdate({_id:superviserId},{$addToSet:{courses:courses}},{new:true});
   
   return res.json(updateSuperviser)
}

export const deleteCourse = async(req,res,next)=>{
   
   const {superviserId} = req.params
    const {courses} = req.body;
    
   for(const course of courses){

    const updateSuperviser = await SuperviserModel.findOneAndUpdate({_id:superviserId},{$pull:{courses:course}},{new:true})
    req.body.updateSuperviser = updateSuperviser

   }
    

    return res.json(req.body.updateSuperviser)

}

export const deleteSuperviser= async(req,res,next)=>{
    const {superviserId} = req.params

    const deleteSuperviser = await SuperviserModel.findOneAndDelete({_id:superviserId});
    if(!deleteSuperviser){
        return next(new Error("there is problem in delete superviser",{cause:400}))
    }

    return res.status(200).json({message : "success"})
}