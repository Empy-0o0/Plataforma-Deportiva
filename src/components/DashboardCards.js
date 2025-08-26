const DashboardCards = ({ cards }) => (
  <div className="dashboard-cards">
    {cards.map((card, index) => (
      <div key={index} className="card">
        <h3>{card.title}</h3>
        <p className="number">{card.value}</p>
        {card.subtitle && <p className="text-sm opacity-75">{card.subtitle}</p>}
      </div>
    ))}
  </div>
);

export default DashboardCards;
