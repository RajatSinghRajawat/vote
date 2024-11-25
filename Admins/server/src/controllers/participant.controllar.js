const {z} = require('zod');
const { participantModel } = require("../models/participant.model");


const userZ1 = z.object({
    name:z.string(),
    email:z.string(),
    city:z.string(),
    state:z.string(),
    popularity:z.number(),
    age:z.number()
})

const addparticipants = async (req, res) => {
    try {
        userZ1.parse(req.body)
        const {image, name, email, age, popularity, city, state } = req.body;

        const partcipantAdduser = participantModel.create({
           image, name, email, city, state, popularity, age
        })
        res.send({ status: "true", partcipantAdduser })

    } catch (error) {
        return res.status(500).json({ status: "false", error: "Not found" });

    }

}

const getParticipant = async(req,res)=>{
    try {
        const response = await participantModel.find({});
        return res.status(200).json({
            status:true,
            patricipants:response
        })
    } catch (error) {
        return res.status(500).json({ status: "false", error: "Error while fetching participants" });
    }
}

const updateparticipants = async(req,res)=>{

    const userId = req.params.id;
    const {image , name, email, age, popularity, city, state } = req.body;
    const getUser = await participantModel.findOne({_id:userId})
    const newPopulation = getUser.popularity+1
   
    
    // const { popularity} = req.body;
    const updateuser = await participantModel.findByIdAndUpdate(userId,{popularity:newPopulation , image , name , email,age,city , state})
    res.send({status:"true",updateuser })


}


const deleteparticipants = async(req,res)=>{
    const userId = req.params.id;

  try {

    const deletuser = await participantModel.findByIdAndDelete({_id:userId})

    if (!deletuser) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send({ 
        message: 'User deleted successfully', 
        deletuser 
      });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting user', error });
    // console.error(error);

  }
   
 
}






module.exports = {
    addparticipants,
    getParticipant,
    updateparticipants,
    deleteparticipants
};
