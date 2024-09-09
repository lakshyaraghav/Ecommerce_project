import React, { useEffect, useState } from 'react'
// import Test from './test.json'

const ApiCheck = () => {

    // const [data, setData] = useState([]);
    // const [name, setName] = useState([]);
    // const [job, setJob] = useState([]);

    // useEffect(()=>{
    //     fetch('https://reqres.in/api/users?page=2').then((response)=>{
    //         return response.json();
    //     }).then((result)=>{
    //         console.log(result.data)
    //         setData(result.data);
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    // },[])

    //     const handleSubmit=()=>{


    //     const requestData={
    //         name:name,
    //         job:job
    //     }



    //         fetch('https://reqres.in/api/users',{
    //             method:'PUT',
    //             headers:{
    //                 'Content-Type':'application/json',
    //             },
    //             body: JSON.stringify(requestData),
    //         }).then((response)=>{
    //             return response.json()
    //         }).then((data)=>{
    //             console.log(data)
    //         })


    // }


    // useEffect(() => {
    //     fetch(Test).then((response) => {
    //         return response.json();
    //     }).then((result) => {
    //         console.log(result.data)
    //         setData(result.data);
    //     })
    // }, [])

    useEffect(()=>{
        fetch('test.json').then((res)=>{
            return res.json()
        }).then((result)=>{
            console.log(result)
        })
    },[])


    return (
        <div>
          

        </div>
    )
}

export default ApiCheck