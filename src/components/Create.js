import React from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import config from '../Config';
let baseURL = config.baseURL;

export default function Create() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(name == ''){
            Swal.fire({
                icon: "error",
                text: "Blog name is required.",
            });
            return false;
        }
        if(description == ''){
            Swal.fire({
                icon: "error",
                text: "Blog description is required.",
            });
            return false;
        }
        
        const payload = {
            name: name,
            description: description
        };

        fetch(baseURL + "blog",{
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then((res) => {
            if(res.id){
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Blog created successfully.",
                    showConfirmButton: false,
                });

                setTimeout(function(){
                    window.location.href = "/home";
                },1500);
            }
        })
        .catch(error => console.error('Error:', error))
    }

    return (
    <>
        <h4 className="headings pt-2">Create Blog</h4>
        <Form onSubmit={(e) => {handleSubmit(e)}} className="form-common">
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter blog name" onChange={(e)=>{setName(e.target.value)}} value={name}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Blog Description</Form.Label>
                <Form.Control as="textarea" placeholder="Enter blog description" rows={3} onChange={(e)=>{setDescription(e.target.value)}} value={description}/>
            </Form.Group>
            <Button variant="primary" type="submit" className="btn btn-success">Create</Button>
            <Link to="/home" className="btn btn-secondary mx-2">Back</Link>
        </Form>
    </>
  )
}
