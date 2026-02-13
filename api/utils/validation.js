const Ajv =require('ajv');
const ajv=new Ajv({allErrors: true});
const schema={
    type: "object",
    properties:{
        summary:{type: "string"},
        priority:{type: "string", enum:["low","medium","high"]},
        helpfulNotes:{type: "string"},
        relatedSkills:{type: "array",items: {type: "string"}}
    },
    required:["summary","priority","helpfulNotes","relatedSkills"],
    additionalProperties: false
}

const validate=ajv.compile(schema);

exports.ValidateRepsonse =(data)=>{
const isValid=validate(data);
if(!isValid){
    return null;
}
 return data
}