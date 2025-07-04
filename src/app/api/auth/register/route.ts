import { validateRegisterData } from "@/actions/auth";
import { NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/database";
import bcrypt from 'bcryptjs' 


export async function POST( request : Request){
  const { username, email, password, confirmPassword} = await request.json();

  const valid = await validateRegisterData({username, email, password, confirmPassword});

  if(!valid.ok){
    return NextResponse.json({
      ok:false,
      message: "Invalid user data",
      
    },{status: 403})
  }

  await dbConnect();

  const userExists = await User.findOne({email: email});
  if(userExists){
    return NextResponse.json({
      ok:false,
      message: "User already exists",
      
    },{status: 409})
  };

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role: "user"
  })

  await newUser.save();

  return NextResponse.json({
      ok:true,
      message: "User created",
      data: newUser.toJSON()
      
    },{status: 201})



  
    
}