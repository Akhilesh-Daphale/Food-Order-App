import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import Mealtem from "./MealItem/MealItem";


function AvailableMeals() {

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    
    useEffect(() => {
        // useEffect function should not return a promise object hence this work around
        const fetchMeals = async () => {
            const response = await fetch("https://my-project-1b223-default-rtdb.firebaseio.com/meals.json");

            if(!response.ok) {
                throw new Error("Something went wrong!");
            }

            const responseData = await response.json();
            const loadedMeals = [];
            for(const key in responseData){
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                });
            }
            setMeals(loadedMeals);
            setIsLoading(false);
        }

        // This is bcz the fetchMeals return a promise and to handle error in promise we use catch
        fetchMeals().catch(error => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if(isLoading) {
        return (
            <section className={classes["meals-loading"]}>
                <p>Loading...</p>
            </section>
        );
    }

    if(httpError) {
        return (
            <section className={classes["meals-error"]}>
                <p>{httpError}</p>
            </section>
        );
    }

    const mealsList = meals.map((meal) => {
        return (
            <Mealtem 
                key={meal.id} 
                id={meal.id}
                name={meal.name} 
                description={meal.description} 
                price={meal.price}
            />
        );
    });

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
}

export default AvailableMeals;