const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect("mongodb://127.0.0.1/Recipes")
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    try {
      const omelette = await Recipe.create({
        title: "omelette au fromage",
        level: "Easy Peasy",
        ingredients: ["6 eggs", "emmental", "salt", "butter"],
        cuisine: "French",
        dishType: "main_course",
        duration: 10,
      });
      //console.log(omelette.title);
      const allRecipes = await Recipe.create(data);
      for (const recipe of allRecipes) {
        //console.log(recipe.title);
      }

      const updatedRigatoni = await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 },
        { new: true }
      );

      const removeCarrotCake = await Recipe.deleteOne({ title: "Carrot Cake" });
      // setTimeout(() => {
      mongoose.disconnect();
      // }, 10000);
    } catch (error) {
      console.error("Problem with the recipes", error);
    }
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
