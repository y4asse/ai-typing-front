'use client'
import { getFreshIdToken } from '@/hooks/getFreshIdToken'
import { User } from '@/types/profile'
import { useSession } from 'next-auth/react'
import React, { useRef, useState } from 'react'

import { storage } from '@/firebase/client'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const postImage = async (image: File) => {
  let uploadResult = ''
  if (image.name) {
    const storageRef = ref(storage)
    const ext = image.name.split('.').pop()
    const hashName = Math.random().toString(36).slice(-8)
    const fullPath = '/images/' + hashName + '.' + ext
    const uploadRef = ref(storageRef, fullPath)
    await uploadBytes(uploadRef, image).then(async function (result) {
      await getDownloadURL(uploadRef).then(function (url) {
        uploadResult = url
      })
    })
  }
  return uploadResult
}

const Profile = ({ user }: { user: User }) => {
  //session
  const { data: session } = useSession()

  //画像
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<File | undefined>(undefined)
  const [createObjectURL, setCreateObjectURL] = useState<string | undefined>(user.image)
  const [isChandedImage, setIsChandedImage] = useState(false) //画像が変更されたかどうか
  const uploadToClient = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]

      setImage(file)
      setCreateObjectURL(URL.createObjectURL(file))
      setIsChandedImage(true)
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
      //変更がなかったら画像をサーバに送らない
      let url = user.image
      if (isChandedImage == true) {
        debugger
        url = (await uploadToServer()) ?? user.image
      }
      if (session == null) {
        throw new Error('tokenがありません')
      }
      const refreshToken = session.user.refreshToken
      const freshIdToken = await getFreshIdToken(refreshToken)
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${freshIdToken}`
        },
        body: JSON.stringify({
          name: name,
          image: url
        })
      })
      setIsEditing(false)
      setIsChandedImage(false)
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
        <p className="mb-3 text-xl font-bold">{name}</p>
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
