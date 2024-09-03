import {useEffect, useState} from "react";
import axios from "axios";
import './List.css'

export default function List() {
    const [data, setData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get<DataType[]>("/rest/list-products");
                console.log(response.data)
                setData(response.data);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    console.error(err.message);
                } else {
                    console.error("An unexpected error occurred:", err);
                }
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <div className={"container-list"}>
                <h1>Products List</h1>
                <div className={"container"}>
                    {data.map(item => (

                        <div key={item.id} className="card">
                            <div className="card-img">
                                <img className={"image"} src={item.image} alt={"image"}></img>
                            </div>
                            <div className="card-info">
                                <p className="text-title">{item.name} - {item.id}</p>
                                <p className="text-body">Stock: {item.stock}</p>
                            </div>
                            <div className="card-footer">
                                <span className="text-title">${item.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <button className={"backButton"}>Go Back</button>
            </div>
        </>
    )
}