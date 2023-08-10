import React from 'react'
import GoBackBtn from '../components/buttons/goBackBtn'

const License = () => {
  return (
    <div className="h-screen mx-auto w-1/2 text-xl p-5 font-semibold ">
      <h1 className="text-5xl my-5 ">ライセンス</h1>
      <p className="mt-10">・当サイトは以下のAPIを使用して作成されています．</p>
      <span style={{ margin: '15px 15px 15px 15px', color: 'blue' }}>
        <a href="https://developer.yahoo.co.jp/sitemap/">Webサービス by Yahoo! JAPAN</a>
      </span>
      <p className="text-xl mt-10">・サイト内で使用しているアニメーション↓</p>
      <ul>
        <li className=" list-decimal">
          Copyright (c) @TheDutchCoder Released under the MIT list-disc list-insidecense <br />
          URL：https://codepen.io/TheDutchCoder/pen/VwMJJB
        </li>
        <li className="list-decimal">https://lottiefiles.com/jp/animations/like-kqQSBa0jqB</li>
        <li className="list-decimal">
          Confetti Emas Didik Prasetyo
          <br />
          (https://lottiefiles.com/jp/animations/confetti-Ljf8PgS2P4)
        </li>
      </ul>
    </div>
  )
}

export default License
