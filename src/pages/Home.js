import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <h1>Sistema de Reservas</h1>
      <p>Bem-vindo! Por favor clique no botão abaixo</p>
      <Link to="/reservas" className="card-button">Fazer reservaas</Link>
    </div>
  );
}

export default Home;
