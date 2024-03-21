'use client'
import React, { useState } from 'react'

function AddPost() {
  const [file, setFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null
    setFile(selectedFile)

    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setImagePreview(null)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(file)

    const nameInput = document.getElementById('name') as HTMLInputElement
    const descriptionInput = document.getElementById(
      'description',
    ) as HTMLTextAreaElement

    console.log('Name:', nameInput.value)
    console.log('Description:', descriptionInput.value)
    console.log('Image:', file)

    // Add your form submission logic here
  }

  return (
    <form onSubmit={handleSubmit} className="addpost">
      <h1 className="text-[40px] font-semibold text-[whitesmoke] p-5 dark:text-white">
        Add a new post
      </h1>
      <div className="flex items-center justify-center w-full mb-5">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700  dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-32 h-32 mb-4 object-cover"
              />
            ) : (
              <>
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </>
            )}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {/* Rest of the form fields */}
      <div className="mb-5 w-3/4">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-[whitesmoke]"
        >
          Name:
        </label>
        <input
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-5 w-3/4">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-[whitesmoke]"
        >
          Description:
        </label>
        <textarea
          id="description"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  )
}

export default AddPost
