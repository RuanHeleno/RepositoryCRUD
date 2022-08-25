/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

import Navbar from "../../components/Navbar";
import Search from "../../components/Search";
import Repositories from "../../components/Repositories";

import { AuthContext } from "../../contexts/auth";
import { getRepositories, createRepository, deleteRepository } from "../../services/api";

const Main = () => {
  const { user, logout } = useContext(AuthContext);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const loadData = async (query = '') => {
    try {
      setLoading(true);
      const response = await getRepositories(user?.id, query);
      setRepositories(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoadingError(true);
    }
  }

  useEffect(() => {
    (async () =>  await loadData())();
  }, [])

  const handleLogout = () => {
    logout();
  };

  const handleSearch = (query) => {
    try {
      loadData(query);
    } catch (err) {
      console.error(err);
      setLoadingError(true);
    }
  };

  const handleDeleteRepo = async (repository) => {
    try {
      await deleteRepository(user?.id, repository._id);
      await loadData();
    } catch (err) {
      console.error(err);
      setLoadingError(true);
    }
  };

  const handleNewRepo = async (url) => {
    try {
      if(url === '') return alert("Não pode ser vazio.");

      await createRepository(user?.id, url);
      await loadData();
    } catch(err) {
      console.error(err);
      setLoadingError(true);
    }
  };

  if(loading) {
    return (
      <div className="loading">
        Carregando...
      </div>
    )
  }

  if(loadingError) {
    return (
      <div className="loading">
        Erro ao carregar o repositório.
        <Link>Voltar</Link>
      </div>
    )
  }

  return (
    <div id="main">
      <Navbar onLogout={handleLogout} />
      <Search onSearch={handleSearch} />
      <Repositories
        repositories={repositories}
        onDeleteRepo={handleDeleteRepo}
        onNewRepo={handleNewRepo}
      />
    </div>
  );
};

export default Main;
