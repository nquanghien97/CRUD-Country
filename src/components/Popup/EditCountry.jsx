import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function EditCountry(props) {

  const {setShowEdit} = props

  const hideEdit = () => {
    setShowEdit(false)
  }

  const onSubmit = () => {
    setShowEdit(true)
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
                      <button className="button" type="submit">Xác nhận</button>
                      <button className="button" onClick={hideEdit}>Hủy</button>
                  </div>
              </Form>

          )}
          </Formik>
    </div>
  )
}

export default EditCountry