const cloudinary = require('cloudinary').v2;
const fs = require('fs');




          
cloudinary.config({ 
  cloud_name: process.env.CLOUDNAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

const UploadOnCloudninary=async(localFilePath)=>
{
    try
    {
        if(!localFilePath)
        {
            return null;

        }
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:'image',
        })
        console.log("file is uploaded in cloudniary",response.url);
        return response;

    }
    catch(error)
    { 
        fs.unlinkSync(localFilePath);
        return null;

    }

}

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {
//     console.log(result); 
// });


module.exports=UploadOnCloudninary;