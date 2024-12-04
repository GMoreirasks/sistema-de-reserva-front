import React, { useState, useEffect } from 'react';
import api from '../api';
import './Reservas.css';

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [novaReserva, setNovaReserva] = useState({
    item: { nome: '', descricao: '' },
    dataHora: '',
    nomeUsuario: '',
  });
  const [erro, setErro] = useState('');
  const [buscaReservaNome, setBuscaReservaNome] = useState('');
  const [reservasFiltradas, setReservasFiltradas] = useState([]);

  // Buscar reservas ao carregar a página
  useEffect(() => {
    api.get('/api/reservas')
      .then((response) => {
        setReservas(response.data);
        setReservasFiltradas(response.data);
      })
      .catch(() => setErro('Erro ao buscar reservas.'));
  }, []);

  // Criar nova reserva
  const handleCreateReserva = (e) => {
    e.preventDefault();
    if (!novaReserva.item.nome || !novaReserva.item.descricao || !novaReserva.dataHora || !novaReserva.nomeUsuario) {
      setErro('Por favor, preencha todos os campos da reserva.');
      return;
    }

    api.post('/api/reservas', novaReserva)
      .then((response) => {
        setReservas([...reservas, response.data]);
        setReservasFiltradas([...reservas, response.data]);
        setNovaReserva({ item: { nome: '', descricao: '' }, dataHora: '', nomeUsuario: '' });
        setErro('');
      })
      .catch(() => setErro('Erro ao criar reserva.'));
  };

  // Deletar reserva
  const handleDelete = (id) => {
    api.delete(`/api/reservas/${id}`)
      .then(() => {
        setReservas(reservas.filter((reserva) => reserva.id !== id));
        setReservasFiltradas(reservasFiltradas.filter((reserva) => reserva.id !== id));
      })
      .catch(() => setErro('Erro ao deletar reserva.'));
  };

  // Buscar reservas pelo nome do local
  const handleBuscaReserva = (e) => {
    const nomeBusca = e.target.value;
    setBuscaReservaNome(nomeBusca);
    if (nomeBusca === '') {
      setReservasFiltradas(reservas);
    } else {
      setReservasFiltradas(
        reservas.filter((reserva) =>
          reserva.item.nome.toLowerCase().includes(nomeBusca.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="container">
      <h1 className="titulo">Sistema de Reservas</h1>
      {erro && <p className="erro">{erro}</p>}

      {/* Formulário para criar nova reserva */}
      <div className="coluna">
        <h2 className="subtitulo">Criar Nova Reserva</h2>
        <form onSubmit={handleCreateReserva} className="form-reserva">
          <label>
            Nome do local:
            <input
              type="text"
              value={novaReserva.item.nome}
              onChange={(e) => setNovaReserva({ ...novaReserva, item: { ...novaReserva.item, nome: e.target.value } })}
              className="input"
            />
          </label>
          <label>
            Descrição da reserva:
            <input
              type="text"
              value={novaReserva.item.descricao}
              onChange={(e) => setNovaReserva({ ...novaReserva, item: { ...novaReserva.item, descricao: e.target.value } })}
              className="input"
            />
          </label>
          <label>
            Data e Hora:
            <input
              type="datetime-local"
              value={novaReserva.dataHora}
              onChange={(e) => setNovaReserva({ ...novaReserva, dataHora: e.target.value })}
              className="input"
            />
          </label>
          <label>
            Nome do Usuário:
            <input
              type="text"
              value={novaReserva.nomeUsuario}
              onChange={(e) => setNovaReserva({ ...novaReserva, nomeUsuario: e.target.value })}
              className="input"
            />
          </label>
          <button type="submit" className="botao">Cadastrar reserva</button>
        </form>
      </div>

      {/* Campo de busca de reserva */}
      <div className="coluna">
        <h2 className="subtitulo">Buscar Reserva</h2>
        <label>
          Buscar pelo Nome do Local:
          <input
            type="text"
            value={buscaReservaNome}
            onChange={handleBuscaReserva}
            className="input"
          />
        </label>

        {/* Lista de reservas filtradas */}
        <h3>Reservas Encontradas:</h3>
        <ul className="lista-reservas">
          {reservasFiltradas.map((reserva) => (
            <li key={reserva.id} className="reserva-card">
              <p><strong>Local:</strong> {reserva.item.nome}</p>
              <p><strong>Descrição:</strong> {reserva.item.descricao}</p>
              <p><strong>Data e Hora:</strong> {reserva.dataHora}</p>
              <p><strong>Usuário:</strong> {reserva.nomeUsuario}</p>
              <button className="botao" onClick={() => handleDelete(reserva.id)}>Deletar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Reservas;
