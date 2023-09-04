'use client'

import { postImage } from '@/app/api/upload/route'
import { User } from '@/types/profile'
import { set } from 'date-fns'
import React, { useRef, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'

const Profile = ({ user }: { user: User }) => {
  //画像
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<File | undefined>(undefined)
  const [createObjectURL, setCreateObjectURL] = useState<string | undefined>(user.image)
  const uploadToClient = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]

      setImage(file)
      setCreateObjectURL(URL.createObjectURL(file))
    }
  }
  const uploadToServer = async () => {
    if (!image) return
    const url = await postImage(image)
    return url
  }

  //名前
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user.name)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  const handleClick = async () => {
    if (isEditing) {
      //保存
      const url = await uploadToServer()
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          image: url
        })
      })
      setIsEditing(false)
      return
    }
    setIsEditing(true)
  }
  return (
    <div className="flex flex-col items-center mb-20">
      {isEditing ? (
        <div className="flex gap-3 items-center mb-3">
          <input
            className="w-[200px]text-xl font-bold border-2 border-black p-2 bg-transparent rounded-xl"
            value={name}
            onChange={handleChange}
          />
        </div>
      ) : (
        <p className="mb-3 text-xl font-bold">{name ? name : 'ゲスト'}</p>
      )}
      <img
        src={
          createObjectURL
            ? createObjectURL
            : 'https://firebasestorage.googleapis.com/v0/b/ai-typing-c06b9.appspot.com/o/symbol047.png?alt=media&token=2c827b86-6d1d-45d1-96a5-45978fa27039'
        }
        alt="profile-img"
        className={`rounded-full w-[150px] h-[150px] object-cover ${isEditing && 'cursor-pointer hover:opacity-80 '}`}
        onClick={() => {
          if (!isEditing) return
          fileInputRef.current?.click()
        }}
      />
      <input
        ref={fileInputRef}
        id="file-input"
        type="file"
        accept="image/*"
        name="myImage"
        className=" hidden"
        onChange={uploadToClient}
      />

      <button
        className="text-xl shadow-btn px-5 py-2 rounded-xl mt-5 bg-btn hover:bg-btnHover hover:shadow-btnHover"
        onClick={handleClick}
      >
        {isEditing ? '保存' : 'プロフィールを変更'}
      </button>
    </div>
  )
}

export default Profile
