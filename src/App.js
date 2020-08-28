import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect( () => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `repo ${Date.now()}`,
      url: "https://github.com/novo-repo-git",
      techs: ["tag5", "tag6"]
    });

    const repo = response.data;

    setRepositories([...repositories, repo]);

  }

  async function handleRemoveRepository(id) {

    const response  = await api.delete(`repositories/${id}`);

    if(response.status === 204){
      setRepositories( repositories.filter(repo => repo.id !== id) );
    }else{
      alert('Repositorie not found');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map( repo => 
            <li key={repo.id}>
              {repo.title}

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )
        }
        </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
