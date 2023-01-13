import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom'
import { TextField, Container, Grid, Button, Box, Typography } from '@mui/material';
import { getSingleCountry, updateCountry } from '../../services';

function EditCountry(props) {

  const { countryId } = useParams()

  const navigate = useNavigate()

  const [country, setCountry] = useState({
    name: "",
    code: "",
    description: ""
  });

  useEffect(() => {
    const getCountry = async () => {
      try {
        const country = await getSingleCountry(countryId)
        setCountry(country.data.Country)
      } catch (error) {
        console.log("SOmething is Wrong")
      }
    }
    getCountry()
  }, [countryId]);


  const handleChange = (e) => {
    setCountry({
      ...country,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    try {
      await updateCountry(countryId, country)
      navigate("/countries")
    } catch (error) {
      console.log("Something is Wrong")
    }
  }
  const handleClick = () => {
    navigate("/countries")
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Trường này là bắt buộc'),
    code: Yup.string()
      .required('Trường này là bắt buộc'),
    description: Yup.string()
      .required('Trường này là bắt buộc'),
  });

  const initialValues = {
    name: '',
    code: '',
    description: '',
  };

  return (
    <Container maxWidth={false} style={{display: "flex", height: "100vh", backgroundColor: "rgb(204, 204, 204, 0.9)"}}>
      <Box sx={{m:"auto"}}>
        <Grid
        display= "flex" 
        flexDirection= "column"
          alignItems="center"
          justifyContent="center"
          container
          xs={12}
          item
          style={{
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
                          onChange={e => {handleChange(e)}
                          }
                          required
                      />
                      <Field
                          fullWidth
                          sx={{mb:2}}
                          as={TextField}
                          value={country.description}
                          label="Mô tả"
                          name="description"
                          onChange={e => {handleChange(e)}}
                          required
                      />
                  </Grid>
                  <Grid item container alignItems="center" justifyContent="center" xs={12}>
                      <Button sx={{m:1}} variant="contained" onClick={onSubmit} type="submit">Xác nhận</Button>
                      <Button sx={{m:1}} variant="contained" onClick={handleClick}>Hủy</Button>
                  </Grid>
              </Form>
          </Formik>
        </Grid>
      </Box>
    </Container>
  )
}

export default EditCountry