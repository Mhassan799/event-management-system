const activityModel = require('../model/activityModel')


const activityController = {
    async addAdmin(req,res){
        try {
            const {creator,status,timeStamp} = req.body
            

            const newAdmin = new activityModel({
                creator,status,timeStamp
            })
            await newAdmin.save()

            res.status(200).send({
                success:true,
                message:"admin created succesfully"
            })
        } catch (error) {
            console.log(error)
            res.status(400).send({
                success:false,
                message:"somethig went wrong",
                error:error.message
            })

        }
    },

    async checkActivity(req,res){
        try {
            // const creator = req.query.creator
            const startDate = req.query.startDate
            const endDate = req.query.endDate

            // const date = req.query.date
            // const timsStampDate = date.getTime()

            const startTimestamp = new Date(startDate).getTime();
            const endTimestamp = new Date(endDate).getTime(); 


            const activities = await activityModel.find({
                timeStamp: {
                    $gte: startTimestamp,
                    $lte: endTimestamp
                }
            }).distinct("creator");

            let postCounts= {}




            activities.forEach(activity => {
                const creator = activity.creator;
                if (postCounts[creator]) {
                    postCounts[creator]++;
                } else {
                    postCounts[creator] = 1;
                }
            });

            const postCountsArray = Object.keys(postCounts).map(creator => ({
                creator,
                "post counts": postCounts[creator]
            }));
            



            if(activities.length === 0){
                return res.status(400).send({
                    success:false,
                    message:"no user found"
                })
            }
            else{
            res.status(200).send({
                success:true,
                message:`activvity got succesfully `,
                activities,
                postCounts:postCountsArray
            })
        }
        } catch (error) {
            console.log(error)
            res.status(400).send({
                success:false,
                message:"somethig went wrong",
                error:error.message
            })
        }
    }
}


module.exports = activityController