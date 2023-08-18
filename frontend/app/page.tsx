"use client"
import Image from 'next/image'
import { ChangeEvent, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ENDPOINT = "https://ijc4kgpg4b.execute-api.us-west-2.amazonaws.com/Prod/infer";

export default function Home() {

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [results, setResults] = useState("");

  const onImageSelected = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e)
    if (e.target?.files?.length) {
      const file = e.target.files[0];

      setSelectedImage(file)

      setImagePreview(URL.createObjectURL(file))
    } else {
      console.log("select a file first")
    }
  }

  const onSubmit = () => {
    if (!selectedImage) return;

    let formdata = new FormData();
    formdata.append("image", selectedImage, selectedImage?.name);

    fetch(ENDPOINT, {
      method: "POST",
      body: formdata,
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => {
        setResults(result)
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  return (
    <main className="min-h-screen bg-gray-800 flex-col items-center p-24 flex">
      <p className="text-3xl mb-6 ...">EMLO Session 12 - MMG</p>

      <p className="text-lg block text-gray-900 dark:text-white mb-6">Select a file to make prediction...</p>
      <div className="flex w-full max-w-sm items-center space-x-2 mb-6">
      <Input  id="file_input" type="file" onChange={onImageSelected} accept="image/png,image/jpg,image/jpeg"/>

      <Button disabled={!selectedImage} onClick={onSubmit}>Submit!</Button>
      </div>
      <div className="max-w-sm items-center center-image space-x-2 mb-6">
      {imagePreview && <img src={imagePreview} width={360} height={360}/>}
      </div>
      <div className="max-w-sm items-center text-center space-x-2">
      {results && <>{results}</>}
      </div>
    </main>
  )
}