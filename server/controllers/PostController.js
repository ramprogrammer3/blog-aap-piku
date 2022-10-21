
const formidable = require('formidable');
module.exports.createPost = (req, res) =>{
    const form = formidable({ multiples: true });
    form.parse(req, (error, fields,files)=>{
        const {title,body, desc,slug,id, user} = fields;
        const errors =[];
        if(title===""){
            errors.push({msg : "Title is required "})
        }
        if(body===""){
            errors.push({msg : "body is required "})
        }
        if(desc===""){
            errors.push({msg : "descripton  is required "})
        }
        if(slug===""){
            errors.push({msg : "slug  is required "})
        }
        if(errors.length !== 0){
            return res.status(400).json({errors})
        }
    })
}