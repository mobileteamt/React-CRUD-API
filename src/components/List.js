import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import config from '../Config'
import Swal from 'sweetalert2'
let baseURL = config.baseURL;

export default function List() {
    
    const URL = baseURL +"blog?orderBy=id&order=desc";
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = () => {
        fetch(URL,{
            method: 'GET',
            headers: {'content-type':'application/json'},
        })
        .then(response => response.json())
        .then((res) => {
            if(res.length>0){
                setData(res);
                setIsLoading(false);
            }
            else{
                setData("");
                setIsLoading(false);
            }    
        })
        .catch(error => console.error('Error:', error))
    }

    const deleteBlog = (e, id) =>{
        e.preventDefault();

        Swal.fire({
            text: "Are you really want to delete this blog?",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#878787",
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(baseURL+'blog/'+ id,{
                    method: 'DELETE',
                    headers: {'content-type':'application/json'},
                })
                .then(response => response.json())
                .then((res) => {
                   if(res){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Blog deleted successfully.",
                            icon: "success"
                        });
                        fetchData();
                    }
                    else{
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong!",
                            icon: "error"
                        });
                    }    
                })
                .catch(error => console.error('Error:', error))
            }
        });
    }

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, [])

    return (
    <>
        {isLoading ? <Loader/> : null}
        <div className="d-flex justify-content-between align-items-center heading-multi">
            <h4 className="headings pb-0">Blogs</h4>
            <Link to="/create" className="btn btn-success">Add New</Link>
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data ? 
                    (data.map((obj, index) =>{
                        return(
                            <tr key={index}>
                                <td>{obj.id}</td>
                                <td>{obj.name}</td>
                                <td>
                                    <Link to={`/blog/${obj.id}`} type="button" className="btn btn-sm btn-success mx-1">View</Link>
                                    <Link to={`/update/${obj.id}`} type="button" className="btn btn-sm btn-info mx-1 text-white">Edit</Link>
                                    <button type="button" className="btn btn-sm btn-danger mx-1" onClick={(e) => deleteBlog(e, obj.id)}>Delete</button>
                                </td>
                            </tr> 
                        );
                    }))
                    : (<tr><td colSpan={3} className="text-center">No data found!</td></tr>)
                }
            </tbody>
        </Table>
    </>
  )
}
