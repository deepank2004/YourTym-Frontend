import { useState } from "react";
import API from "../services/api";

function CityForm() {

    const [cityName, setCityName] =
        useState("");

    const [state, setState] =
        useState("");

    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                "/cities",
                {
                    cityName,
                    state
                }
            );

            alert(
                "City Added Successfully"
            );

            setCityName("");
            setState("");

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
                    Add City
                </h2>

                <form
                    onSubmit={submitHandler}
                    className="space-y-5"
                >

                    <div>

                        <label className="block mb-2 font-medium">
                            City Name
                        </label>

                        <input
                            type="text"
                            value={cityName}
                            onChange={(e) =>
                                setCityName(
                                    e.target.value
                                )
                            }
                            placeholder="Enter city name"
                            className="w-full border rounded-lg p-3"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">
                            State
                        </label>

                        <input
                            type="text"
                            value={state}
                            onChange={(e) =>
                                setState(
                                    e.target.value
                                )
                            }
                            placeholder="Enter state"
                            className="w-full border rounded-lg p-3"
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        Add City
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CityForm;