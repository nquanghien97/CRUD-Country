import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom'

function EditCountry(props) {

  // const {setShowEdit} = props

  const { id } = useParams()

  const navigate = useNavigate()

  const [country, setCountry] = useState({
    name: "",
    code: "",
    des: ""
  });

  useEffect(() => {
    const getCountry = async () => {
      try {
        const country = await axios.get(`https://62a591d8b9b74f766a3ba5db.mockapi.io/api/country/${id}`)
        setCountry(country.data)
      } catch (error) {
        console.log("SOmething is Wrong")
      }
    }
    getCountry()
  }, [id]);

  const handleChange = (e) => {
    setCountry({
      ...country,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    try {
      await axios.put(`https://62a591d8b9b74f766a3ba5db.mockapi.io/api/country/${id}`, country)
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
    des: Yup.string()
      .required('Trường này là bắt buộc'),
  });

  const initialValues = {
    name: '',
    code: '',
    des: '',
  };

  return (
    <div className="form-container">
          <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          >
              <Form className="form">
                  <div className="form-field">
                      <Field
                          placeholder="Quốc Gia"
                          className="input"
                          value={country.name}
                          label="Quốc Gia"
                          name="name"
                          onChange={e => {
                            handleChange(e)
                            console.log(e.target.value)
                          }}
                          required
                      />
                      <Field
                          placeholder="Mã"
                          className="input"
                          value={country.code}
                          label="Mã"
                          name="code"
                          onChange={e => {
                              handleChange(e)
                              console.log(e.target.value)
                            }
                          }
                          required
                      />
                      <Field
                          placeholder="Mô tả"
                          className="input"
                          value={country.des}
                          label="Mô tả"
                          name="des"
                          onChange={e => {
                            handleChange(e)
                            console.log(e.target.value)
                          }}
                          required
                      />
                  </div>
                  <div className="form-button">
                      <button className="button" onClick={onSubmit} type="submit">Xác nhận</button>
                      <button className="button" onClick={handleClick}>Hủy</button>
                  </div>
              </Form>
          </Formik>
    </div>
  )
}

export default EditCountry