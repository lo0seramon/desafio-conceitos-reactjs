import React, { useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(resp => {
      setRepositories(resp.data);
    });
  }, []);

  async function handleAddRepository() {
    const resp = await api.post('repositories', {
      url: 'https://github.com/lo0seramon/conceitos-nodejs.git',
      title: `Conceitos NodeJS ${Date.now()}`,
      techs: ['Express', 'Mongoose', 'Adonis']
    });

    const repo = resp.data;

    setRepositories([...repositories, repo])
  }

  async function handleRemoveRepository(id) {
    const resp = await api.delete(`repositories/${id}`);
    
    if(!resp.status === 204) {
      return console.log('error');
    }

    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => 
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
