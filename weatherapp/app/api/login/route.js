import connectDB from "@/libs/connectDB";
import User from "@/models/user";
import {NextResponse } from "next/server";

export async function POST(request){
    const {email,password,country} = await request.json();
    await connectDB()
    const result = await User.findOne({email:email})
    if(result){
        return NextResponse.json({message:"Email already exist"},{status:409})
    }else{
        User.create({email,password,country})
        return NextResponse.json({message:"User created Succesfully",data:result},{status:201})
    }
}

export async function PUT(request){
    const {email,password} = await request.json();
    await connectDB()
    const result = await User.findOne({email:email})
    if(result && password===result.password){
        return NextResponse.json({message:"Welcome to My Weather App",data:result},{status:200})
    }else{
        return NextResponse.json({message:"Wrong Email or Password"},{status:401})
    }
}
