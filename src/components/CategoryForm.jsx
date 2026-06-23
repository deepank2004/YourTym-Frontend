import { useState } from "react";
import API from "../services/api";

function CategoryForm() {

    const [name, setName] =
        useState("");

    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                "/categories",
                {
                    name
                }
            );

            alert(
                "Category Added Successfully"
            );

            setName("");

        } catch (error) {

            alert(
                error.response?.data?.message
            );

        }
    };

    return (

        <div className="max-w-xl mx-auto">

            <div className="bg-white shadow-xl rounded-2xl p-8">

                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Add Category
                </h2>

                <form
                    onSubmit={submitHandler}
                    className="space-y-5"
                >

                    <div>

                        <label className="block mb-2 font-medium">
                            Category Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                            placeholder="Enter category"
                            className="w-full border rounded-lg p-3"
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                    >
                        Add Category
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CategoryForm;