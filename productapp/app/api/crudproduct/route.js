import connectDB from "@/libs/connectDB";
import Products from "@/models/Products";
import mongoose from "mongoose";
import {NextResponse } from "next/server";

export async function POST(request){
    const {productname,category,image,price,description} = await request.json();
    await connectDB()
    const result = await Products.findOne({productname:productname})
    if(result){
        return NextResponse.json({message:"Product already exist"},{status:409})
    }else{
        Products.create({productname,category,image,price,description})
        return NextResponse.json({message:"Product created Succesfully",data:result},{status:201})
    }
}

export async function PUT(request){
    const {productname,category,image,price,description} = await request.json();
    await connectDB()
    const product = await Products.findOne({productname:productname})
    if (product) {
      // Update the properties of the product object
      product.productname = productname;
      product.category = category;
      product.image = image;
      product.price = price;
      product.description = description;
  
      // Save the updated product object
      const res = await product.save()
      if(res){
        return NextResponse.json({message: 'Product Successfully Updated',data:product},{status:201})
      }else{
        return NextResponse.json({message: 'Product upload Failed'},{status:201})
      }
    } else {
      return NextResponse.json({message: 'Product upload Failed'},{status:201})
    }

}

export async function GET(req){
    const { searchParams } = new URL(req.url);
    var query = searchParams.get("query");
    var prop = query?.slice(0,1);
    query  = query?.slice(2,query.length);
    await connectDB()
    var data;
    if(prop==='s'){
      data = await Products.find({productname:{$regex:query,$options:'i'}})
      if(!data){
        return NextResponse.json({data:'Nothing found'},{status:201})
      }
    }else if(prop==='c'){
      data = await Products.find({category:{$regex:query,$options:'i'}})

      if(!data){
        return NextResponse.json({data:'Nothing found'},{status:201})
      }
    }else{
      data = await Products.find({})
    }
    return NextResponse.json({data:data},{status:201})

    
}

export async function DELETE(req){
  const { searchParams } = new URL(req.url);
  var id = searchParams.get("id");
  await connectDB()
  const product = await Products.findOne({productname:id})
  if (product) {
    // Delete the Product
    const res = await Products.deleteOne({_id:product._id})
    console.log(res)
    // run check
    if(res){
      return NextResponse.json({message: 'Product Deleted Successfully'},{status:201})
    }else{
      return NextResponse.json({message: 'Product Delete Failed'},{status:201})
    }
  } else {
    return NextResponse.json({message: 'Product Delete Failed'},{status:201})
  }

}