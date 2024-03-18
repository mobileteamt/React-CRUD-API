import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import config from '../Config';
import Loader from './Loader'
import Swal from 'sweetalert2';
let baseURL = config.baseURL;

export default function Blog() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const URL = baseURL+"blog/"+id;

    const fetchData = () => {
        fetch(URL,{
            method: 'GET',
            headers: {'content-type':'application/json'},
        })
        .then(response => response.json())
        .then((res) => {
           if(res){
                setData(res);
                setIsLoading(false);
            }
            else{
                Swal.fire({
                    title: "Error!",
                    text: "No data found!",
                    icon: "error"
                });
            }    
        })
        .catch(error => console.error('Error:', error))
    }

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, [])

    return (
        <>
            {isLoading ? <Loader/> : null}
            <div className="d-flex justify-content-center justify-content-between mb-2">
                <h4 className="mb-0">{data.name}</h4>
                <Link to="/home" className="btn btn-secondary">Back</Link>
            </div>
            <p className="text-justify">{data.description}</p>
        </>
    )
}
