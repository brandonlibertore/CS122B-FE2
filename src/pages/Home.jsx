import React from "react";
import styled from "styled-components";
import {myRequest} from "backend/idm";
import {useUser} from "../hook/User";
import {useForm} from "react-hook-form";

import "Home.css";

const StyledDiv = styled.div` 
`

const StyledH1 = styled.h1`
`

const Home = () => {

    const [posts, setPosts] = React.useState([]);

    const [pages, setPages] = React.useState(1);

    const {register, getValues, handleSubmit} = useForm();

    const {
        accessToken, setAccessToken,
        refreshToken, setRefreshToken
    } = useUser();

    const updatePageBack = () => {
        if (pages > 1){
            setPages(pages - 1);
        }
        getMovies();
    }

    const updatePageNext = () => {
        setPages(pages + 1);
        getMovies();
    }

    const getMovies = () => {

        const title = getValues("title");
        const year = getValues("year");
        const director = getValues("director");
        const genre = getValues("genre");
        const limit = getValues("limit");
        const page = getValues("page");
        const orderBy = getValues("orderBy");
        const direction = getValues("direction");

        const queryParams = {
            title: title !== "" ? title : undefined,
            year: year !== "" ? year : undefined,
            director: director !== "" ? director : undefined,
            genre: genre !== "" ? genre : undefined,
            limit: limit !== "" ? limit : undefined,
            page: page !== "" ? page : pages,
            orderBy: orderBy !== "" ? orderBy : undefined,
            direction: direction !== "" ? direction : undefined
        }
        myRequest(accessToken, queryParams).then(response => setPosts(response.data.movies));
    };

    return (

        <div className={"row"}>
            <div>BRANDON LE LIBERTORE (BLIBERTO@UCI.EDU) - 11964315</div>
            <div className="column">Title:
                {posts.map(post =>
                    <div>
                        {post.title}
                    </div>)}
            </div>
            <div className="column">Year:
                {posts.map(post =>
                    <div>
                        {post.year}
                    </div>)}
            </div>
            <div className="column">Director:
                {posts.map(post =>
                    <div>
                        {post.director}
                    </div>)}
            </div>
            <div>
                <input{...register("title")}/> - Title
            </div>
            <div>
                <input{...register("year")}/> - Year
            </div>
            <div>
                <input{...register("director")}/> - Director
            </div>
            <div>
                <input{...register("genre")}/> - Genre
            </div>
            <div>
                <select {...register("limit")}>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                </select> - Items per Page
            </div>
            <div>
                <input{...register("page")}/> - Page
            </div>
            <div>
                <select {...register("orderBy")}>
                    <option>title</option>
                    <option>rating</option>
                    <option>year</option>
                </select> - Sort By
            </div>
            <div>
                <select {...register("direction")}>
                    <option>ASC</option>
                    <option>DESC</option>
                </select> - Sort Direction
            </div>
            <div>
                <button onClick={() => updatePageBack()}>Back</button>
                <button onClick={() => updatePageNext()}>Next</button>
            </div>
            <button onClick={getMovies}>Get Movies!</button>
        </div>
    );
}

export default Home;
