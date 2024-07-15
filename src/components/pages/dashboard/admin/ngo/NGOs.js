import React, { useEffect, useState } from 'react';
import { getAllNGO, getPendingNGO, validateNGO } from "../../../../../api/NGO";
import NGOHolder from "./NGOHolder";

export default function NGOs() {
    const [ngos, setNGOs] = useState([])

    useEffect(() => {
        setNGOs([])
        getAllNGO().then(ngosData => {
            setNGOs(ngosData)
        })
    }, []);

    return (
        <>
            {ngos.length === 0 ? (
                <div className='d-flex justify-content-center align-items-center' style={{marginTop: "200px", fontSize: "20px"}}>

                <p style={{font: "50px", fontWeight: ""}}>There are no NGOs registered.</p>
                                </div>
            ) : (
                <div className="container mt-4 row">
                    {ngos.map(ngo => {
                        return <NGOHolder user={ngo} key={ngo._id} />
                    })}
                </div>
            )}
        </>
    );
}