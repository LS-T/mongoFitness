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
        .then((workoutDuration) => {
            res.json(workoutDuration);
        })
        .catch((err) => res.json(err));
});

// Post a workout
router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then((newWorkout) => {
            res.json(newWorkout);
        })
        .catch((err) => res.json(err));
});






module.exports = router;