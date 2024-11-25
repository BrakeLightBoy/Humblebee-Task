async function fetchData() {
  try{
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=g');
    const data = await response.json();
  
    const modifiedData = data.meals.map(({strMeal}) => ({ strMeal}));

    for(let i = 0; i < data.meals.length; i++){
      for(let j = 1; j <= 20; j++){
        if(data.meals[i][`strIngredient${j}`]){
          modifiedData[i][`strIngredient${j}`] = data.meals[i][`strIngredient${j}`];
          modifiedData[i][`strMeasure${j}`] = data.meals[i][`strMeasure${j}`];
        }
      }
    }
    return modifiedData;
  } catch (error) {
    console.error('Error: ', error);
  }
}

(async () => {
  const storedData = await fetchData();
  console.log(storedData);
})();