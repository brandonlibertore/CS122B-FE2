import React from "react";
import {useUser} from "hook/User";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {registerUser} from "backend/idm";
import { useNavigate } from 'react-router';


const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledH1 = styled.h1`
`

const StyledInput = styled.input`
`

const StyledButton = styled.button`
`

const Register = () => {
    const {
    } = useUser();

    const navigate = useNavigate(); // We can set and get our query params with this

    function moveToDetail(response){
        navigate("/login");
        alert(JSON.stringify(response.data, null, 2))
    }

    const {register, getValues, handleSubmit} = useForm();

    const submitRegister = () => {
        const email = getValues("email");
        const password = getValues("password");

        const payLoad = {
            email: email,
            password: password.split('')
        }

        registerUser(payLoad)
            .then(response => moveToDetail(response))
            .catch(error => alert(JSON.stringify(error.response.data, null, 2)))

    }

    return (
        <StyledDiv>
            <h1>Register</h1>
            <input {...register("email")} type={"email"}/>
            <input {...register("password")} type={"password"}/>
            <button onClick={handleSubmit(submitRegister)}>Register</button>
        </StyledDiv>
    );
}

export default Register;
