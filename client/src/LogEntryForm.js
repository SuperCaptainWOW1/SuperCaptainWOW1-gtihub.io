import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { createLogEntry } from "./API";

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit } = useForm()

  const onSubmit = async data => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      
      createLogEntry(data);
      onClose();
    } catch (e) {
      console.error(e);
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entryForm">
      { error ? <h3>{error}</h3> : null }
      <label htmlFor="title">Title</label>
      <input name="title" type="text" ref={register} required/>

      <label htmlFor="comments">Comments</label>
      <textarea name="comments" rows="3" type="text" ref={register}/>

      <label htmlFor="description">Description</label>
      <textarea name="description" rows="3" type="text" ref={register}/>

      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" ref={register} required/>

      <button type="submit" disabled={loading}>{ loading ? 'Loading...' : 'Create entry' }</button>
    </form>
  )
}


export default LogEntryForm;