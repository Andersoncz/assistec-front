import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import bg from "../src/img/18303691.jpg";
import Barchar from "./BarChart";
import Servicos from "./Servicos";

const App = () => {
  const [servicos, setServicos] = useState([]);

  const inputServico = useRef();
  const inputValor = useRef();

  const limparInput = () => {
    inputServico.current.value = "";
    inputValor.current.value = "";
  };

  const reloadPage = () => {
    window.location.reload();
  };

  // Função para buscar serviços
  async function getServicos() {
    const servicoFromApi = await api.get(
      "https://api-register-service-fwsm.vercel.app/servicos"
    );
    setServicos(servicoFromApi.data);
  }

  // Criar novo serviço
  async function createServico() {
    await api.post("/servicos", {
      nome: inputServico.current.value,
      valor: parseFloat(inputValor.current.value),
    });
    getServicos();
  }

  // Remover serviço
  async function removeServico(id) {
    await api.delete(`/servicos/${id}`);
    getServicos();
  }

  useEffect(() => {
    getServicos();
  }, []);

  // Formatar data
  const formatarDataHora = (data) => {
    return new Date(data).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  // Calcular total
  const calcularTotal = () => {
    return servicos.reduce((total, item) => total + item.valor, 0);
  };

  return (
    <div className="container">
      <img src={bg} alt="background" className="bg" />

      <form className="form">
        <h1>Cruzcell Assistec</h1>
        <input
          type="text"
          name="name"
          placeholder="Digite o serviço"
          ref={inputServico}
        />
        <input
          type="number"
          name="valor"
          placeholder="Valor"
          ref={inputValor}
        />

        <button
          className="button1"
          type="button"
          onClick={() => {
            createServico();
            limparInput();
             reloadPage();
          }}
        >
          ADICIONAR
        </button>
      </form>

      <Barchar />

      {/* Mostrar valor total */}
      <h2 className="total">
        RECEITA TOTAL:{" "}
        {calcularTotal().toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </h2>

      {/* Aqui chamamos o novo componente */}
      <Servicos
        servicos={servicos}
        removeServico={removeServico}
        formatarDataHora={formatarDataHora}
      />
    </div>
  );
};

export default App;
