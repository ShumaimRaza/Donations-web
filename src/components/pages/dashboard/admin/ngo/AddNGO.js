import React, { useEffect, useState } from 'react';
import { getPendingNGO, validateNGO } from "../../../../../api/NGO";
import NGOHolder from "./NGOHolder";


export default function AddNGO() {
    const [ngos, setNGOs] = useState([])

    useEffect(() => {
        setNGOs([])
        getPendingNGO().then(ngosData => {
            setNGOs(ngosData)
        })
    }, []);

    const onApproveNgo = async (ngo) => {
        console.log(ngo)
        try {
            await validateNGO(ngo.userId, true)
            alert("NGO accepted")
            setNGOs([])
            getPendingNGO().then(ngosData => {
                setNGOs(ngosData)
            })
        } catch (err) {
            console.log(err)
        }
    };
    const onRejectNgo = async (ngo) => {
        try {
            await validateNGO(ngo.userId, false)
            alert("NGO rejected")
            setNGOs([])
            getPendingNGO().then(ngosData => {
                setNGOs(ngosData)
            })
        } catch (err) {
            console.log(err)
        }
    };
    return (
        <>
            {ngos.length === 0 ? (
                <div className='d-flex justify-content-center align-items-center' style={{ marginTop: "200px", fontSize: "20px" }}>

                    <p style={{ font: "50px", fontWeight: "" }}>There are no approval requests.</p>
                </div>
            ) : (
                <div className="container mt-4 row">
                    {ngos.map(ngo => {
                        return <NGOHolder user={ngo} key={ngo._id} onApprove={onApproveNgo} onReject={onRejectNgo} />
                    })}
                </div>
            )}
        </>
    );
}
