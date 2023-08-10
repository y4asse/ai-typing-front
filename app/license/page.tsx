import React from 'react'

const License = () => {
  return (
    <div className="h-screen mx-auto w-1/2 text-xl p-5 font-semibold overflow-scroll pb-10">
      <h1 className="text-5xl mt-5 ">ライセンス</h1>
      <p className="mt-5">・当サイトは以下のAPIを使用して作成されています．</p>
      <span style={{ margin: '15px 15px 15px 15px', color: 'blue' }}>
        <a href="https://developer.yahoo.co.jp/sitemap/">Webサービス by Yahoo! JAPAN</a>
      </span>
      <p className="text-xl mt-5">・サイト内で使用しているアニメーション↓</p>
      <ul className=" list-inside">
        <li className=" list-decimal">
          Copyright (c) @TheDutchCoder Released under the MIT list-disc list-insidecense
          <br />
          (https://codepen.io/TheDutchCoder/pen/VwMJJB)
        </li>
        <li className="list-decimal">
          Like Palle Ryde
          <br />
          (https://lottiefiles.com/jp/animations/like-kqQSBa0jqB)
        </li>
        <li className="list-decimal">
          Material wave loading LottieFiles
          <br />
          (https://lottiefiles.com/jp/animations/material-wave-loading-yt2uoeE83o)
        </li>
        <li className="list-decimal">
          star burst animation Nitin Prajapati
          <br />
          (https://lottiefiles.com/animations/star-burst-animation-9N1qvEFO9f)
        </li>
        <li className="list-decimal">
          Star Badge Duxtree
          <br />
          (https://lottiefiles.com/animations/star-badge-mErs4klcKz)
        </li>
        <li className="list-decimal">
          Circle Eduardo Ricardo Santos
          <br />
          (https://lottiefiles.com/animations/circle-MUA1zryrGv)
        </li>
        <li className="list-decimal">
          CONFETTI Sammie Ho
          <br />
          (https://lottiefiles.com/animations/confetti-ENxSnLhOBl)
        </li>
      </ul>
    </div>
  )
}

export default License
