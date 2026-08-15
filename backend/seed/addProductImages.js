require('dotenv').config({path:require('path').join(__dirname,'..','.env')});
const connect=require('../config/db'),Product=require('../models/Product');
const images={
  'Running Shoes':'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
  'Classic Watch':'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',
  'Casual T-Shirt':'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85',
  'Wireless Headphones':'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
  'Denim Jeans':'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85',
  'Leather Belt':'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=900&q=85',
  'Sports Cap':'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85',
  'Sports Sneakers':'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=85'
};
connect().then(async()=>{const updates=await Promise.all(Object.entries(images).map(([name,image])=>Product.updateOne({name},{$set:{image}})));console.log(`Updated ${updates.reduce((count,item)=>count+item.modifiedCount,0)} product images`);process.exit()}).catch(error=>{console.error(error);process.exit(1)});
