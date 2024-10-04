const express=require('express')
const router=express.Router()

router.get("/",(req,res)=>{
    res.json({message:"Hello from API"})
})

module.exports=router