const router = require("express").Router();
const { Workout } = require("../models");
const db = require("../models");

// get workouts 

router.get('/api/workouts', (req,res) => {
    Workout.aggregate ([
        {
            // add new field totalDuration to workout collection, equate it to the sum of exercise.duration
            $addFields: {
                totalDuration: { $sum: '$exercises.duration'},
            },

        }
    ])
        .then((previousWorkouts) => {
            res.json(previousWorkouts);
        })
        .catch((err) => res.json(err));
});




module.exports = router;