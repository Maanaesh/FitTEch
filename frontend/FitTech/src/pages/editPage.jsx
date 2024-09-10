import React from 'react'
import { useParams } from 'react-router';

function EditPage() {
    const {id} = useParams();
    console.log(id);
  return (
    <div>Edit</div>
  )
}

export default EditPage;