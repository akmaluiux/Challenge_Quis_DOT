import React from 'react';

function Results({ correctAnswers, wrongAnswers, totalQuestions }) {

  const signOut = () =>{
    localStorage.removeItem('Login')
    window.location.reload();
  }

  const cobaLagi = () => {
    window.location.reload();
  }
  return (
    <div className='Results'>
      <h3>Hasil Pengerjaan</h3>
      <p>Jumlah Benar: {correctAnswers}</p>
      <p>Jumlah Salah: {wrongAnswers}</p>
      <p>Jumlah Jawab: {totalQuestions}</p>
      <div>
        <button onClick={signOut}>SignOut</button>
        <button onClick={cobaLagi}>Coba Lagi</button>
      </div>
    </div>
  );
}

export default Results;
