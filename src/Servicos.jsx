// src/components/Servicos.jsx
const reloadPage = () => {
    window.location.reload();
    };

const Servicos = ({ servicos, removeServico, formatarDataHora }) => {
  return (
    <div>
      {servicos.map((servico) => (
        <div key={servico._id} className="servicos">
          <p>{servico.nome}</p>
          <p>
            {servico.valor.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <p>Data: {formatarDataHora(servico.createdAt)}</p>

          <button onClick={() => {
            removeServico(servico._id);
            reloadPage();
          }}
            >REMOVER</button>
        </div>
      ))}
    </div>
  );
};

export default Servicos;
