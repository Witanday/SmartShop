const formidable = require("formidable");
const _= require("lodash");
const {errorHandler}= require("../helpers/dbErrorHandler");
const Product = require("../models/product");
const fs = require("fs");


exports.create=(req,res)=>{
 let form = new formidable.IncomingForm();
 form.keepExtensions=true;
 form.parse(req,(err,fields,files)=>{
     if(err){
         return res.status(400).json({
             error:'Image could not be uploaded'
         })
     }
     // check for all fields
     const {name, description, price, category, quantity} = fields ;
     console.log(name, description, price, category, quantity)
     if(!name||!description||!price||!category||!quantity){
         return res.status(400).json({
             error:"All fields are required"
         })
     }
     let product = new Product(fields);
     if(files.photo){
        //photo size restriction
        if(files.photo.size>1000000){
            return res.status(400).json({
                error:"Image should be less than 1mb in size"
        })}
         product.photo.data = fs.readFileSync(files.photo.path);
         product.photo.contentType = files.photo.type;
     }
     product.save((err,result)=>{
         if(err){
             return res.status(400).json({
                 error:errorHandler(err)
             })
         }
         res.json(result)
     })
 })
}


exports.productById= (req,res,next,id)=>{
    Product.findById(id).exec((err, product)=>{
        if(err ||!product ){
            return res.status(400).json({
                error:"Product not found"
            });
        }
   

    req.product= product;
    next()
})
}


exports.read=async (req,res)=>{
    req.product.photo = undefined;

    return await res.json(req.product)
}

exports.remove=async (req,res)=>{
    let product = req.product
    await product.remove((err, deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        res.json({
           
            message:`Product with Id= ${ deletedProduct._id} was deleted successfully `

        })
    })
  
}


exports.update=(req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error:'Image could not be uploaded'
            })
        }
        // check for all fields
        const {name, description, price, category, quantity} = fields ;
        console.log(name, description, price, category, quantity)
        if(!name||!description||!price||!category||!quantity){
            return res.status(400).json({
                error:"All fields are required"
            })
        }
        let product = req.product;

        product = _.extend(product, fields)
        if(files.photo){
           //photo size restriction
           if(files.photo.size>1000000){
               return res.status(400).json({
                   error:"Image should be less than 1mb in size"
           })}
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        product.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }
            res.json(result)
        })
    })
   }
   