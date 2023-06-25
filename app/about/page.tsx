import React from 'react'
import GoBackBtn from '../components/buttons/goBackBtn'

const About = () => {
  return (
    <div className="h-screen p-5">
      <GoBackBtn />
      <div className="w-1/2 mx-auto text-xl font-semibold">
        <h1 className="text-5xl font-bold my-10">遊び方</h1>
        <h2 className="text-3xl my-5">○ルール</h2>
        <p>・表示されたテキストをタイピングすると秒数，語数，タイプミスに応じて得点が加算されます．</p>
        <p>・スタンダードコースでは5つのテキストが表示されます．</p>
        <p>
          ・このゲームは日本語，英語のみ対応しています．それ以外の文字が使われると，うまく動作しないので注意してください．
        </p>
        <p>・ゲームが終了するとスコアがランキングに登録されます．高得点を取って上位を目指しましょう！</p>
        <h2 className="text-3xl my-5">○その他</h2>
        <p>・表示されているローマ字以外でも入力することができます</p>
        <p>（例）「ちゃ」→ tya, cha</p>
        <p>・大文字のアルファベットは小文字でも打てます</p>
        <p>
          ・「んか」のように「ん」の後に文字があるとき，「んか」が打ち終わるまで表示されている文字の色が変わらない仕様となっているので，あらかじめご了承ください
        </p>
      </div>
    </div>
  )
}

export default About
