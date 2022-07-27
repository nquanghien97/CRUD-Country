import React, { useState, useEffect } from 'react'
import './addcountry.css'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
  
function AddCountry(props) {

    const {setShowAdd, items, setItems} = props

    const cancelAdd = () => setShowAdd(false)

    const [input, setInput] = useState("");

    const AddNewCountry = (data) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        }
    fetch("https://62a591d8b9b74f766a3ba5db.mockapi.io/api/country", options)
        .then(res => res.json())
        .then(
            (result) => {
                setInput(result);
            },
            )
    }

    const onSubmit = (values) => {
        let formData = {
            name: values.name,
            code: values.code,
            des: values.des,
        }
        AddNewCountry(formData)
        cancelAdd()
        // items.push(formData)
        setInterval(() =>{
            window.location.reload();
        }, 500)
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
            {(props) => (
                <Form className="form">
                    <div className="form-field">
                        <Field
                            placeholder="Quốc Gia"
                            className="input"
                            value={props.values.name}
                            label="Quốc Gia"
                            name="name"
                            onChange={props.handleChange('name')}
                            required
                        />
                        <Field
                            placeholder="Mã"
                            className="input"
                            value={props.values.code}
                            label="Mã"
                            name="code"
                            onChange={props.handleChange('code')}
                            required
                        />
                        <Field
                            placeholder="Mô tả"
                            className="input"
                            value={props.values.des}
                            label="Mô tả"
                            name="des"
                            onChange={props.handleChange('des')}
                            required
                        />
                    </div>
                    <div className="form-button">
                        <button className="button" type="submit">Thêm Quốc Gia</button>
                        <button className="button" onClick={cancelAdd}>Hủy</button>
                    </div>
                </Form>

            )}
            </Formik>
      </div>
    
  )
}

export default AddCountry