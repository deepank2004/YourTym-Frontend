import { useState } from "react";
import API from "../services/api";

function PartnerForm() {

    const [name, setName] =
        useState("");

    const [categoryId,
        setCategoryId] =
        useState("");

    const [cityId,
        setCityId] =
        useState("");

    const [hubId,
        setHubId] =
        useState("");

    const [image,
        setImage] =
        useState(null);

    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            const formData =
                new FormData();

            formData.append(
                "name",
                name
            );

            formData.append(
                "categoryId",
                categoryId
            );

            formData.append(
                "cityId",
                cityId
            );

            formData.append(
                "hubId",
                hubId
            );

            formData.append(
                "image",
                image
            );

            await API.post(
                "/partners",
                formData
            );

            alert(
                "Partner Added Successfully"
            );

            setName("");
            setCategoryId("");
            setCityId("");
            setHubId("");

        } catch (error) {

            alert(
                error.response?.data?.message
            );

        }
    };

    return (

        <div className="max-w-2xl mx-auto">

            <div className="bg-white shadow-xl rounded-2xl p-8">

                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Add Partner
                </h2>

                <form
                    onSubmit={submitHandler}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        placeholder="Partner Name"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="text"
                        placeholder="Category ID"
                        value={categoryId}
                        onChange={(e) =>
                            setCategoryId(
                                e.target.value
                            )
                        }
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="text"
                        placeholder="City ID"
                        value={cityId}
                        onChange={(e) =>
                            setCityId(
                                e.target.value
                            )
                        }
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="text"
                        placeholder="Hub ID"
                        value={hubId}
                        onChange={(e) =>
                            setHubId(
                                e.target.value
                            )
                        }
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="file"
                        onChange={(e) =>
                            setImage(
                                e.target.files[0]
                            )
                        }
                        className="w-full border rounded-lg p-3"
                    />

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
                    >
                        Add Partner
                    </button>

                </form>

            </div>

        </div>
    );
}

export default PartnerForm;