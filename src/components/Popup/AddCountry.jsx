import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import Countries from '../Menu/Countries'
import { TextField, Container, Grid, Button, Box, Typography } from '@mui/material'

function AddCountry(props) {

    const {setShowAdd, status, setStatus} = props

    const cancelAdd = () => setShowAdd(false)

    const [country, setCountry] = useState({
        name: "",
        code: "",
        des: ""
    })

    const handleChange = (e) => {
        setCountry({
            ...country,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`https://62a591d8b9b74f766a3ba5db.mockapi.io/api/country`, country)
            setStatus(true)
        } catch (error) {
            console.log("Something is Wrong");
           }
        }
    if (status) {
        return <Countries />
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
          .required('Trường này là bắt buộc'),
        code: Yup.string()
          .required('Trường này là bắt buộc'),
        des: Yup.string()
          .required('Trường này là bắt buộc'),
      });
    
      const initialValues = {
        name: '',
        code: '',
        des: '',
      };

    return (
        <Container maxWidth={false} style={{padding: "0 16px", width: "100vw", height: "100vh", position:"absolute", backgroundColor: "rgb(204, 204, 204, 0.9)", zIndex:"100"}}>
            <Box>
                <Grid
                    alignItems="center"
                    justifyContent="center"
                    container
                    xs={11}
                    sm={11}
                    md={6}
                    item
                    style={{
                        position:"absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        padding: "28px",
                        border: "1px solid black",
                        borderRadius: "10px",
                        backgroundColor: "#94B49F"
                    }}
                >
                    <Typography variant="h4" sx={{mb:2}}>Thêm Quốc Gia</Typography>
                    <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    >
                        <Form className="form">
                            <Grid item xs={12}>
                                <Field
                                    fullWidth
                                    sx={{mb:2}}
                                    as={TextField}
                                    value={country.name}
                                    label="Quốc Gia"
                                    name="name"
                                    onChange={e => {handleChange(e)}}
                                    required
                                />
                                <Field
                                    fullWidth
                                    sx={{mb:2}}
                                    as={TextField}
                                    value={country.code}
                                    label="Mã"
                                    name="code"
                                    onChange={e => {handleChange(e)}}
                                    required
                                />
                                <Field
                                    fullWidth
                                    sx={{mb:2}}
                                    as={TextField}
                                    value={country.des}
                                    label="Mô tả"
                                    name="des"
                                    onChange={e => {handleChange(e)}}
                                    required
                                />
                            </Grid>
                            <Grid item container alignItems="center" justifyContent="center" xs={12}>
                                <Button sx={{m:1}} variant="contained" onClick={e => onSubmit(e)} type="submit">Thêm Quốc Gia</Button>
                                <Button sx={{m:1}} variant="contained" className="button" onClick={cancelAdd}>Hủy</Button>
                            </Grid>
                        </Form>
                    </Formik>
                </Grid>
            </Box>
      </Container>
    
  )
}

export default AddCountry