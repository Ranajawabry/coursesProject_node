import slugify from "slugify";
import courseModel from "../../../../Db/model/course.model.js"

export const creatCourse = async(req,res,next)=>{
    //////  الانتباه لاضافة 2 محاضرة لنفس الاستاذ بنفس الوقت
    const {Name}= req.body;
    const checkCourse= await courseModel.findOne({Name});
    if(checkCourse){
        return next(new Error("course already exist",{cause:400}))
    }

    req.body.sluge = slugify(Name);
   
    req.body.addeddBy = req.user.id;
    req.body.updatedBy = req.user.id;


    const newCourse = await courseModel.create(req.body);

    return res.status(201).json({message:"success", newCourse})



}
export const updateCourse = async(req,res,next)=>{

   const {courseId} = req.params;

    const checkCourse= await courseModel.findById(courseId);

    if(!checkCourse){
        return next(new Error("invallied id, course isnt exist",{cause:400}))
    }
    if(req.body.Name){
        req.body.sluge= slugify(req.body.Name)
    }

    req.body.updatedBy = req.user.id;

    const updateCourse = await courseModel.findOneAndUpdate({_id: courseId},req.body,{new:true});

    if(!updateCourse){
        return next(new Error("there is problem in update course",{cause : 404}))
    }

    return res.status(200).json({message:"success", updateCourse})



}
export const getCourse = async(req,res,next)=>{
    const {courseId}= req.params;
   
   
    const course = await courseModel.findOne({ _id:courseId , deleted :false});
    if(!course){
        return next(new Error("invalied id,course is not exist",{cause:400}))
    }

    return res.status(200).json({message:"success", course})
}
export const getAllCourses = async(req,res,next)=>{

     const courses = await courseModel.find({deleted : false})

     return res.status(200).json({message :"success", courses})
}
export const softDelete = async(req,res,next)=>{
    
    const {courseId}= req.params;
    const checkCourse = await courseModel.findOne({_id : courseId , deleted : false})
    
    if(!checkCourse){
        return next(new Error("can not delete this course", { cause:400}))
    }

    checkCourse.deleted = true;

    await checkCourse.save();
    return res.status(200).json({message:"success",checkCourse})
    

}
export const restore = async(req,res,next)=>{
    
    const {courseId}= req.params;
    const checkCourse = await courseModel.findOne({_id : courseId , deleted : true})
    
    if(!checkCourse){
        return next(new Error("can not restore this course", { cause:400}))
    }

    checkCourse.deleted = false;
    
    await checkCourse.save();
    return res.status(200).json({message:"success",checkCourse})
    

}
export const forceDelete = async(req,res,next)=>{
    const {courseId}= req.params;
    
    const deleteCourse = await courseModel.findOneAndDelete({_id : courseId , deleted : true});
   
    if(!deleteCourse){
        return next(new Error("can not delete this course", { cause:400}))
    }
    return res.status(200).json({message:"success",deleteCourse})
    
}
export const getAllSoftDeletedCourses = async(req,res,next)=>{

     const softDeletefCourses = await courseModel.find({ deleted: true});
   
     return res.status(200).json({message:"success",softDeletefCourses})
}