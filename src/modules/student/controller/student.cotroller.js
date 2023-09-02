import courseModel from "../../../../Db/model/course.model.js";
import StudentModel from "../../../../Db/model/student.model.js";
import SuperviserModel from "../../../../Db/model/superviser.model.js";

export const  creatStudent = async(req,res,next)=>{
    
    const {courseId} = req.params;
    if(!await courseModel.findById(courseId)){
        return next(new Error("invalied course",{cause:404}))
    }
    
    const courses = [];
   if(courses.includes(courseId)){
    return next(new Error('this student is alredy in this course'))
   }
   courses.push(courseId)
   req.body.courses = courses;
  
   req.body.addedBy = req.user.id;
   req.body.updatedBy = req.user.id;

    const student =await StudentModel.create(req.body);
   
    return res.status(201).json({message:"success",student})

}

export const updateStudent = async(req,res,next)=>{
    
    const {studentId} = req.params
    
    req.body.updatedBy = req.user.id;

     const updateStudent= await StudentModel.findOneAndUpdate({_id:studentId},req.body,{new:true})

     if(!updateStudent){
        return next(new Error("there is problem in updating student,invalied student id",{cause:400}))
     }

     return res.status(200).json({message:"success",updateStudent})
}
export const getStudent= async(req,res,next)=>{
    const {studentId} = req.params;
   
    const student = await StudentModel.find({_id:studentId}).populate({
        path:'courses',
        select: 'Name'
    });
    if(!student){
        return next(new Error("invalied student id",{cause:400}))
    }
    return res.status(200).json({message:"success",student});
}
export const getAllStudents= async(req,res,next)=>{
    
    const students = await StudentModel.find({})
    return res.status(200).json({message:"success",students})

}
export const deleteStudent = async(req,res,next)=>{
    const {studentId} = req.params;
    const{ courseId}= req.params
    const Student = await StudentModel.findOneAndUpdate({_id:studentId},{$pull:{courses:courseId}},{new:true})
    if(!Student){
        return next(new Error("ther is a problem in deleting student from this course,invalied id",{cause:400}))
    }
   
    return res.json({message:"success", Student})
}