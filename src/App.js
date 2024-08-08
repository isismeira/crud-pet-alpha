import React, { useState, useEffect } from 'react';

function App() {
  const [registros, setRegistros] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    animal: "",
    raca: "",
    telefone: "",
  });
  const [editandoIndex, setEditandoIndex] = useState(null);

  // Registros iniciais que serão inseridos se o localStorage estiver vazio
  const registrosIniciais = [
    { nome: "Marley", animal: "Cachorro", raca: "Labrador", telefone: "12345-6789" },
    { nome: "Manchinha", animal: "Gato", raca: "Siamês", telefone: "98765-4321" },
    { nome: "Zé", animal: "Pássaro", raca: "Canário", telefone: "55555-1234" },
  ];

  // Carrega os registros salvos no Local Storage ou inicializa com registros padrões
  useEffect(() => {
    const registrosSalvos = JSON.parse(localStorage.getItem('registros'));
    if (registrosSalvos === null) {
      // Se não houver registros no localStorage, usar os registros iniciais
      setRegistros(registrosIniciais);
      localStorage.setItem('registros', JSON.stringify(registrosIniciais));
    } else {
      setRegistros(registrosSalvos);
    }
  }, []);

  // Função para lidar com a mudança nos campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Função para adicionar ou editar um registro na lista
  const adicionarOuEditarRegistro = () => {
    if (form.nome.trim() && form.animal.trim() && form.raca.trim() && form.telefone.trim()) {
      if (editandoIndex !== null) {
        // Editando um registro existente
        const novosRegistros = [...registros];
        novosRegistros[editandoIndex] = form;
        setRegistros(novosRegistros);
        localStorage.setItem('registros', JSON.stringify(novosRegistros));
        setEditandoIndex(null); // Reseta o índice de edição
      } else {
        // Adicionando um novo registro
        const novosRegistros = [...registros, form];
        setRegistros(novosRegistros);
        localStorage.setItem('registros', JSON.stringify(novosRegistros));
      }
      setForm({ nome: "", animal: "", raca: "", telefone: "" }); // Limpa os campos de input após adicionar/editar
    }
  };

  // Função para iniciar a edição de um registro
  const editarRegistro = (index) => {
    setForm(registros[index]);
    setEditandoIndex(index);
  };

  // Função para deletar um registro da lista
  const deletarRegistro = (index) => {
    const novosRegistros = registros.filter((_, i) => i !== index);
    setRegistros(novosRegistros);
    localStorage.setItem('registros', JSON.stringify(novosRegistros));
    // Se estava editando o registro deletado, cancelar a edição
    if (editandoIndex === index) {
      setForm({ nome: "", animal: "", raca: "", telefone: "" });
      setEditandoIndex(null);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cadastro de Nomes</h1>
      
      {/* Inputs para adicionar ou editar registros */}
      <input 
        type="text"
        name="nome"
        value={form.nome}
        onChange={handleChange}
        placeholder="Digite um nome"
      />
      <input 
        type="text"
        name="animal"
        value={form.animal}
        onChange={handleChange}
        placeholder="Digite um animal"
      />
      <input 
        type="text"
        name="raca"
        value={form.raca}
        onChange={handleChange}
        placeholder="Digite uma raça"
      />
      <input 
        type="text"
        name="telefone"
        value={form.telefone}
        onChange={handleChange}
        placeholder="Digite um telefone"
      />
      <button onClick={adicionarOuEditarRegistro}>
        {editandoIndex !== null ? "Salvar Edição" : "Adicionar"}
      </button>
      
      {/* Lista de registros cadastrados */}
      <ul>
        {registros.map((registro, index) => (
          <li key={index}>
            <strong>Nome:</strong> {registro.nome}, <strong>Animal:</strong> {registro.animal}, <strong>Raça:</strong> {registro.raca}, <strong>Telefone:</strong> {registro.telefone}
            <button onClick={() => editarRegistro(index)} style={{ marginLeft: '10px' }}>
              Editar
            </button>
            <button onClick={() => deletarRegistro(index)} style={{ marginLeft: '10px' }}>
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;




