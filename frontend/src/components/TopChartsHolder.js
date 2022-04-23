import PopularActors from "./PopularActors";
import PopularMovies from "./PopularMovies";
import TopRevenueMovies from "./TopRevenueMovies";
import TopBudgetMovies from "./TopBudgetMovies";

function TopChartsHolder() {
  return <>
            <div>
                <h3>Most Popular Actors</h3>
                <PopularActors />
            </div>
            <div>
                <h3>Most Popular Movies</h3>
                <PopularMovies />
            </div>
            <div>
                <h3>Top Grossing Movies</h3>
                <TopRevenueMovies />
            </div>
            <div>
                <h3>Most Expensive Movies</h3>
                <TopBudgetMovies />
            </div>
        </>
}

export default TopChartsHolder;
