import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import config from '../Config';
import Swal from 'sweetalert2';
import Loader from './Loader'
let baseURL = config.baseURL;

export default function Update() {
    const { id } = useParams();
    const getBlogURL = baseURL+"blog/"+id;
    const updateURL = baseURL+"blog/"+id;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = () => {
        setIsLoading(true);
        fetch(getBlogURL,{
            method: 'GET',
            headers: {'content-type':'application/json'},
        })
        .then(response => response.json())
        .then((res) => {
            if(res){
                setName(res.name);
                setDescription(res.description);
                setIsLoading(false);
            }
        })
        .catch(error => console.error('Error:', error))
    }

    useEffect(() => {
        fetchData();
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: name,
            description: description
        };
        
        fetch(updateURL,{
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then((res) => {
            if(res){
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Blog updated successfully.",
                    showConfirmButton: false,
                });

                setTimeout(function(){
                    window.location.href = "/home";
                },1500);
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something went wrong!!",
                    showConfirmButton: false,
                });
            }
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <>
            {isLoading ? <Loader/> : null}
            <h4 className="headings pt-2">Update Blog</h4>
            <Form onSubmit={(e) => {handleSubmit(e)}} className="form-common">
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter blog name" onChange={(e)=>{setName(e.target.value)}} value={name}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Blog Description</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Enter blog description" onChange={(e)=>{setDescription(e.target.value)}} value={description}/>
                </Form.Group>
                <Button variant="primary" type="submit" className="btn btn-success">Update</Button>
                <Link to="/home" className="btn btn-secondary mx-2">Back</Link>
            </Form>
        </>
    )
}
