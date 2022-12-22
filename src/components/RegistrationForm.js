import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { useDispatch } from 'react-redux'
import { setUser } from '../utils/slices/userSlice'
import { useNavigate } from "react-router-dom";

const genders = ["Male", "Female", "Transgender", "Non-binary", "Other"];
const races = ["White", "Black or African American", "American Indian or Alaska Native", "Asian", "Native Hawaiian or Other Pacific Islander", "Other"];

export default function RegistrationForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Variables
    let age;
    let race;
    let gender;

    const saveUser = () => {
        dispatch(setUser({ age, race, gender }));
        navigate("/color");
    }

    return (
        <Box
            component="form"
            autoComplete="off"
            p={15}
            >
            <Paper elevation={3}>
            <Stack spacing={2} direction="column" p={5}>
                <TextField
                    required
                    id="age"
                    type="number"
                    label="Age"
                    helperText="Please enter your age"
                    onChange={(e) => {age = e.target.value}}
                    />
                <TextField
                    required
                    id="gender"
                    select
                    label="Gender"
                    helperText="Please select your Gender"
                    onChange={(e) => {gender = e.target.value}}
                    >
                    {genders.map((option, key) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    required
                    id="race"
                    select
                    label="Race"
                    helperText="Please select your race"
                    onChange={(e) => {race = e.target.value}}
                    >
                    {races.map((option, key) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Button variant="contained" size="large" onClick={saveUser}>Continue</Button>
            </Stack>
            </Paper>
        </Box>
    )
}