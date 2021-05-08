const router = require("express").Router();
const { reverse } = require("methods");
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
router.post('/api/workouts', ({ body }, res) => {
    db.Workout.create(body)
        .then((newWorkout) => {
            res.json(newWorkout);
        })
        .catch((err) => res.json(err));
});


router.put('/api/workouts/:id', ({ body, params}, res) => {
    db.Workout.findByIdAndUpdate(
        params.id,
        // push into exercises array in the workout collection
        {$push: { exercises: body }},
        // Set new to true to return modified document rather than the original
        {new: true }
    )
        .then((updatedWorkout) => {
            res.json(updatedWorkout)
        })
        .catch((err) => res.json(err));
});



// Get total duration of workouts from last 7 days
router.get(`/api/workouts/range`, (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {$sum: '$exercises.duration' },
            }
        }
    ])
    // sort from descending id_ , and limit it to 7 workouts
    .sort({_id: -1})
    .limit(7)
    .then((workout) => {
        mostRecent = workout.reverse();
        res.json(mostRecent);
    })
    .catch((err) => res.json(err))
});









module.exports = router;