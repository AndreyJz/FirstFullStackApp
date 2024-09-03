import {useState, MouseEvent} from "react";
import axios from "axios";
import List from "./List.tsx";

export default  function Form() {
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0.0);
    const [stock, setStock] = useState<number>(0);
    const [image, setImage] = useState<string>("");
    const [showForm, setShowForm] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);

    const handleCreate = async (event : MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const data = {
            id: id,
            name: name,
            price: price,
            stock: stock,
            image: image,
        };

        try {
            const response = await axios.post<object>("/rest", data);
            console.log(response.data);

            setName("");
            setId(0);
            setPrice(0.0);
            setStock(0);
            setImage("");

        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err.message);
            } else {
                console.error("An unexpected error occurred:", err);
            }
        }
    }

    const handleList = () => {
        setShowForm(false);
    }

    return (
        <>
            {showForm ? (
            <div>
                <div>
                    <h2>Product's Info</h2>
                    <div>
                        <div>
                            <input onChange={(e) => setName(e.target.value)} type="text" className="form-control"
                                   name="Name" id="Name" placeholder="Name" required={true}/>
                        </div>
                        <div>
                            <input onChange={(e) => setId(parseInt(e.target.value))} type="number"
                                   className="form-control" name="code" id="code" placeholder="code"/>
                        </div>
                        <div>
                            <input onChange={(e) => setPrice(parseFloat(e.target.value))} type="number"
                                   className="form-control" name="price" id="price" placeholder="price"/>
                        </div>
                        <div>
                            <input onChange={(e) => setStock(parseInt(e.target.value))} type="number"
                                   className="form-control" name="stock" id="stock" placeholder="stock"/>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Product's Image</h2>
                    <div>
                        <div>
                            {/*<label htmlFor="Image">Upload</label>*/}
                            {/*<input type="file" name="Image" id="Image"/>*/}
                            <div>
                                <input onChange={(e) => setImage(e.target.value)} type="text" className="form-control"
                                       name="URL" id="URL" placeholder="URL"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"btnCont"}>
                    <button onClick={handleCreate} id="add-hero">Add Product</button>
                    <button onClick={handleList} id="list-hero">List Products</button>
                </div>
            </div>) : <List/>}
        </>
    );
}