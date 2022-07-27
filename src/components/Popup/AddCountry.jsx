import React, { useState } from 'react'
import './addcountry.css'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import Countries from '../Menu/Countries'
  
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
                            }}
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
                        <button className="button" onClick={e => onSubmit(e)} type="submit">Thêm Quốc Gia</button>
                        <button className="button" onClick={cancelAdd}>Hủy</button>
                    </div>
                </Form>
            </Formik>
      </div>
    
  )
}

export default AddCountry